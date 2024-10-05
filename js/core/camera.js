export class Camera {
    constructor(viewportWidth, viewportHeight, map, player) {
        this.viewportWidth = viewportWidth;  // 카메라가 보여줄 가로 타일 개수
        this.viewportHeight = viewportHeight;  // 카메라가 보여줄 세로 타일 개수
        this.map = map;
        this.player = player;
        this.x = 0;  // 카메라의 시작 X 좌표
        this.y = 0;  // 카메라의 시작 Y 좌표
    }

    // 플레이어의 위치를 기준으로 카메라 이동
    moveToPlayer() {
        this.x = Math.max(0, this.player.x - Math.floor(this.viewportWidth / 2));
        this.y = Math.max(0, this.player.y - Math.floor(this.viewportHeight / 2));

        // 맵 끝부분에서 넘어가지 않도록 처리
        this.x = Math.min(this.x, this.map.cols - this.viewportWidth);
        this.y = Math.min(this.y, this.map.rows - this.viewportHeight);
    }

    // 카메라 뷰포트 내의 타일들만 렌더링
    renderViewport(gridElement) {
        gridElement.innerHTML = "";  // 기존 내용 지우기

        for (let row = this.y; row < this.y + this.viewportHeight; row++) {
            for (let col = this.x; col < this.x + this.viewportWidth; col++) {
                const tile = document.createElement("div");
                tile.classList.add("tile");

                const tileType = this.map.grid[row][col].type;
                tile.style.backgroundColor = this.map.grid[row][col].getColor();

                // 플레이어가 있는 위치 표시
                if (this.player.x === col && this.player.y === row) {
                    tile.style.backgroundColor = "blue";  // 플레이어 표시
                }

                gridElement.appendChild(tile);
            }
        }
    }
}
