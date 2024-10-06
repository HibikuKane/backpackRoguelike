import { tileRegistry } from '../tile/tileRegistry.js';
import { roomSettings } from './roomSettings.js';

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
                    rowArray.push(new tileRegistry['wall']());  // 외곽은 벽으로 설정
                } else {
                    rowArray.push(new tileRegistry['void']());  // 나머지는 공허로 설정
                }
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
            let roomPlaced = false;
            let attempts = 0;
            const maxAttempts = 10;  // 최대 10번의 시도

            while (!roomPlaced && attempts < maxAttempts) {
                attempts++;
                const roomType = ['smallRoom', 'largeRoom', 'emptyRoom'][Math.floor(Math.random() * 3)];
                const room = this.createRoom(this.grid, roomType);

                if (this.isRoomValid(room)) {
                    this.addRoomToGrid(room);  // 유효한 방이면 그리드에 추가
                    this.rooms.push(room);  // 방 목록에 추가
                    roomPlaced = true;  // 방 배치 성공
                }
            }

            if (!roomPlaced) {
                console.warn(`Failed to place room after ${maxAttempts} attempts.`);
            }
        }
    }



    createRoom(map, roomType) {
        const settings = roomSettings[roomType];  // 선택된 방의 설정 불러오기

        // 방의 랜덤 크기 설정
        const roomWidth = Math.floor(Math.random() * (settings.widthRange[1] - settings.widthRange[0])) + settings.widthRange[0];
        const roomHeight = Math.floor(Math.random() * (settings.heightRange[1] - settings.heightRange[0])) + settings.heightRange[0];

        // 방 위치를 무작위로 지정
        const x = Math.floor(Math.random() * (this.cols - roomWidth - 2)) + 1;
        const y = Math.floor(Math.random() * (this.rows - roomHeight - 2)) + 1;

        // 방 설정에 따른 결과 반환 (roomType 저장)
        const room = {
            x: x,
            y: y,
            width: roomWidth,
            height: roomHeight,
            hasEnemies: settings.hasEnemies,
            maxEnemies: settings.maxEnemies,
            roomType: roomType  // roomType을 저장
        };

        return room;
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
        // 방 내부를 일반 타일로 설정
        for (let row = room.y; row < room.y + room.height; row++) {
            for (let col = room.x; col < room.x + room.width; col++) {
                this.grid[row][col] = new tileRegistry['floor']();  // 방 내부는 발판으로 설정
            }
        }

        // 방을 둘러싸는 벽 생성 (방의 경계에만 벽을 생성)
        for (let row = room.y - 1; row <= room.y + room.height; row++) {
            for (let col = room.x - 1; col <= room.x + room.width; col++) {
                if (
                    row === room.y - 1 || row === room.y + room.height ||
                    col === room.x - 1 || col === room.x + room.width
                ) {
                    this.grid[row][col] = new tileRegistry['wall']();  // 방 경계에 벽 설정
                }
            }
        }
    }


    connectRooms() {
        for (let i = 1; i < this.rooms.length; i++) {
            const roomA = this.rooms[i - 1];
            const roomB = this.rooms[i];

            // roomType을 사용하여 roomSettings에서 가져옴
            const settingsA = roomSettings[roomA.roomType];
            const settingsB = roomSettings[roomB.roomType];

            // roomSettings가 존재하지 않으면 오류 처리
            if (!settingsA || !settingsB) {
                console.error('Invalid room settings for:', roomA.roomType, roomB.roomType);
                continue;  // 설정이 없으면 다음으로 넘어감
            }

            // 최소, 최대 출입구 계산
            const entrancesA = Math.max(settingsA.minEntrances, Math.min(settingsA.maxEntrances, roomA.connectedRooms?.length || 0));
            const entrancesB = Math.max(settingsB.minEntrances, Math.min(settingsB.maxEntrances, roomB.connectedRooms?.length || 0));

            // 출입구 수에 맞춰 연결
            for (let j = 0; j < Math.min(entrancesA, entrancesB); j++) {
                const pointA = this.getRandomPointInRoom(roomA);
                const pointB = this.getRandomPointInRoom(roomB);
                this.createCorridor(pointA, pointB);

                roomA.connectedRooms = roomA.connectedRooms || [];
                roomB.connectedRooms = roomB.connectedRooms || [];
                roomA.connectedRooms.push(roomB);
                roomB.connectedRooms.push(roomA);
            }
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
