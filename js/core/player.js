export class Player {
    constructor(x, y, grid) {
        this.x = x;
        this.y = y;
        this.grid = grid;
        this.previousPosition = { x: this.x, y: this.y };
        this.updatePlayerPosition();
    }

    move(direction) {
        this.previousPosition = { x: this.x, y: this.y };

        let newX = this.x;
        let newY = this.y;

        switch (direction) {
            case "up":
                newY--;
                break;
            case "down":
                newY++;
                break;
            case "left":
                newX--;
                break;
            case "right":
                newX++;
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
        this.grid.setPlayerPosition(this.x, this.y);  // 플레이어 위치를 그리드에 반영
        this.grid.renderGrid('grid');  // 그리드를 다시 렌더링
    }
}
