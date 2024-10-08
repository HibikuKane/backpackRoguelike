import { RoomManager } from './roomManager.js';
import { CorridorManager } from './corridorManager.js';
import { tileRegistry } from '../tile/tileRegistry.js';

class DungeonGenerator {
    constructor(rows, cols, roomCount) {
        this.rows = rows;
        this.cols = cols;
        this.roomCount = roomCount;
        this.grid = this.createEmptyGrid();
        this.rooms = [];
    }

    createEmptyGrid() {
        const grid = [];
        for (let row = 0; row < this.rows; row++) {
            let rowArray = [];
            for (let col = 0; col < this.cols; col++) {
                if (row === 0 || row === this.rows - 1 || col === 0 || col === this.cols - 1) {
                    rowArray.push(new tileRegistry['wall']());
                } else {
                    rowArray.push(new tileRegistry['void']());
                }
            }
            grid.push(rowArray);
        }
        return grid;
    }

    generateDungeon() {
        this.generateRooms();
        CorridorManager.connectRooms(this.grid, this.rooms);  // 복도 연결
    }

    generateRooms() {
        for (let i = 0; i < this.roomCount; i++) {
            let roomPlaced = false;
            let attempts = 0;
            const maxAttempts = 10;

            while (!roomPlaced && attempts < maxAttempts) {
                attempts++;
                const roomType = ['smallRoom', 'largeRoom', 'emptyRoom'][Math.floor(Math.random() * 3)];
                const room = RoomManager.createRoom(this.grid, this.cols, this.rows, roomType);

                if (RoomManager.isRoomValid(room, this.rooms)) {
                    RoomManager.addRoomToGrid(this.grid, room);
                    this.rooms.push(room);
                    roomPlaced = true;
                }
            }

            if (!roomPlaced) {
                console.warn(`Failed to place room after ${maxAttempts} attempts.`);
            }
        }
    }

    placePlayer(player) {
        const randomRoom = this.rooms[Math.floor(Math.random() * this.rooms.length)];
        const startX = Math.floor(Math.random() * randomRoom.width) + randomRoom.x;
        const startY = Math.floor(Math.random() * randomRoom.height) + randomRoom.y;
        player.setPosition(startX, startY);
    }
}

export default DungeonGenerator;
