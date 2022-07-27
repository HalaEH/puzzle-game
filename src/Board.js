import React, { useState } from "react";
import Cell from "./Cell";
import { CELL_COUNT, GRID_SIZE, BOARD_SIZE } from "./Constants";
import { shuffle, canSwap, swap, isSolved } from "./Game";

function Board() {
    const [cells, setCells] = useState([...Array(CELL_COUNT).keys()]);
    const [isStarted, setIsStarted] = useState(false);
    const [moves, updateMoves] = useState(0);

    const shuffleCells = () => {
        const shuffledCells = shuffle(cells)
        setCells(shuffledCells);
    }

    const swapCells = (cellIndex) => {
        if (canSwap(cellIndex, cells.indexOf(cells.length - 1))) {
            const swappedCells = swap(cells, cellIndex, cells.indexOf(cells.length - 1))
            setCells(swappedCells)
        }
    }

    const handleCellClick = (index) => {
        swapCells(index);
        updateMoves(moves + 1);
    }

    const handleShuffleClick = () => {
        shuffleCells();
        updateMoves(0);
    }

    const handleStartClick = () => {
        shuffleCells();
        setIsStarted(true);
        updateMoves(0);
    }

    const pieceWidth = Math.round(BOARD_SIZE / GRID_SIZE);
    const pieceHeight = Math.round(BOARD_SIZE / GRID_SIZE);
    const style = {
        width: BOARD_SIZE,
        height: BOARD_SIZE,
    };

    const hasWon = isSolved(cells);

    return (
        <>
            <ul style={style} className="board">
                {cells.map((cell, index) => (
                    <Cell
                        key={cell}
                        index={index}
                        cell = {cell}
                        width={pieceWidth}
                        height={pieceHeight}
                        handleCellClick={handleCellClick}
                    />
                ))}
            </ul>
            {hasWon && isStarted && <div>Puzzle solved</div>}
            {!isStarted ?
                (<button onClick={() => handleStartClick()}>Start Game</button>) :
                (<button onClick={() => handleShuffleClick()}>Restart Game</button>)}
        </>
    );
}

export default Board;
