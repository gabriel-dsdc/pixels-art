const colors = ['red', 'blue', 'green'];
const colorPalette = document.getElementById('color-palette');
const paletteSelector = colorPalette.getElementsByClassName('color');
const boardSelector = document.getElementById('pixel-board');
const boardPixels = document.getElementsByClassName('pixel');

function setPaletteColors() {
  const paletteKeys = Object.keys(paletteSelector);
  paletteKeys.forEach((key) => {
    if (paletteKeys[key] !== '0') {
      paletteSelector[key].style.backgroundColor = colors[key - 1];
    }
  });
}
setPaletteColors();

function createPixel(pixelClass) {
  const pixel = document.createElement('div');
  if (pixelClass !== undefined) {
    pixel.classList = pixelClass;
  }
  return pixel;
}

function generatePixelBoard() {
  for (let count = 0; count < 5; count += 1) {
    boardSelector.appendChild(createPixel());
    for (let count2 = 0; count2 < 5; count2 += 1) {
      const mainDiv = document.querySelectorAll('#pixel-board > div')[count];
      mainDiv.appendChild(createPixel('pixel'));
    }
  }
}
generatePixelBoard();

function colorSelector(event) {
  for (let index = 0; index < paletteSelector.length; index += 1) {
    if (paletteSelector[index].classList.contains('selected')) {
      paletteSelector[index].classList.remove('selected');
    }
  }
  event.target.classList.add('selected');
}

function activeColor() {
  let currentColor = 'black';
  for (let index = 0; index < paletteSelector.length; index += 1) {
    if (paletteSelector[index].classList.contains('selected')) {
      const cssObj = window.getComputedStyle(paletteSelector[index], null);
      currentColor = cssObj.getPropertyValue('background-color');
    }
  }
  return currentColor;
}

function boardClear() {
  Object.keys(boardPixels).forEach((key) => {
    boardPixels[key].style.backgroundColor = null;
  });
}

document.addEventListener('click', (event) => {
  const clicked = event.target;
  if (clicked.classList.contains('color')) {
    colorSelector(event);
  }
  if (clicked.classList.contains('pixel')) {
    clicked.style.backgroundColor = activeColor();
  }
  if (clicked.id === 'clear-board') {
    boardClear();
  }
}, false);
