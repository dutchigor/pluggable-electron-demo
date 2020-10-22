// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain, dialog} = require('electron')
const path = require('path')
const pe = require( 'pluggable-electron' )
const winStateMan = require( 'electron-window-state' )

function createWindow () {
  // Initialise window state manager
  let winState = winStateMan({
    defaultWidth: 1000,
    defaultHeight: 800
  })

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: winState.width,
    height: winState.height,
    x: winState.x,
    y: winState.y,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Store mainWindow state
  winState.manage( mainWindow )

  ipcMain.handle( 'pluggable:updatePluginsPath', ( e ) => {
    dialog.showOpenDialog( mainWindow, {
      properties: ['openDirectory']
    }).then(
      dir => {
        pe.updatePluginsPath( dir.filePaths[0] )
        return true
      }
    )
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  // Initialise Pluggable Electron with the plugins folder
  pe.init()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
