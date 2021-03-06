// Provide menu item as plain object
const newItem = { text: "Item from object" }

// Provide menu item as callback.
// The parent that is provided by the extension point is returned in the object
const newChildItem = parent => ({
  parent,
  text: 'Child item from function'
})

// Provide menu item as async callback
// Does the same as the previous function otherwise
const asyncChildItem = parent => new Promise(resolve => {
  setTimeout(() => resolve({
    parent,
    text: 'Child item from async function'
  }), 500)
})

// Provide an async method to manipulate the price provided by the extension point
const addVat = price => new Promise(resolve => {
  const vat = 1.20
  setTimeout(() => resolve(price * vat), 1)
})

// Provide a synchronous method to manipulate the price provided by the extension point
const addDelivery = price => price + 5

// Append in img element to the img-viewer div with the provided url as source.
// The url is provided by the extension point.
const displayImg = url => {
  const img = document.createElement("img");
  img.setAttribute('src', url)
  img.setAttribute('width', '100%')
  document.getElementById('img-viewer').appendChild(img)
}

// Register all the above functions and objects with the relevant extension points
export function init(registerExtensions) {
  registerExtensions('extend-menu', 'newItem', newItem)
  registerExtensions('extend-menu', 'newChildItem', newChildItem)
  registerExtensions('extend-menu', 'asyncChildItem', asyncChildItem)
  // Notice that for the calc-price extension point, the addVat function is executed
  // before the addDelivery because it has a lower priority
  registerExtensions('calc-price', 'addVat', addVat, 1)
  registerExtensions('calc-price', 'addDelivery', addDelivery, 10)
  registerExtensions('display-img', 'displayImg', displayImg)
}