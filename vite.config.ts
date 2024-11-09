//import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts';
// https://vite.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: './src/index.tsx',
      name: 'UseValidate',
      fileName: (format) => `use-validate.${format}.js`,
    },
    rollupOptions: {
      output: [
        {
          format: 'es',            // Formato ES (módulo ECMAScript)
          dir: 'dist',             // Diretório onde os arquivos serão gerados
          entryFileNames: 'use-validate.es.js', // Nome do arquivo de saída ESM
        },
        {
          format: 'umd',           // Formato UMD
          dir: 'dist',             // Diretório de saída
          entryFileNames: 'use-validate.umd.js', // Nome do arquivo de saída UMD
          name: 'UseValidate',     // Nome global do pacote
        },
      ],
    },
  },
  plugins: [react(), dts()],
})
