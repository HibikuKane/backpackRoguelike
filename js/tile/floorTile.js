import { Tile } from './tile.js';

export class FloorTile extends Tile {
    constructor() {
        super();
        this.type = "floor";
    }

    // 발판 타일 색상
    getColor() {
        return "lightgray";  // 발판 타일 색상 (디폴트)
    }
}
