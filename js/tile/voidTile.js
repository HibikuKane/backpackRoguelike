import { Tile } from './tile.js';

export class VoidTile extends Tile {
    constructor() {
        super();
        this.type = "void";
    }

    // 공허 타일의 색상 지정
    getColor() {
        return "black";  // 공허 타일은 검정색
    }

    isWalkable() {
        return false;
    }

    onStep(player) {
        alert("You stepped into the void!");
        player.cancelMove();  // 이동 취소
    }
}
