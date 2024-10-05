import { WallTile } from '../tile/wallTile.js';
import { FloorTile } from '../tile/floorTile.js';
import { VoidTile } from '../tile/voidTile.js';

export class Grid {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.grid = this.createGrid();
    }

    // 그리드 생성
    createGrid() {
        let grid = [];
        for (let row = 0; row < this.rows; row++) {
            let rowArray = [];
            for (let col = 0; col < this.cols; col++) {
                const rand = Math.random();
                if (rand < 0.7) {
                    rowArray.push(new FloorTile());
                } else if (rand < 0.9) {
                    rowArray.push(new WallTile());
                } else {
                    rowArray.push(new VoidTile());
                }
            }
            grid.push(rowArray);
        }
        return grid;
    }

    // 특정 위치의 타일 반환
    getTile(x, y) {
        if (this.isValidPosition(x, y)) {
            return this.grid[y][x];
        }
        return null;
    }

    // 그리드 렌더링
    renderGrid(elementId) {
        const gridElement = document.getElementById(elementId);
        gridElement.innerHTML = "";  // 기존 내용 지우기
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const tile = document.createElement("div");
                tile.classList.add("tile");

                // 타일 종류에 따른 색상 변경
                const tileType = this.grid[row][col].type;
                if (tileType === "wall") {
                    tile.style.backgroundColor = "gray";
                } else if (tileType === "void") {
                    tile.style.backgroundColor = "black";
                } else {
                    tile.style.backgroundColor = "lightgray";
                }

                gridElement.appendChild(tile);
            }
        }
    }

    // 그리드 유효성 검사
    isValidPosition(x, y) {
        return x >= 0 && x < this.cols && y >= 0 && y < this.rows;
    }
}
