# Pluggable Electron demo

**Clone and run for a quick way to see Pluggable Electron in action.**

This is a minimal Electron application based on the [Quick Start Guide](https://electronjs.org/docs/tutorial/quick-start)
and enhanced with [Pluggable Electron](https://github.com/dutchigor/pluggable-electron). the purpose is to showcase the basics of Pluggable Electron.

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/dutchigor/pluggable-electron-demo

# Go into the repository
cd pluggable-electron-demo

# Install dependencies
npm install

# package plugin
npm run pkg-plugin

# Run the app
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
  - Add a url to the image url input and click Display image to attach an image to the card.
    - This demonstrates an extension without a return value but manipulating the app directly.

Detailed documentation on how to use Pluggable Electron can be found [here](https://github.com/dutchigor/pluggable-electron/wiki)

## License

[CC0 1.0 (Public Domain)](LICENSE.md)
