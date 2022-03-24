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

function generatePixelBoard(boardSize) {
  for (let count = 0; count < boardSize; count += 1) {
    boardSelector.appendChild(createPixel());
    for (let count2 = 0; count2 < boardSize; count2 += 1) {
      const mainDiv = document.querySelectorAll('#pixel-board > div')[count];
      mainDiv.appendChild(createPixel('pixel'));
    }
  }
}
function createPixelBoard(boardInput) {
  let boardSize = boardInput;
  if (boardInput === undefined || boardInput < 5) {
    boardSize = '5';
  }
  if (boardInput > 50) {
    boardSize = '50';
  }
  generatePixelBoard(boardSize);
}
generatePixelBoard();

function colorSelector(clicked) {
  for (let index = 0; index < paletteSelector.length; index += 1) {
    if (paletteSelector[index].classList.contains('selected')) {
      paletteSelector[index].classList.remove('selected');
    }
  }
  clicked.classList.add('selected');
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

function otherFeatures(clicked) {
  if (clicked.id === 'clear-board') {
    boardClear();
  }

  if (clicked.id === 'generate-board') {
    boardSelector.innerHTML = null;
    const boardInput = document.getElementById('board-size').value;
    if (boardInput === '') {
      return alert('Board inválido!');
    }
    createPixelBoard(boardInput);
  }
}

document.addEventListener('click', (event) => {
  const clicked = event.target;
  if (clicked.classList.contains('color')) {
    colorSelector(clicked);
  }
  if (clicked.classList.contains('pixel')) {
    clicked.style.backgroundColor = activeColor();
  }
  otherFeatures(clicked);
}, false);
