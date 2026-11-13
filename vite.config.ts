import { defineConfig } from 'vitest/config';

export default defineConfig({
  base: '/country-search/',
  resolve: {
    tsconfigPaths: true,
  },

  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
    clearMocks: true,
    restoreMocks: true,
    passWithNoTests: true,
  },
});
