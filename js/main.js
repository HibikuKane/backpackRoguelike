import { Grid } from './core/grid.js';
import { Player } from './core/player.js';

function initGame() {
    const rows = 10;
    const cols = 10;
    const grid = new Grid(rows, cols);

    // 그리드 DOM에 렌더링
    const player = new Player(0, 0, grid);
    grid.renderGrid('grid', player);

    // 키보드 입력 처리
    document.addEventListener('keydown', (event) => {
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
    });
}

window.onload = () => {
    initGame();
};
