// tile.js

export class Tile {
    constructor() {
        this.type = "generic";  // 기본 타일 타입
    }

    isWalkable() {
        return true;  // 기본적으로 이동 가능
    }

    onStep(player) {
        // 플레이어가 타일을 밟았을 때 동작 (하위 클래스에서 구현)
    }
}
