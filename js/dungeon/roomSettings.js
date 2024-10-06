// 방 설정을 정의하는 파일
export const roomSettings = {
    smallRoom: {
        widthRange: [6, 10],
        heightRange: [6, 10],
        hasEnemies: true,
        maxEnemies: 3,
        description: "A small room with a few enemies.",
        minEntrances: 2,  // 최소 두 개의 출입구 필요
        maxEntrances: 3   // 최대 3개의 출입구 허용
    },
    largeRoom: {
        widthRange: [11, 15],
        heightRange: [11, 15],
        hasEnemies: true,
        maxEnemies: 6,
        description: "A large room with more enemies.",
        minEntrances: 2,  // 최소 두 개의 출입구 필요
        maxEntrances: 4   // 최대 4개의 출입구 허용
    },
    emptyRoom: {
        widthRange: [4, 8],
        heightRange: [4, 8],
        hasEnemies: false,
        description: "An empty room, perfect for exploring.",
        minEntrances: 1,  // 하나의 출입구만 허용
        maxEntrances: 1   // 최대 하나
    }
};