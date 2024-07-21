/// <reference types="vitest" />
import { join, resolve } from 'node:path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import { name, peerDependencies } from './package.json';

export default defineConfig({
  plugins: [
    react(),
    dts({ rollupTypes: true }), // Output .d.ts files
  ],
  build: {
    target: 'esnext',
    minify: false,
    lib: {
      entry: resolve(__dirname, join('lib', 'index.ts')),
      name: name,
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // Exclude peer dependencies from the bundle to reduce bundle size
      external: ['react/jsx-runtime', ...Object.keys(peerDependencies)],
    },
  },
  test: {
    environment: 'jsdom',
    clearMocks: true,
    setupFiles: './src/test/vitest.setup.ts',
    coverage: {
      all: false,
      enabled: true,
    },
  },
});
