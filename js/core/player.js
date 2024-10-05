export class Player {
    constructor(x, y, grid) {
        this.x = x;
        this.y = y;
        this.grid = grid;  // 그리드와 상호작용
        this.previousPosition = { x: this.x, y: this.y };
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

        this.grid.renderGrid('grid', this);  // 플레이어를 넘겨서 렌더링
    }

    cancelMove() {
        this.x = this.previousPosition.x;
        this.y = this.previousPosition.y;
        this.grid.renderGrid('grid', this);
    }
}
