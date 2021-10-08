import { createApp } from 'vue'
import App from './App.vue'
import { activationPoints, extensionPoints } from "pluggable-electron"
import 'bootstrap/dist/css/bootstrap.min.css'

// Set Pluggable Electron up in the renderer
async function setupPE() {
  // Enable activation point management
  activationPoints.setup({ importer: async entryPoint => await import( /* @vite-ignore */ entryPoint) })

  // Register all active plugins with their activation points
  const plugins = await window.plugins.getActive()
  plugins.forEach(plugin => activationPoints.register(plugin))
}
setupPE()

const app = createApp(App)

// Provide the extension Manager to any component, including those in Plugins.
// This allows for plugins to manage their own extension points.
app.provide('extensionManager', extensionPoints)

app.mount('#app')
