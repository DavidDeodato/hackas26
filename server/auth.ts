import type { Express, Request, Response, RequestHandler } from 'express';
import { createHash, randomBytes, randomUUID, scrypt, timingSafeEqual } from 'node:crypto';
import { z } from 'zod';
import { getStorePool } from './store.js';
import { defaultAvatar, type AuthUser } from '../shared/auth.js';

const COOKIE = 'rebobina_auth';
const TTL = 7 * 86400_000;
const passwordSchema = z.string().min(10).max(128);
const emailSchema = z.string().trim().toLowerCase().email().max(254);
const nameSchema = z.string().trim().min(1).max(80);
const color = z.string().regex(/^#[0-9a-fA-F]{6}$/);
export const avatarSchema = z.object({
  model: z.enum(['procedural', 'trellis-masculine', 'trellis-feminine']).optional(),
  template: z.enum(['masculine', 'feminine']),
  hairStyle: z.enum(['short', 'long', 'curly', 'bald']),
  hairColor: color, skinColor: color, topColor: color, pantsColor: color, shoesColor: color,
}).strict();
class AuthError extends Error {
  constructor(public status: number, message: string) { super(message); }
}
function database() {
  const pool = getStorePool();
  if (!pool) throw new AuthError(503, 'Contas temporariamente indisponíveis. Tente novamente em instantes.');
  return pool;
}
function hash(value: string) { return createHash('sha256').update(value).digest('hex'); }
function derive(password: string, salt: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    // OWASP scrypt alternative: 32 MiB, r=8, p=3. Async to keep request handling responsive.
    scrypt(password, salt, 64, {N: 32768, r: 8, p: 3, maxmem: 64 * 1024 * 1024}, (error, key) => error ? reject(error) : resolve(key));
  });
}
export async function hashPassword(password: string): Promise<string> {
  passwordSchema.parse(password);
  const salt = randomBytes(16).toString('hex');
  return `scrypt$32768$8$3$${salt}$${(await derive(password, salt)).toString('hex')}`;
}
const dummySalt = randomBytes(16).toString('hex');
export async function verifyPassword(password: string, encoded: string | undefined): Promise<boolean> {
  const parsed = encoded?.match(/^scrypt\$32768\$8\$3\$([a-f0-9]{32})\$([a-f0-9]{128})$/);
  const candidate = await derive(password, parsed?.[1] ?? dummySalt);
  const expected = parsed ? Buffer.from(parsed[2], 'hex') : Buffer.alloc(64);
  const matches = timingSafeEqual(candidate, expected);
  return Boolean(parsed) && matches;
}
export async function initAuth() {
  const pool = getStorePool();
  if (!pool) return; // Guests continue locally, but account endpoints fail closed without PostgreSQL.
  await pool.query(`CREATE TABLE IF NOT EXISTS rebobina_users (
    id uuid PRIMARY KEY, email text UNIQUE NOT NULL, name text NOT NULL,
    password_hash text NOT NULL, avatar jsonb NOT NULL, created_at timestamptz NOT NULL DEFAULT now()
  )`);
  await pool.query(`CREATE TABLE IF NOT EXISTS rebobina_auth_sessions (
    token_hash char(64) PRIMARY KEY, user_id uuid NOT NULL REFERENCES rebobina_users(id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT now(), expires_at timestamptz NOT NULL
  )`);
  await pool.query('CREATE INDEX IF NOT EXISTS rebobina_auth_session_expiry ON rebobina_auth_sessions(expires_at)');
  await pool.query(`CREATE TABLE IF NOT EXISTS rebobina_auth_limits (
    scope char(64) PRIMARY KEY, attempts integer NOT NULL, resets_at timestamptz NOT NULL
  )`);
}
function cookieToken(req: Request): string | undefined {
  const values = (req.headers.cookie ?? '').split(';').map(part => part.trim()).filter(part => part.startsWith(`${COOKIE}=`));
  if (values.length !== 1) return undefined;
  const token = values[0].slice(COOKIE.length + 1);
  return /^[a-f0-9]{64}$/.test(token) ? token : undefined;
}
function cookieOptions(req: Request) {
  return {httpOnly: true, secure: Boolean(process.env.VERCEL) || req.secure, sameSite: 'strict' as const, path: '/'};
}
function clearCookies(req: Request, res: Response) {
  res.clearCookie(COOKIE, cookieOptions(req));
  // Rotate anonymous identity after auth transitions; previous accounts never become guests.
  res.clearCookie('rebobina_session', cookieOptions(req));
}
function publicUser(row: AuthUser): AuthUser {
  return {id: row.id, email: row.email, name: row.name, avatar: avatarSchema.parse(row.avatar)};
}
export function userWorkspaceId(user: AuthUser): string { return `user:${user.id}`; }

/** JSON-only writes and browser origin metadata reject cross-origin form/fetch requests. */
export const sameOriginProtection: RequestHandler = (req, res, next) => {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) { next(); return; }
  const origin = req.get('origin');
  const expected = `${req.protocol}://${req.get('host')}`;
  if ((origin && origin !== expected) || req.get('sec-fetch-site') === 'cross-site') {
    res.status(403).json({error: 'Origem não permitida.'}); return;
  }
  if (req.path.startsWith('/api') && !req.is('application/json')) {
    res.status(415).json({error: 'Envie a solicitação como JSON.'}); return;
  }
  next();
};

export const resolveAuth: RequestHandler = (req, res, next) => {
  res.locals.user = null;
  const hasCookie = (req.headers.cookie ?? '').split(';').some(value => value.trim().startsWith(`${COOKIE}=`));
  const token = cookieToken(req);
  if (!hasCookie) { next(); return; }
  void (async () => {
    const result = token ? await database().query(`SELECT u.id,u.email,u.name,u.avatar
      FROM rebobina_auth_sessions s JOIN rebobina_users u ON u.id=s.user_id
      WHERE s.token_hash=$1 AND s.expires_at>now()`, [hash(token)]) : null;
    const row = result?.rows[0];
    if (row) {
      res.locals.user = publicUser(row);
      res.locals.session = userWorkspaceId(res.locals.user);
    } else {
      clearCookies(req, res);
      if (!req.path.startsWith('/auth/')) {
        res.status(401).json({error: 'Sua sessão expirou. Entre novamente ou escolha continuar como visitante.'}); return;
      }
    }
    next();
  })().catch(() => res.status(503).json({error: 'Não foi possível verificar sua sessão. Tente novamente.'}));
};

async function rateLimit(scope: string, limit: number) {
  const result = await database().query(`INSERT INTO rebobina_auth_limits(scope,attempts,resets_at)
    VALUES($1,1,now()+interval '15 minutes') ON CONFLICT(scope) DO UPDATE SET
    attempts=CASE WHEN rebobina_auth_limits.resets_at<=now() THEN 1 ELSE rebobina_auth_limits.attempts+1 END,
    resets_at=CASE WHEN rebobina_auth_limits.resets_at<=now() THEN now()+interval '15 minutes' ELSE rebobina_auth_limits.resets_at END
    RETURNING attempts`, [hash(scope)]);
  if (result.rows[0].attempts > limit) throw new AuthError(429, 'Muitas tentativas. Aguarde 15 minutos antes de tentar novamente.');
}
const route = (action: (req: Request, res: Response) => Promise<void>): RequestHandler => (req, res) => {
  void action(req, res).catch(error => {
    if (error instanceof AuthError) {
      if (error.status === 429) res.setHeader('Retry-After', '900');
      res.status(error.status).json({error: error.message});
    } else if (error instanceof z.ZodError) {
      res.status(400).json({error: 'Confira nome, e-mail e senha (10 a 128 caracteres) ou os campos do avatar.'});
    } else {
      console.error(JSON.stringify({event: 'auth_request_failed'}));
      res.status(503).json({error: 'Não foi possível concluir o acesso. Tente novamente.'});
    }
  });
};
async function createSession(req: Request, user: AuthUser) {
  const token = randomBytes(32).toString('hex');
  const client = await database().connect();
  try {
    await client.query('BEGIN');
    const previous = cookieToken(req);
    if (previous) await client.query('DELETE FROM rebobina_auth_sessions WHERE token_hash=$1', [hash(previous)]);
    await client.query('INSERT INTO rebobina_auth_sessions(token_hash,user_id,expires_at) VALUES($1,$2,$3)', [hash(token), user.id, new Date(Date.now() + TTL)]);
    await client.query('COMMIT');
  } catch (error) { await client.query('ROLLBACK'); throw error; } finally { client.release(); }
  return token;
}
function sendSession(req: Request, res: Response, user: AuthUser, token: string) {
  clearCookies(req, res);
  res.cookie(COOKIE, token, {...cookieOptions(req), maxAge: TTL});
  res.json({user});
}
export function registerAuthRoutes(app: Express) {
  app.get('/api/auth/me', (_req, res) => res.json({user: res.locals.user ?? null}));
  app.post('/api/auth/register', route(async (req, res) => {
    await rateLimit(`register:ip:${req.ip ?? req.socket.remoteAddress ?? 'unknown'}`, 10);
    const {email, password, name} = z.object({email: emailSchema, password: passwordSchema, name: nameSchema}).strict().parse(req.body);
    const passwordHash = await hashPassword(password);
    const user: AuthUser = {id: randomUUID(), email, name, avatar: {...defaultAvatar}};
    const inserted = await database().query(`INSERT INTO rebobina_users(id,email,name,password_hash,avatar)
      VALUES($1,$2,$3,$4,$5) ON CONFLICT(email) DO NOTHING RETURNING id`, [user.id, email, name, passwordHash, JSON.stringify(user.avatar)]);
    if (!inserted.rowCount) throw new AuthError(409, 'Não foi possível criar esta conta. Confira os dados ou use Entrar.');
    sendSession(req, res, user, await createSession(req, user));
  }));
  app.post('/api/auth/login', route(async (req, res) => {
    await rateLimit(`login:ip:${req.ip ?? req.socket.remoteAddress ?? 'unknown'}`, 30);
    const {email, password} = z.object({email: emailSchema, password: passwordSchema}).strict().parse(req.body);
    await rateLimit(`login:account:${email}`, 10);
    const result = await database().query('SELECT id,email,name,avatar,password_hash FROM rebobina_users WHERE email=$1', [email]);
    const row = result.rows[0];
    if (!await verifyPassword(password, row?.password_hash)) throw new AuthError(401, 'E-mail ou senha incorretos.');
    const user = publicUser(row);
    sendSession(req, res, user, await createSession(req, user));
  }));
  app.post('/api/auth/logout', route(async (req, res) => {
    const token = cookieToken(req);
    if (token) await database().query('DELETE FROM rebobina_auth_sessions WHERE token_hash=$1', [hash(token)]);
    clearCookies(req, res);
    res.json({ok: true});
  }));
  app.patch('/api/auth/profile', route(async (req, res) => {
    const current: AuthUser | null = res.locals.user;
    if (!current) throw new AuthError(401, 'Entre na sua conta para editar o perfil.');
    await rateLimit(`profile:user:${current.id}`, 60);
    const update = z.object({name: nameSchema.optional(), avatar: avatarSchema.partial().optional()}).strict().refine(value => value.name !== undefined || value.avatar !== undefined).parse(req.body);
    const result = await database().query(`UPDATE rebobina_users SET name=COALESCE($2,name),avatar=avatar || $3::jsonb
      WHERE id=$1 RETURNING id,email,name,avatar`, [current.id, update.name ?? null, JSON.stringify(update.avatar ?? {})]);
    res.json({user: publicUser(result.rows[0])});
  }));
}
