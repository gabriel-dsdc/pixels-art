const colors = ['red', 'blue', 'green'];
const paletteSelector = document.getElementsByClassName('color');

function setPaletteColors() {
  const paletteKeys = Object.keys(paletteSelector);
  paletteKeys.forEach((key) => {
    if (paletteKeys[key] !== '0') {
      paletteSelector[key].style.backgroundColor = colors[key - 1];
    }
  });
}
setPaletteColors();
