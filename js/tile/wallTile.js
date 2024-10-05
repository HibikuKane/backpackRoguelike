// wallTile.js

import { Tile } from './tile.js';

export class WallTile extends Tile {
    constructor() {
        super();
        this.type = "wall";
    }

    isWalkable() {
        return false;  // 벽은 이동 불가
    }
}
