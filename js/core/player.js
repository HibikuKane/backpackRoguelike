export class Player {
    constructor(grid) {
        this.x = 0;
        this.y = 0;
        this.grid = grid;
        this.previousPosition = { x: this.x, y: this.y };
        this.updatePlayerPosition();
    }

    // 플레이어 위치 설정 함수 추가
    setPosition(x, y) {
        this.previousPosition = { x: this.x, y: this.y };  // 이전 위치 저장
        this.x = x;  // 새로운 x 좌표 설정
        this.y = y;  // 새로운 y 좌표 설정
        this.updatePlayerPosition();  // 플레이어 위치 업데이트
    }

    move(direction) {
        this.previousPosition = { x: this.x, y: this.y };

        let newX = this.x;
        let newY = this.y;

        switch (direction) {
            case "up":
                newY--;  // 한 칸 위로 이동
                break;
            case "down":
                newY++;  // 한 칸 아래로 이동
                break;
            case "left":
                newX--;  // 한 칸 왼쪽으로 이동
                break;
            case "right":
                newX++;  // 한 칸 오른쪽으로 이동
                break;
        }

        const nextTile = this.grid.getTile(newX, newY);
        if (nextTile && nextTile.isWalkable()) {
            this.x = newX;
            this.y = newY;
            nextTile.onStep(this);  // 타일의 특수 동작 실행
        } else {
            alert("You cannot walk here!");
        }

        this.updatePlayerPosition();
    }


    cancelMove() {
        this.x = this.previousPosition.x;
        this.y = this.previousPosition.y;
        this.updatePlayerPosition();
    }

    updatePlayerPosition() {
        this.grid.renderGrid('grid', this);  // 그리드를 다시 렌더링
    }
}
