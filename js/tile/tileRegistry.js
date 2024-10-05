// tileRegistry.js

import { WallTile } from './wallTile.js';
import { FloorTile } from './floorTile.js';
import { VoidTile } from './voidTile.js';

// 새로운 타일이 추가될 때마다 여기서 등록만 하면 됨
export const tileRegistry = {
    wall: WallTile,
    floor: FloorTile,
    void: VoidTile,
    // 추후 새로운 타일 추가 가능 (예: trap: TrapTile)
};
