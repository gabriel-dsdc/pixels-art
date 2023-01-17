const colors = ['white', 'red', 'green', 'blue', 'yellow', 'orange', 'purple', 'brown', 'magenta'];
const colorPalette = document.getElementById('color-palette');
const paletteSelector = colorPalette.getElementsByClassName('color');
const boardSelector = document.getElementById('pixel-board');
const boardPixels = document.getElementsByClassName('pixel');
let isPointerDown = false;
document.ondragstart = () => false;

function setPaletteColors() {
  for (let i = 0; i < 9; i += 1) {
    const color = document.createElement('div');
    color.classList.add('color');
    colorPalette.appendChild(color);
  }
  Object.keys(paletteSelector).forEach((key) => {
    if (paletteSelector[key] !== '0') {
      paletteSelector[key].style.backgroundColor = colors[key - 1];
    }
  });
  const colorInput = document.createElement('input');
  colorInput.id = 'custom-color-input';
  colorInput.type = 'color';
  colorInput.title = 'Escolher cor personalizada';
  colorPalette.appendChild(colorInput);
}
setPaletteColors();

function createPixel(pixelClass) {
  const pixel = document.createElement('div');
  if (pixelClass) {
    pixel.classList.add(pixelClass);
    pixel.addEventListener('pointerenter', ({ target }) => {
      if (isPointerDown === true) {
        target.style.backgroundColor = activeColor();
      }
    });
  }
  return pixel;
}

function generatePixelBoard(size) {
  let boardSize = size;
  if (size === undefined) {
    boardSize = 5;
  }
  for (let count = 0; count < boardSize; count += 1) {
    boardSelector.appendChild(createPixel());
    for (let count2 = 0; count2 < boardSize; count2 += 1) {
      const mainDiv = document.querySelectorAll('#pixel-board > div')[count];
      mainDiv.appendChild(createPixel('pixel'));
    }
  }
}
generatePixelBoard();

function createPixelBoard() {
  boardSelector.innerHTML = null;
  const boardInput = document.getElementById('board-size').value;
  if (!boardInput) {
    alert('Board inválido!');
  }
  let size = boardInput;
  if (!boardInput || boardInput < 5) {
    size = '5';
  }
  if (boardInput > 50) {
    size = '50';
  }
  generatePixelBoard(size);
}

function colorSelector(target) {
  const selected = document.getElementsByClassName('selected')[0];
  selected.classList.remove('selected');
  target.classList.add('selected');
}

function activeColor() {
  const selected = document.getElementsByClassName('selected')[0];
  if (selected.type) {
    return selected.value;
  }
  const cssObj = window.getComputedStyle(selected);
  const currentColor = cssObj.getPropertyValue('background-color');
  return currentColor;
}

function boardClear() {
  Object.keys(boardPixels).forEach((key) => {
    boardPixels[key].style.backgroundColor = null;
  });
}

['pointerdown', 'pointerup'].forEach((type) => {
  document.addEventListener(type, ({ target }) => {
    isPointerDown = !isPointerDown;
    if (isPointerDown && target.classList.contains('pixel')) {
      target.style.backgroundColor = activeColor();
    }
  });
});

document.addEventListener('pointerdown', ({ target }) => {
  if (target.classList.contains('color')) {
    colorSelector(target);
  }
  if (target.id === 'clear-board') {
    boardClear();
  }
  if (target.id === 'generate-board') {
    createPixelBoard();
  }
});

const customColorInput = document.querySelector('input[type=color]');
customColorInput.addEventListener('change', ({ target }) => {
  colorSelector(target);
});
