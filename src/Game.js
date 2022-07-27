import { CELL_COUNT,GRID_SIZE } from "./Constants";

  export function isSolved(cells) {
    for (let i = 0, l = cells.length; i < l; i++) {
      if (cells[i] !== i) {
        return false;
      }
    }
    return true;
  }

  
export function getIndex(row, col) {
    return parseInt(row, 10) * GRID_SIZE + parseInt(col, 10);
  }
  
  export function getRowCol(index) {
    return {
      row: Math.floor(index / GRID_SIZE),
      col: index % GRID_SIZE,
    };
  }

  export function getXY(row, col, width, height) {
    return {
      x: col * width,
      y: row * height,
    };
  }

  export function shuffle(cells) {
    const shuffledCells = [
      ...cells
        .filter((t) => t !== cells.length - 1)
        .sort(() => Math.random() - 0.5),
      cells.length - 1,
    ];
    return isSolvable(shuffledCells) && !isSolved(shuffledCells)
      ? shuffledCells
      : shuffle(shuffledCells);
    }

    export function isSolvable(cells) {
      let product = 1;
      for (let i = 1, l = CELL_COUNT - 1; i <= l; i++) {
        for (let j = i + 1, m = l + 1; j <= m; j++) {
          product *= (cells[i - 1] - cells[j - 1]) / (i - j);
        }
      }
      return Math.round(product) === 1;
    }

  export function canSwap(srcIndex, destIndex) {
    const { row: srcRow, col: srcCol } = getRowCol(srcIndex);
    const { row: destRow, col: destCol } = getRowCol(destIndex);
    return Math.abs(srcRow - destRow) + Math.abs(srcCol - destCol) === 1;
  }
  
  export function swap(cells, src, dest) {
    const cellsResult = [...cells];
    [cellsResult[src], cellsResult[dest]] = [cellsResult[dest], cellsResult[src]];
    return cellsResult;
  }