// floorTile.js

import { Tile } from './tile.js';

export class FloorTile extends Tile {
    constructor() {
        super();
        this.type = "floor";
    }

    isWalkable() {
        return true;
    }
}
