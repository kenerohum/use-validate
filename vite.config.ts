//import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts';
// https://vite.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: './src/index.tsx',
      name: '@kenero/use-validate',
      fileName: "index",
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  plugins: [react(), dts({
    include: ["src/index.tsx"]
  })],
})
