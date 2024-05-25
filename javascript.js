let nSquareBase = 16;
const grid = document.querySelector("#grid");

function addSquares() {
    // Set up grid of empty squares
    const baselength = grid.clientWidth / nSquareBase;
    for (let idxRow = 0; idxRow < nSquareBase; idxRow++) {
        const row = document.createElement("div");
        row.classList.add('grid-row');
        for (let idxCol = 0; idxCol < nSquareBase; idxCol++) {
            const square = document.createElement("div");
            square.classList.add('square');
            square.style.minWidth = `${baselength}px`;
            square.style.minHeight = `${baselength}px`;
            row.appendChild(square);
        }
        grid.appendChild(row);
    }
}
    
addSquares();