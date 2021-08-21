import path from "path"
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { injectHtml } from 'vite-plugin-html'

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    injectHtml({
      tags: [{
        tag: 'script',
        attrs: {
          type: 'importmap',
        },
        children: `{
          "imports": {
            "vue": "../node_modules/vue/dist/vue.esm-browser.js"
          }
        }`
      }]
    })
  ],
  build: {
    outDir: './app',
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
