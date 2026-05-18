import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['tests/**/*.test.{ts,tsx}'],
    alias: {
      'replace-js-pagination': path.resolve(__dirname, 'src/index.ts'),
    },
  },
});
