// main.js

import { Grid } from './grid.js';
import { Player } from './player.js';

// 게임 초기화
function initGame() {
    console.log("Game is initializing...");  // 디버그 로그

    const rows = 10;
    const cols = 10;
    const grid = new Grid(rows, cols);

    // 그리드 DOM에 렌더링
    grid.renderGrid('grid');
    console.log("Grid rendered successfully.");  // 그리드 생성 후 로그

    // 플레이어 초기화
    const player = new Player(0, 0, grid);
    player.updatePlayerPosition();
    console.log("Player initialized and positioned at (0,0).");  // 플레이어 초기화 후 로그

    // 키보드 입력 처리
    document.addEventListener('keydown', (event) => {
        console.log("Key pressed: " + event.key);  // 키 입력 확인용 로그
        switch (event.key) {
            case "ArrowUp":
                player.move("up");
                break;
            case "ArrowDown":
                player.move("down");
                break;
            case "ArrowLeft":
                player.move("left");
                break;
            case "ArrowRight":
                player.move("right");
                break;
        }
        player.updatePlayerPosition();
    });
}

window.onload = () => {
    console.log("Window loaded. Initializing game...");  // 윈도우 로딩 후 로그
    initGame();
};
