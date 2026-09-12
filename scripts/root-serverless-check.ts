process.env.VERCEL='1';
const {default:app}=await import('../server/index.js');
const {storageMode,closeStore}=await import('../server/store.js');
if(typeof app!=='function'||storageMode!=='postgres')throw new Error('Serverless import failed');
console.log(JSON.stringify({status:'PASS_SERVERLESS_IMPORT',storage:storageMode,listenerStarted:false}));
await closeStore();
