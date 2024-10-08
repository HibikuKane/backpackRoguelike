export class Player {
    constructor(grid, turnManager) {  // TurnManager 객체 추가
        this.x = 0;
        this.y = 0;
        this.grid = grid;
        this.turnManager = turnManager;  // TurnManager를 저장
        this.previousPosition = { x: this.x, y: this.y };
        this.updatePlayerPosition();
    }

    setPosition(x, y) {
        this.previousPosition = { x: this.x, y: this.y };
        this.x = x;
        this.y = y;
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
            nextTile.onStep(this);
        } else {
            alert("You cannot walk here!");
        }

        this.updatePlayerPosition();
        this.endTurn();  // 턴 종료
    }

    endTurn() {
        console.log("Before setTimeout");  // 로그 추가
        setTimeout(() => {
            console.log("Player finished action, next turn!");  // 로그 확인
            this.turnManager.processTurn();  // TurnManager에 턴 종료 알림
        }, 200);
    }



    cancelMove() {
        this.x = this.previousPosition.x;
        this.y = this.previousPosition.y;
        this.updatePlayerPosition();
    }

    updatePlayerPosition() {
        this.grid.renderGrid('grid', this);
    }
}
