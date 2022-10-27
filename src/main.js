import { createApp } from 'vue'
import App from './App.vue'
import { setup, extensionPoints, plugins } from "pluggable-electron/renderer"
import 'bootstrap/dist/css/bootstrap.min.css'

// Set Pluggable Electron up in the renderer
async function setupPE() {
  // Enable activation point management
  setup({ importer: async entryPoint => await import( /* @vite-ignore */ entryPoint) })

  // Register all active plugins with their activation points
  await plugins.registerActive()
}
setupPE()

const app = createApp(App)

// Provide the extension Manager to any component, including those in Plugins.
// This allows for plugins to manage their own extension points.
app.provide('extensionManager', extensionPoints)

app.mount('#app')
