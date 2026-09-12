import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
export default defineConfig({ plugins: [react()], resolve:{alias:{'react-router-dom':path.resolve('src/lib/router.tsx')}}, build: { outDir: 'dist' } });
