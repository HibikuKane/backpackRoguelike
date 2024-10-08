export class Camera {
    constructor(viewportWidth, viewportHeight, grid, player) {
        this.viewportWidth = viewportWidth;
        this.viewportHeight = viewportHeight;
        this.grid = grid;
        this.player = player;
        this.viewportX = 0;  // 초기화
        this.viewportY = 0;  // 초기화
    }

    // 카메라 범위 안에 있는지 확인하는 함수
    isInsideCamera(x, y) {
        // 카메라가 현재 보여주는 영역 내에 있는지 확인
        return (
            x >= this.x && x < this.x + this.viewportWidth &&
            y >= this.y && y < this.y + this.viewportHeight
        );
    }

    // 플레이어의 위치를 기준으로 카메라 이동
    moveToPlayer() {
        this.x = Math.max(0, this.player.x - Math.floor(this.viewportWidth / 2));
        this.y = Math.max(0, this.player.y - Math.floor(this.viewportHeight / 2));

        // 맵 끝부분에서 넘어가지 않도록 처리
        this.x = Math.min(this.x, this.grid.cols - this.viewportWidth);
        this.y = Math.min(this.y, this.grid.rows - this.viewportHeight);
    }

    // 카메라 뷰포트 내의 타일들만 렌더링
    renderViewport(gridElement) {
        gridElement.innerHTML = "";  // 기존 내용 지우기

        for (let row = this.y; row < this.y + this.viewportHeight; row++) {
            for (let col = this.x; col < this.x + this.viewportWidth; col++) {
                const tile = document.createElement("div");
                tile.classList.add("tile");

                const tileType = this.grid.grid[row][col].type;
                tile.style.backgroundColor = this.grid.grid[row][col].getColor();

                // 플레이어가 있는 위치 표시
                if (this.player.x === col && this.player.y === row) {
                    tile.style.backgroundColor = "blue";  // 플레이어 표시
                }

                gridElement.appendChild(tile);
            }
        }
    }
}
