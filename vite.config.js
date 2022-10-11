import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import { injectHtml } from 'vite-plugin-html'
import { viteExternalsPlugin } from 'vite-plugin-externals'

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    viteExternalsPlugin({
      vue: 'Vue'
    }),
  ],
  build: {
    outDir: './app',
  },
  server: {
    port: 3000
  }
})
