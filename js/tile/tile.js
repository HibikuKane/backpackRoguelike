export class Tile {
    constructor() {
        this.type = "generic";
    }

    // 기본 색상 메서드 (void와 같은 기본 색상)
    getColor() {
        return "lightgray";  // 기본 발판 색상
    }

    isWalkable() {
        return true;  // 기본적으로 이동 가능
    }

    onStep(player) {
        // 타일을 밟았을 때 동작 (상속받은 클래스에서 구현)
    }
}
