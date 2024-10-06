import DungeonGenerator from './dungeon/dungeonGenerator.js';
import { Grid } from './core/grid.js';
import { Player } from './core/player.js';
import { Camera } from './core/camera.js';  // 카메라 시스템 추가

function initGame() {
    const root = document.documentElement;

    // CSS 변수 가져오기
    const tileSize = getComputedStyle(root).getPropertyValue('--tile-size').trim();  // 예: '32px'
    const gridColumns = getComputedStyle(root).getPropertyValue('--grid-columns').trim();  // 예: '11'

    const rows = 50;  // 맵 크기 설정
    const cols = 50;
    const roomCount = 16;  // 방 개수

    const dungeon = new DungeonGenerator(rows, cols, roomCount);
    dungeon.generateDungeon();

    const grid = new Grid(rows, cols);
    grid.grid = dungeon.grid;  // 던전의 그리드를 게임 그리드에 적용

    const player = new Player(grid);  // 플레이어 생성
    dungeon.placePlayer(player);  // 플레이어를 방에 배치

    const camera = new Camera(parseInt(gridColumns), parseInt(gridColumns) + 4, grid, player);  // 카메라 뷰포트 크기 동적으로 가져옴
    camera.moveToPlayer();

    // 초기 카메라 렌더링 (CSS 변수 사용)
    camera.renderViewport(document.getElementById('grid'));

    // 디버그 모드 체크박스 이벤트 리스너 추가
    document.getElementById('debugMode').addEventListener('change', (event) => {
        const isDebugMode = event.target.checked;

        if (isDebugMode) {
            // 디버그 모드: 전체 맵을 보여줌
            renderFullMap(grid, player);
        } else {
            // 카메라 모드: 플레이어 주변만 보여줌 (카메라 뷰포트 크기 복원)
            document.getElementById('grid').style.gridTemplateColumns = `repeat(${camera.viewportWidth}, ${tileSize})`;
            camera.moveToPlayer();
            camera.renderViewport(document.getElementById('grid'));
        }
    });

    // 키보드 이벤트 리스너
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

        const isDebugMode = document.getElementById('debugMode').checked;
        if (!isDebugMode) {
            camera.moveToPlayer();  // 플레이어가 이동할 때 카메라도 이동
            camera.renderViewport(document.getElementById('grid'));  // 새로운 위치에 맞춰 렌더링
        }
    });
}

window.onload = () => {
    initGame();
};

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
