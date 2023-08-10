// script.js
const numRows = 20;
const numCols = 20;
const interval = 200; // Milliseconds between generations
const grid = new Array(numRows).fill(null).map(() => new Array(numCols).fill(false));
const directions = [-1, 0, 1];

const gridElement = document.getElementById("grid");



// Initialize grid with random live cells
function initializeGrid() {
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            grid[row][col] = Math.random() < 0.3;
        }
    }
}

// Update grid based on Game of Life rules
function updateGrid() {
    const newGrid = new Array(numRows).fill(null).map(() => new Array(numCols).fill(false));

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const liveNeighbors = countLiveNeighbors(row, col);

            if (grid[row][col]) {
                newGrid[row][col] = liveNeighbors === 2 || liveNeighbors === 3;
            } else {
                newGrid[row][col] = liveNeighbors === 3;
            }
        }
    }

    grid.splice(0, grid.length, ...newGrid);
}

// Count live neighbors for a cell
function countLiveNeighbors(row, col) {
    let count = 0;

    for (const dx of directions) {
        for (const dy of directions) {
            if (dx === 0 && dy === 0) continue;

            const newRow = row + dx;
            const newCol = col + dy;

            if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
                count += grid[newRow][newCol] ? 1 : 0;
            }
        }
    }

    return count;
}

// Render the grid on the webpage
function renderGrid() {
    gridElement.innerHTML = "";

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.style.backgroundColor = grid[row][col] ? "#fff" : "#000";
            gridElement.appendChild(cell);
        }
    }
}

function animateGameOfLife() {
    updateGrid();
    renderGrid();
    setTimeout(animateGameOfLife, interval);
}

initializeGrid();
renderGrid();
animateGameOfLife();
