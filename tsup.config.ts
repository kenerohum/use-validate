// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.tsx'],
  format: ['esm'],
  dts: true,
  target: 'esnext',
  sourcemap: true,
  clean: true,
  minify: false,
});
