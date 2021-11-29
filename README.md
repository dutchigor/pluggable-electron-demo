# Pluggable Electron demo with Vue and Vite

**Clone and run for a quick way to see Pluggable Electron in action.**

This is a minimal Electron application based on the [Quick Start Guide](https://electronjs.org/docs/tutorial/quick-start)
and enhanced with [Pluggable Electron](https://github.com/dutchigor/pluggable-electron). The purpose is to showcase the basics of Pluggable Electron. It includes both a main app and an example plugin.

## To Use

To use this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. Create a new folder to host your project and from your command line:

```bash
# Clone this repository
npx degit https://github.com/dutchigor/pluggable-electron-demo#with-vue

# Install dependencies for app and plugin
npm install
cd demo-plugin
npm install

# package plugin
npm run package

# Run the app
cd ..
npm start
```

Once the application is open, you can try it out:

- Install the example plugin: select ./demo-plugin/demo-plugin-2.0.0.tgz (created in the previous step) in Package file and click install
- Activate the plugin's extension point: Click on Activate Plugin
- Try out the extension points:
  - Click on Extend demo menu to enrich the menu with the items defined in the plugin extensions. This demonstrates
    - an extension returning a plain object
    - an extension returning a callback, taking the parent menu item as an input
    - an extension returning an asynchronous callback
  - Add a value for the demo price and click on Calculate costs to see the cost calculated
    - This demonstrates 2 functions manipulating the cost in serial
  - Add some urls to the image url input and click Display images to attach an image to the card.
    - This demonstrates an extension that that returns a component (Instead of manipulating the dom directly in the extension as you might do in plain JavaScript)

Detailed documentation on how to use Pluggable Electron can be found [here](https://github.com/dutchigor/pluggable-electron/wiki)

## Considerations when using Pluggable Electron with Vue
This branch demonstrates using Pluggable Electron with Vue and Vite. Both the main app and the plugin are built with Vite.

Most of the content of this demo is standard Electron/Vue/Vite but there are a few sections of code that require attention to use Pluggable Electron with this setup.

### Initialising Pluggable Electron
As described in the [Pluggable Electron documentation](https://github.com/dutchigor/pluggable-electron/wiki#plugin-lifecycle), it needs to be initialised in 3 different places to make use of all the capabilities: the main process, the preload file, and the renderer. This is implemented in this demo as described below.

#### Main process
Plugin management is initialised in main.js. This is done as soon as the app is ready, using Pluggable Electron's init function. See the [API documentation](https://github.com/dutchigor/pluggable-electron/wiki/Plugin-manager-API#initfacade-pluginspath--pluginmanager) for more details.

To support loading the application from Vite's dev server when developing, the createWindow function has also been updated to conditionally load index.html from either the dev server or the compiled file. 

#### Preload
In order to call the Plugin Management API from the renderer, Plugin Electron's facade is loaded in the preload (preload.js).

#### Renderer process
Vite is used to provide the Vue app to the renderer process, which requires 2 configurations.

Execution management is initialised in scr/main.js using the activationPoints.setup function. The importer method for this has the `/* @vite-ignore */` comment in it, otherwise Vite would try to package the import function which would fail.

 By default Vite saves the builds to the dist folder. However, this is also the location where Electron Builder stores its build files by default. To resolve this conflict, the build file is modified using the build.outDir property in vite.config.js.

### The plugin setup
The demo-plugin folder includes an example plugin. For an app that is created with Vite it is easiest to also implement a plugin with Vite but it can also be done using Vue CLI. In this example it is done using Vite.

A plugin for a Vue app should be built as a library. In Vite this is done by adding a build.lib object in vite.config.js. Since the renderer will always be Chromium, which supports ES modules, only the es format is built.

### injecting components into Vue at runtime
Vue is designed to package the whole application at build time (at least when using single file components). However, the plugin architecture relies on the ability to insert code at runtime.

To solve this, Vue should be excluded from both the main app and any plugin bundles, and preloaded separately in the app at runtime. Vite supports this setup as follows:
- Install the Vite Externals plugin in both the main app and all plugins, and in each of their vite.config.js files, configure the plugin to externalise Vue
- Add a script tag pointing to vue.global.js in index.html.

### Allow plugins to execute their own extension points
One of the powerful features of Pluggable Electron is that it can allow for plugins to extend other plugins. To make this possible in Vue, the executionPoints object is provided in src/main.js. It can then be injected into any component to execute an extension point.

## License

[CC0 1.0 (Public Domain)](LICENSE.md)
