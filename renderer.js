// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

document.getElementById( 'set-plugin-dir' ).addEventListener( 'click', ( e ) => {
  ipc.invoke( 'pluggable:updatePluginsPath' )
    .then( 
      document.querySelectorAll( 'button' ).forEach(
        button => button.disabled = false
      )    
    )
})

document.getElementById( 'install-file' ).addEventListener( 'submit', ( e ) => {
  e.preventDefault()
  const pluginFile = new FormData( e.target ).get( 'plugin-file' ).path

  ipc.invoke( 'pluggable:install', pluginFile )
    .then( res => console.log( res ) )
})

document.getElementById( 'install-pkg' ).addEventListener( 'submit', ( e ) => {
  e.preventDefault()
  const formData = new FormData( e.target ),
    pluginPkg = formData.get( 'plugin-pkg' ),
    pluginVersion = formData.get( 'plugin-version' )

  ipc.invoke( 'pluggable:install', pluginPkg, pluginVersion )
    .then( res => console.log( res ) )
})
