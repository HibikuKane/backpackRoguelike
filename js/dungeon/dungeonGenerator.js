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
                rowArray.push(new tileRegistry['wall']());  // 벽으로 초기화
            }
            grid.push(rowArray);
        }
        return grid;
    }

    generateDungeon() {
        this.generateRooms();
        this.connectRooms();
    }

    generateRooms() {
        for (let i = 0; i < this.roomCount; i++) {
            const room = this.createRoom();
            if (this.isRoomValid(room)) {
                this.addRoomToGrid(room);
                this.rooms.push(room);
            }
        }
    }

    createRoom() {
        const roomWidth = Math.floor(Math.random() * 6) + 3;
        const roomHeight = Math.floor(Math.random() * 6) + 3;
        const x = Math.floor(Math.random() * (this.cols - roomWidth - 1)) + 1;
        const y = Math.floor(Math.random() * (this.rows - roomHeight - 1)) + 1;
        return { x, y, width: roomWidth, height: roomHeight };
    }

    isRoomValid(room) {
        for (const otherRoom of this.rooms) {
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

    addRoomToGrid(room) {
        for (let row = room.y; row < room.y + room.height; row++) {
            for (let col = room.x; col < room.x + room.width; col++) {
                this.grid[row][col] = new tileRegistry['floor']();  // 방 안은 발판으로 설정
            }
        }
    }

    connectRooms() {
        for (let i = 1; i < this.rooms.length; i++) {
            const roomA = this.rooms[i - 1];
            const roomB = this.rooms[i];

            const pointA = this.getRandomPointInRoom(roomA);
            const pointB = this.getRandomPointInRoom(roomB);

            this.createCorridor(pointA, pointB);
        }
    }

    getRandomPointInRoom(room) {
        const x = Math.floor(Math.random() * room.width) + room.x;
        const y = Math.floor(Math.random() * room.height) + room.y;
        return { x, y };
    }

    createCorridor(pointA, pointB) {
        let { x: x1, y: y1 } = pointA;
        let { x: x2, y: y2 } = pointB;

        while (x1 !== x2) {
            this.grid[y1][x1] = new tileRegistry['floor']();
            x1 += x1 < x2 ? 1 : -1;
        }
        while (y1 !== y2) {
            this.grid[y1][x1] = new tileRegistry['floor']();
            y1 += y1 < y2 ? 1 : -1;
        }
    }

    // 방 중 하나에 플레이어를 배치
    placePlayer(player) {
        const randomRoom = this.rooms[Math.floor(Math.random() * this.rooms.length)];
        const startX = Math.floor(Math.random() * randomRoom.width) + randomRoom.x;
        const startY = Math.floor(Math.random() * randomRoom.height) + randomRoom.y;
        player.setPosition(startX, startY);  // 방의 랜덤한 위치에 플레이어 배치
    }
}

export default DungeonGenerator;
