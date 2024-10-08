export class TurnManager {
    constructor() {
        this.currentTurn = 0;
        this.turnQueue = [];  // 턴을 수행할 객체들 저장
    }

    addEntity(entity) {
        this.turnQueue.push(entity);
    }

    processTurn() {
        const entity = this.turnQueue.shift();  // 다음 턴을 가져옴
        entity.takeTurn();  // 엔티티가 턴을 수행
        this.turnQueue.push(entity);  // 다시 대기열에 추가
        this.currentTurn++;
    }
}
