import { readFileSync,existsSync } from 'node:fs';
import { resolve } from 'node:path';
import dotenv from 'dotenv';
dotenv.config({path:resolve('.env.local')});
// Explicit, user-authorized local references. Never expose these values to the client.
const sources=['../g02-iza-sinistros/app/.env.local','../projeto_hackathon/app/.env.local','../SaaSProspectionPOC/.env'];
for(const source of sources){if(!existsSync(source))continue;const env=dotenv.parse(readFileSync(source));for(const key of ['OPENAI_API_KEY','CLOUDINARY_CLOUD_NAME','CLOUDINARY_API_KEY','CLOUDINARY_API_SECRET'])if(!process.env[key]&&env[key]&&!/example|your_|placeholder/i.test(env[key]))process.env[key]=env[key];}
export const config={port:Number(process.env.PORT||4173),openaiKey:process.env.OPENAI_API_KEY,model:process.env.OPENAI_MODEL||'gpt-4.1-mini',databaseUrl:process.env.DATABASE_URL};
