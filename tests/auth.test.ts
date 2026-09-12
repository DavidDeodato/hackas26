import test from 'node:test';
import assert from 'node:assert/strict';
import type { Request, Response } from 'express';
import { hashPassword, verifyPassword, sameOriginProtection, userWorkspaceId } from '../server/auth.js';
import { defaultAvatar } from '../shared/auth.js';

test('password salts differ and only correct passwords verify; hashes are versioned', async () => {
  const password = 'test-only-long-password';
  const first = await hashPassword(password);
  const second = await hashPassword(password);
  assert.ok(first !== second, 'Random salts must differ');
  assert.ok(first.startsWith('scrypt$32768$8$3$'));
  assert.equal(await verifyPassword(password, first), true);
  assert.equal(await verifyPassword('incorrect-test-password', first), false);
  assert.equal(await verifyPassword(password, undefined), false);
  assert.equal(await verifyPassword(password, 'malformed'), false);
  await assert.rejects(hashPassword('short'));
  await assert.rejects(hashPassword('x'.repeat(129)));
});

test('stable account workspace IDs are disjoint from anonymous cookie IDs', () => {
  const user = {id: '9d4fc2f6-9099-44e7-9230-c93b424f02b8', name: 'Test', email: 'test@example.invalid', avatar: {...defaultAvatar}};
  assert.equal(userWorkspaceId(user), userWorkspaceId({...user, name: 'Renamed'}));
  assert.ok(userWorkspaceId(user) !== userWorkspaceId({...user, id: 'another-account'}));
  assert.equal(/^[a-f0-9]{64}$/.test(userWorkspaceId(user)), false);
});

test('origin protection blocks cross-origin writes and simple form submissions', () => {
  function check(headers: Record<string, string>, json = true) {
    let status = 0;
    let allowed = false;
    const req = {method: 'POST', path: '/api/auth/login', protocol: 'https', get: (name: string) => headers[name], is: () => json ? 'application/json' : false} as unknown as Request;
    const res = {status: (code: number) => { status = code; return res; }, json: () => res} as unknown as Response;
    sameOriginProtection(req, res, () => { allowed = true; });
    return {status, allowed};
  }
  assert.deepEqual(check({host: 'app.example', origin: 'https://evil.example'}), {status: 403, allowed: false});
  assert.deepEqual(check({host: 'app.example', 'sec-fetch-site': 'cross-site'}), {status: 403, allowed: false});
  assert.deepEqual(check({host: 'app.example'}, false), {status: 415, allowed: false});
  assert.deepEqual(check({host: 'app.example', origin: 'https://app.example'}), {status: 0, allowed: true});
  assert.deepEqual(check({host: 'app.example'}), {status: 0, allowed: true});
});
