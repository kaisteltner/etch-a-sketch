let nSquareBase = 16;
let mouseDown = false;
const grid = document.querySelector('#grid');
const btnReset = document.querySelector('#btn-reset');

// Function definitions
function addSquares() {
  // Set up grid of empty squares
  const baselength = grid.clientWidth / nSquareBase;
  for (let idxRow = 0; idxRow < nSquareBase; idxRow++) {
    const row = document.createElement('div');
    row.classList.add('grid-row');
    for (let idxCol = 0; idxCol < nSquareBase; idxCol++) {
      const square = document.createElement('div');
      square.classList.add('square');
      square.style.minWidth = `${baselength}px`;
      square.style.minHeight = `${baselength}px`;
      row.appendChild(square);
    }
    grid.appendChild(row);
  }
}

function colorSquare(e) {
  e.target.style.backgroundColor = 'black';
}

// Callbacks
document.body.onmousedown = function () {
  mouseDown = true;
};
document.body.onmouseup = function () {
  mouseDown = false;
  grid.onmousemove = null
};

grid.onmousedown = (e) => {
  colorSquare(e);
  grid.onmousemove = (e) => colorSquare(e);
};
grid.onmouseup = () => {
  grid.onmousemove = null;
};

btnReset.onclick = () => {
  squares = document.querySelectorAll('.square');
  squares.forEach((square) => {
    square.style.backgroundColor = 'white';
  });
};

// Startup
addSquares();
