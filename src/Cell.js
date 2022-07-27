import React from "react";
import { getRowCol, getXY } from "./Game";
import {CELL_COUNT, GRID_SIZE} from "./Constants";

function Cell(props) {
  const { cell, index, width, height, handleCellClick } = props;
  const { row, col } = getRowCol(index);
  const visualPos = getXY(row, col, width, height);
  const cellStyle = {
    width: `calc(100% / ${GRID_SIZE})`,
    height: `calc(100% / ${GRID_SIZE})`,
    translateX: visualPos.x,
    translateY: visualPos.y,
  };

  return (
        <li
          style={{
            width: cellStyle.width,
            height: cellStyle.height,
            transform: `translate3d(${cellStyle.translateX}px, ${cellStyle.translateY}px, 0)`,
            opacity: cell === CELL_COUNT - 1 ? 0 : 1,
          }}
          className="cell"
          onClick={() => handleCellClick(index)}
        >
            {cell + 1}
        </li>   
  );
}

export default Cell;