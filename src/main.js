import { createApp } from 'vue'
import App from './App.vue'
import { activationPoints } from "pluggable-electron"
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

createApp(App).mount('#app')
