import { tileRegistry } from '../tile/tileRegistry.js';

class CorridorManager {
    static createCorridor(grid, pointA, pointB) {
        let { x: x1, y: y1 } = pointA;
        let { x: x2, y: y2 } = pointB;

        while (x1 !== x2) {
            grid[y1][x1] = new tileRegistry['floor']();
            x1 += x1 < x2 ? 1 : -1;
        }
        while (y1 !== y2) {
            grid[y1][x1] = new tileRegistry['floor']();
            y1 += y1 < y2 ? 1 : -1;
        }
    }

    static connectRooms(grid, rooms) {
        for (let i = 1; i < rooms.length; i++) {
            const roomA = rooms[i - 1];
            const roomB = rooms[i];

            const pointA = { x: Math.floor(roomA.x + roomA.width / 2), y: Math.floor(roomA.y + roomA.height / 2) };
            const pointB = { x: Math.floor(roomB.x + roomB.width / 2), y: Math.floor(roomB.y + roomB.height / 2) };

            this.createCorridor(grid, pointA, pointB);
        }
    }
}

export { CorridorManager };
