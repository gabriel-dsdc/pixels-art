const colors = ['red', 'blue', 'green'];
const paletteSelector = document.getElementsByClassName('color');
const boardSelector = document.getElementById('pixel-board');

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
