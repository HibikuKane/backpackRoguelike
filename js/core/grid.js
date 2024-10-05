import { tileRegistry } from '../tile/tileRegistry.js';

export class Grid {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.grid = this.createGrid();
    }

    createGrid() {
        const grid = [];
        for (let row = 0; row < this.rows; row++) {
            let rowArray = [];
            for (let col = 0; col < this.cols; col++) {
                rowArray.push(new tileRegistry['wall']());  // 벽으로 초기화
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

    // 그리드 렌더링 (플레이어 위치 포함)
    renderGrid(elementId, player) {
        const gridElement = document.getElementById(elementId);
        gridElement.innerHTML = "";  // 기존 내용 지우기
    
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const tile = document.createElement("div");
                tile.classList.add("tile");
    
                const tileType = this.grid[row][col].type;
                tile.style.backgroundColor = this.grid[row][col].getColor();
    
                // 플레이어가 있는 위치면 파란색으로 표시
                if (player && player.x === col && player.y === row) {
                    tile.style.backgroundColor = "blue";
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
