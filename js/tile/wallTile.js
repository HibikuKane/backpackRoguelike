import { Tile } from './tile.js';

export class WallTile extends Tile {
    constructor() {
        super();
        this.type = "wall";
    }

    // 벽 타일의 색상 지정
    getColor() {
        return "gray";  // 벽은 회색
    }

    isWalkable() {
        return false;  // 벽은 이동 불가
    }
}
