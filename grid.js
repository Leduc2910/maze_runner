
function boardInit() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let id = i.toString() + '-' + j.toString();
            wallLocation.push(id);
        }
    }
}

function isInsideGrid(id) {
    let i = parseInt(id.split('-')[0]);
    let j = parseInt(id.split('-')[1]);
    if (i < 0 || i >= rows || j < 0 || j >= cols) {
        return false;
    }
    return true;
}

function check(root, cell) {
    let i_root = parseInt(root.split('-')[0]);
    let j_root = parseInt(root.split('-')[1]);
    let i_cell = parseInt(cell.split('-')[0]);
    let j_cell = parseInt(cell.split('-')[1]);
    let first = wallLocation.includes(cell)
    let second = wallLocation.includes((i_root + i_cell) / 2 + '-' + (j_root + j_cell) / 2);
    return (first && second);
}

function destroyWall(root, cell) {
    let i_root = parseInt(root.split('-')[0]);
    let j_root = parseInt(root.split('-')[1]);
    let i_cell = parseInt(cell.split('-')[0]);
    let j_cell = parseInt(cell.split('-')[1]);
    let index_cell = wallLocation.indexOf(cell);
    let index_middle = wallLocation.indexOf((i_root + i_cell) / 2 + '-' + (j_root + j_cell) / 2);
    wallLocation.splice(index_cell, 1);
    wallLocation.splice(index_middle, 1);
}

function drill(probability) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (wallLocation.includes(i.toString() + '-' + j.toString())) {
                let random = Math.floor(Math.random() * 100 / (100 - probability));
                if (random > 1) {
                    let index = wallLocation.indexOf(i.toString() + '-' + j.toString());
                    wallLocation.splice(index, 1);
                }
            }
        }
    }
}

function generator() {
    let randomIndexSource = Math.floor(Math.random() * 3);
    let stack = [];

    stack.push(0 + '-' + randomIndexSource.toString());
    while (stack.length > 0) {
        let id = stack.pop();
        let candidate = [
            (id.split('-')[0] + '-' + (parseInt(id.split('-')[1]) - 2)),
            ((parseInt(id.split('-')[0]) - 2) + '-' + id.split('-')[1]),
            ((parseInt(id.split('-')[0]) + 2) + '-' + id.split('-')[1]),
            (id.split('-')[0] + '-' + (parseInt(id.split('-')[1]) + 2))
        ]

        let neighbors = [];
        for (let i = 0; i < candidate.length; i++) {
            if (isInsideGrid(id) && check(id, candidate[i])) {
                neighbors.push(candidate[i]);
            }
        }
        while (neighbors.length > 0) {
            let randomIndex = Math.floor(Math.random() * neighbors.length);
            let neighbor = neighbors.splice(randomIndex, 1)[0];
            let probability = Math.floor(Math.random() * 100 / 2);
            if (probability > 1) {
                destroyWall(id, neighbor);
                stack.push(neighbor);
            }
        }
    }
    drill(75);
}