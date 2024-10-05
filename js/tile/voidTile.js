// voidTile.js

import { Tile } from './tile.js';

export class VoidTile extends Tile {
    constructor() {
        super();
        this.type = "void";
    }

    isWalkable() {
        return true;  // 이동 가능
    }

    onStep(player) {
        alert("You stepped into the void!");  // 공허 타일 경고
        player.cancelMove();  // 이동 취소
    }
}
