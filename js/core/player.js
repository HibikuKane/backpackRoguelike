// player.js

export class Player {
    constructor(x, y, grid) {
        this.x = x; // 플레이어의 초기 x 위치
        this.y = y; // 플레이어의 초기 y 위치
        this.grid = grid; // 플레이어가 속한 그리드 객체
        this.previousPosition = { x: this.x, y: this.y }; // 이전 위치 저장
        this.updatePlayerPosition(); // 플레이어 초기 위치 업데이트
    }

    // 플레이어 이동 함수
    move(direction) {
        // 이동 전 현재 위치를 저장
        this.previousPosition = { x: this.x, y: this.y };

        switch (direction) {
            case "up":
                if (this.grid.isValidPosition(this.x, this.y - 1)) {
                    this.y--;
                }
                break;
            case "down":
                if (this.grid.isValidPosition(this.x, this.y + 1)) {
                    this.y++;
                }
                break;
            case "left":
                if (this.grid.isValidPosition(this.x - 1, this.y)) {
                    this.x--;
                }
                break;
            case "right":
                if (this.grid.isValidPosition(this.x + 1, this.y)) {
                    this.x++;
                }
                break;
        }
        this.updatePlayerPosition(); // 이동 후 플레이어 위치 업데이트
    }

    // 플레이어의 위치를 그리드에 반영
    updatePlayerPosition() {
        // 이전 타일을 빈 상태로 되돌리기
        this.grid.updateTile(this.previousPosition.x, this.previousPosition.y, null);

        // 새로운 타일에 플레이어 추가
        this.grid.updateTile(this.x, this.y, 'player');
        this.grid.renderGrid('grid'); // 위치 업데이트 후 그리드를 다시 렌더링
    }
}
