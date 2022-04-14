// Make Pluggable Electron's facade available to hte renderer on window.plugins
const { contextBridge } = require('electron')
const facade = require("pluggable-electron/preload")

contextBridge.exposeInMainWorld("plugins", facade)
