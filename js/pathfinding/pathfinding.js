class Pathfinding {
    static findPath(grid, start, destination) {
        const startNode = {
            ...start,
            g: 0,
            f: Pathfinding.heuristic(start, destination)
        };

        let openSet = [startNode];
        let closedSet = new Set();
        let cameFrom = {};

        while (openSet.length > 0) {
            let current = Pathfinding.getLowestCostNode(openSet, destination);

            if (current.x === destination.x && current.y === destination.y) {
                return Pathfinding.reconstructPath(cameFrom, current);
            }

            openSet = openSet.filter(node => node !== current);
            closedSet.add(`${current.x},${current.y}`);

            let neighbors = Pathfinding.getNeighbors(current, grid);

            for (let neighbor of neighbors) {
                const neighborKey = `${neighbor.x},${neighbor.y}`;
                if (closedSet.has(neighborKey)) continue;

                if (!neighbor.g) neighbor.g = Infinity;
                if (!neighbor.f) neighbor.f = Infinity;

                let tentativeCost = current.g + 1;

                if (!openSet.some(node => node.x === neighbor.x && node.y === neighbor.y)) {
                    openSet.push(neighbor);
                } else if (tentativeCost >= neighbor.g) {
                    continue;
                }

                cameFrom[neighborKey] = current;
                neighbor.g = tentativeCost;
                neighbor.f = neighbor.g + Pathfinding.heuristic(neighbor, destination);
            }
        }

        console.log('No path found.');
        return [];
    }

    static getLowestCostNode(openSet, destination) {
        return openSet.reduce((lowest, node) => {
            if (lowest === null || node.f < lowest.f) {
                return node;
            }
            return lowest;
        }, null);
    }

    static reconstructPath(cameFrom, current) {
        let path = [current];
        while (cameFrom[`${current.x},${current.y}`]) {
            current = cameFrom[`${current.x},${current.y}`];
            path.unshift(current);
        }
        return path;
    }

    static getNeighbors(node, grid) {
        const neighbors = [];
        const { x, y } = node;

        // 이동 가능한 'floor' 타일만 추가
        if (grid.isValidPosition(x, y - 1) && grid.getTile(x, y - 1).isWalkable()) neighbors.push({ x, y: y - 1 }); // 위쪽
        if (grid.isValidPosition(x, y + 1) && grid.getTile(x, y + 1).isWalkable()) neighbors.push({ x, y: y + 1 }); // 아래쪽
        if (grid.isValidPosition(x - 1, y) && grid.getTile(x - 1, y).isWalkable()) neighbors.push({ x: x - 1, y }); // 왼쪽
        if (grid.isValidPosition(x + 1, y) && grid.getTile(x + 1, y).isWalkable()) neighbors.push({ x: x + 1, y }); // 오른쪽

        return neighbors;
    }


    static heuristic(node, destination) {
        return Math.abs(node.x - destination.x) + Math.abs(node.y - destination.y);
    }
}

export { Pathfinding };
