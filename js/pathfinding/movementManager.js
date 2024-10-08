import { Pathfinding } from './pathfinding.js';

class MovementManager {
    static moveTo(grid, entity, targetX, targetY, camera) {
        const start = { x: entity.x, y: entity.y };
        const destination = { x: targetX, y: targetY };
        const path = Pathfinding.findPath(grid, start, destination);

        if (path.length > 0) {
            MovementManager.followPath(entity, path, camera);
        }
    }

    static followPath(entity, path, camera) {
        let index = 0;

        function moveStep() {
            console.log(`Path length: ${path.length}, Current index: ${index}`); // 디버그용 로그

            if (index < path.length) {
                console.log(`Moving to (${path[index].x}, ${path[index].y})`);  // 중간 경로 로그
                entity.setPosition(path[index].x, path[index].y);
                camera.moveToPlayer();
                camera.renderViewport(document.getElementById('grid'));
                index++;

                setTimeout(moveStep, 100);  // 다음 이동 0.2초 지연
            } else {
                console.log('Movement finished.');
            }
        }




        moveStep();
    }

}

export { MovementManager };
