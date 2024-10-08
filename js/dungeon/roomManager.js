import { roomSettings } from './roomSettings.js';
import { tileRegistry } from '../tile/tileRegistry.js';

class RoomManager {
    static createRoom(map, cols, rows, roomType) {
        const settings = roomSettings[roomType];
        const roomWidth = Math.floor(Math.random() * (settings.widthRange[1] - settings.widthRange[0])) + settings.widthRange[0];
        const roomHeight = Math.floor(Math.random() * (settings.heightRange[1] - settings.heightRange[0])) + settings.heightRange[0];
        const x = Math.floor(Math.random() * (cols - roomWidth - 2)) + 1;
        const y = Math.floor(Math.random() * (rows - roomHeight - 2)) + 1;

        return {
            x: x,
            y: y,
            width: roomWidth,
            height: roomHeight,
            hasEnemies: settings.hasEnemies,
            maxEnemies: settings.maxEnemies,
            roomType: roomType
        };
    }

    static isRoomValid(room, rooms) {
        for (const otherRoom of rooms) {
            if (
                room.x < otherRoom.x + otherRoom.width &&
                room.x + room.width > otherRoom.x &&
                room.y < otherRoom.y + otherRoom.height &&
                room.y + room.height > otherRoom.y
            ) {
                return false;
            }
        }
        return true;
    }

    static addRoomToGrid(grid, room) {
        for (let row = room.y; row < room.y + room.height; row++) {
            for (let col = room.x; col < room.x + room.width; col++) {
                grid[row][col] = new tileRegistry['floor']();
            }
        }

        for (let row = room.y - 1; row <= room.y + room.height; row++) {
            for (let col = room.x - 1; col <= room.x + room.width; col++) {
                if (
                    row === room.y - 1 || row === room.y + room.height ||
                    col === room.x - 1 || col === room.x + room.width
                ) {
                    grid[row][col] = new tileRegistry['wall']();
                }
            }
        }
    }
}

export { RoomManager };
