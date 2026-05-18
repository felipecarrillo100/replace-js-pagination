import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      'replace-js-pagination': path.resolve(__dirname, '../dist/index.mjs'),
    },
    dedupe: ['react', 'react-dom'],
  },
  server: {
    port: 8000,
    open: true,
  },
});
