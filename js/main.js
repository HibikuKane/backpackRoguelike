import DungeonGenerator from './dungeon/dungeonGenerator.js';
import { Grid } from './core/grid.js';
import { Player } from './core/player.js';
import { Camera } from './core/camera.js';
import { TurnManager } from './core/turnManager.js';
import { MovementManager } from './pathfinding/movementManager.js';
import { Pathfinding } from './pathfinding/pathfinding.js';


let tileSize, gridColumns, player, grid, camera, turnManager;

function initGame() {
    const root = document.documentElement;
    tileSize = getComputedStyle(root).getPropertyValue('--tile-size').trim();
    gridColumns = getComputedStyle(root).getPropertyValue('--grid-columns').trim();

    const rows = 50;
    const cols = 50;
    const roomCount = 8;

    const dungeon = new DungeonGenerator(rows, cols, roomCount);
    dungeon.generateDungeon();

    grid = new Grid(rows, cols);
    grid.grid = dungeon.grid;

    turnManager = new TurnManager();  // TurnManager 초기화
    player = new Player(grid, turnManager);  // TurnManager 전달
    dungeon.placePlayer(player);

    camera = new Camera(parseInt(gridColumns), parseInt(gridColumns) + 4, grid, player);
    camera.moveToPlayer();
    camera.renderViewport(document.getElementById('grid'));

    // 엔티티 등록
    turnManager.addEntity(player);

}

window.onload = () => {
    initGame();
};

// 터치/클릭 이벤트 리스너 추가
document.addEventListener('touchstart', handleInput, false);
document.addEventListener('click', handleInput, false);

function handleInput(event) {
    let x, y;

    if (event.type === 'touchstart') {
        const touch = event.touches[0];
        x = Math.floor(touch.clientX / parseInt(tileSize));
        y = Math.floor(touch.clientY / parseInt(tileSize));
    } else if (event.type === 'click') {
        x = Math.floor(event.clientX / parseInt(tileSize));
        y = Math.floor(event.clientY / parseInt(tileSize));
    }

    // 여기서 카메라 뷰포트 상에서의 좌표를 맵 좌표로 변환
    const targetX = camera.x + x;  // 카메라의 현재 X 좌표에 클릭한 X 좌표 더함
    const targetY = camera.y + y;  // 카메라의 현재 Y 좌표에 클릭한 Y 좌표 더함

    // 카메라 범위 안에 있는지 확인
    if (!camera.isInsideCamera(targetX, targetY)) {
        console.log("Clicked outside camera view.");
        return;
    }

    // 경로 탐색 및 이동 처리
    const path = Pathfinding.findPath(grid, { x: player.x, y: player.y }, { x: targetX, y: targetY });
    if (path.length > 0) {
        MovementManager.moveTo(grid, player, targetX, targetY, camera);
    } else {
        console.log('Path not found.');
    }
}

// 전체 맵을 보여주는 함수
function renderFullMap(grid, player) {
    const root = document.documentElement;
    const tileSize = getComputedStyle(root).getPropertyValue('--tile-size').trim();  // 예: '32px'

    const gridElement = document.getElementById('grid');
    gridElement.innerHTML = "";  // 기존 내용 지우기

    // 전체 맵 크기에 맞춰 CSS 속성 조정
    gridElement.style.gridTemplateColumns = `repeat(${grid.cols}, ${tileSize})`;  // 전체 맵을 보여주도록 설정

    for (let row = 0; row < grid.rows; row++) {
        for (let col = 0; col < grid.cols; col++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");

            const tileType = grid.grid[row][col].type;
            tile.style.backgroundColor = grid.grid[row][col].getColor();

            // 플레이어 위치 표시
            if (player.x === col && player.y === row) {
                tile.style.backgroundColor = "blue";  // 플레이어는 파란색으로 표시
            }

            gridElement.appendChild(tile);
        }
    }
}
