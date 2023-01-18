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
    pixel.addEventListener('pointermove', (e) => {
      const eFromPoint = document.elementFromPoint(e.clientX, e.clientY);
      if (isPointerDown && eFromPoint && eFromPoint.classList.contains('pixel')) {
        eFromPoint.style.backgroundColor = activeColor();
      }
    });
  }
  return pixel;
}

function generatePixelBoard(width = 5, height = 5) {
  for (let count = 0; count < height; count += 1) {
    boardSelector.appendChild(createPixel());
    for (let count2 = 0; count2 < width; count2 += 1) {
      const mainDiv = document.querySelectorAll('#pixel-board > div')[count];
      mainDiv.appendChild(createPixel('pixel'));
    }
  }
}
generatePixelBoard();

function createPixelBoard() {
  boardSelector.innerHTML = null;
  let boardWidth = document.getElementById('board-width').value;
  let boardHeight = document.getElementById('board-height').value;
  if (!boardWidth || !boardHeight) {
    alert('Board inválido!');
  }
  if (!boardWidth || boardWidth < 5) {
    boardWidth = '5';
  }
  if (!boardHeight || boardHeight < 5) {
    boardHeight = '5';
  }
  if (boardWidth > 50) {
    boardWidth = '50';
  }
  if (boardHeight > 50) {
    boardHeight = '50';
  }
  generatePixelBoard(Number(boardWidth), Number(boardHeight));
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

const customColorInput = document.getElementById('custom-color-input');
document.addEventListener('pointerup', () => isPointerDown = false);
document.addEventListener('pointerdown', ({ target }) => {
  isPointerDown = true;
  if (target.classList.contains('color')) {
    colorSelector(target);
  }
  if (isPointerDown && target.classList.contains('pixel')) {
    target.style.backgroundColor = activeColor();
  }
  if (target.id === 'custom-color-input') {
    colorSelector(target);
  }
  if (target.id === 'clear-board') {
    boardClear();
  }
  if (target.id === 'generate-board') {
    createPixelBoard();
  }
});

customColorInput.addEventListener('change', ({ target }) => {
  colorSelector(target);
});
