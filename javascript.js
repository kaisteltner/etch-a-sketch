const MAX_SQUARES = 100;
let squareColor = [0, 0, 0];
// let randomColor = false;
let mouseDown = false;
let activeSquare = null;
const grid = document.querySelector('#grid');
const btnReset = document.querySelector('#btn-reset');
const btnRandom = document.querySelector('#btn-random');
const btnShade = document.querySelector('#btn-shade');
const inpNum = document.querySelector('#nSquaresInput');

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
  if (activeSquare === e.target) {return}
  activeSquare = e.target;
  
  if (btnShade.classList.contains('active') && e.target.style.opacity <= 1)  {
    e.target.style.opacity = Number(e.target.style.opacity) + 0.2
  } else {
    e.target.style.opacity = 1
  };

  if (btnRandom.classList.contains('active')) {
    for(var i = 0; i < 3; i++)
      squareColor[i] = (Math.floor(Math.random() * 255));
  } else {
    squareColor = [0, 0, 0];
  }
  e.target.style.backgroundColor = 'rgb('+ squareColor.join(',') +')';
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
  // Safety check that input is lower or equal to maximum allowed
  const userInput = inpNum.valueAsNumber;
  if (userInput > MAX_SQUARES || userInput < 1) {
    // Display alert as warning
    const alert = document.createElement('div');
    alert.classList.add("alert", "alert-warning", "alert-dismissible", "fade", "show", "text-center", "font-monospace");
    alert.setAttribute('role', 'alert');
    if (userInput > MAX_SQUARES) {
      alert.innerText = `Maximum number of squares per side is ${MAX_SQUARES}!`;
      inpNum.value = MAX_SQUARES;
    } else {
      alert.innerText = `Minimum number of squares per side is 1!`;
      inpNum.value = 1;
    }

    const btnAlert = document.createElement('button');
    btnAlert.setAttribute('type', 'button');
    btnAlert.setAttribute('data-bs-dismiss','alert');
    btnAlert.setAttribute('aria-label', 'close');
    btnAlert.classList.add('btn-close');
    alert.appendChild(btnAlert);

    document.getElementById('main-content').appendChild(alert);
  }
  nSquareBase = inpNum.valueAsNumber;
  grid.replaceChildren();
  addSquares();
};


// Startup
let nSquareBase = inpNum.valueAsNumber;
addSquares();
