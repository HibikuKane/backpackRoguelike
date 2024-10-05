import DungeonGenerator from './dungeon/dungeonGenerator.js';
import { Grid } from './core/grid.js';
import { Player } from './core/player.js';

function initGame() {
    const rows = 20;
    const cols = 20;
    const roomCount = 10;

    const dungeon = new DungeonGenerator(rows, cols, roomCount);
    dungeon.generateDungeon();

    const grid = new Grid(rows, cols);
    grid.grid = dungeon.grid;  // 던전의 그리드를 게임 그리드에 적용

    const player = new Player(1, 1, grid);
    dungeon.placePlayer(player);  // 플레이어를 방에 배치

    grid.renderGrid('grid', player);

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
