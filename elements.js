function distance(a1, b1, a2, b2) {
    return Math.sqrt(Math.pow((a1 - a2), 2) + Math.pow((b1 - b2), 2));
}

function distance2(a1, a2) {

    return Math.abs(a1 - a2);
}

function randomSourceDestination() {
    let randomRowIndexS, randomColIndexS, randomRowIndexD, randomColIndexD;
    do {
        randomRowIndexS = Math.floor(Math.random() * rows);
        randomColIndexS = Math.floor(Math.random() * cols);
    } while (wallLocation.includes(randomRowIndexS.toString() + '-' + randomColIndexS.toString()));
    sourceCell = board[randomRowIndexS][randomColIndexS];
    sourceCell.classList.add('source');
    imgSource(sourceCell);
    do {
        do {
            randomRowIndexD = Math.floor(Math.random() * rows);
            randomColIndexD = Math.floor(Math.random() * cols);
        } while (wallLocation.includes(randomRowIndexD.toString() + '-' + randomColIndexD.toString()));
        destinationCell = board[randomRowIndexD][randomColIndexD];
    } while (sourceCell === destinationCell || distance2(randomRowIndexS, randomRowIndexD) < 10 || distance2(randomColIndexS, randomColIndexD) < 10);
    destinationCell.classList.add('destination');
    imgDestination(destinationCell);
}


function randomEnemies() {
    let randomRowIndex, randomColIndex, enemy, id, isClosed;
    let rowDestination = parseInt(destinationCell.id.split('-')[0]);
    let colDestination = parseInt(destinationCell.id.split('-')[1]);
    do {
        randomRowIndex = Math.floor(Math.random() * rows);
        randomColIndex = Math.floor(Math.random() * cols);
        id = randomRowIndex.toString() + '-' + randomColIndex.toString();

        isClosed = false;
        for (let i = 0; i < enemiesLocation.length; i++) {
            let rowEnemy = parseInt(enemiesLocation[i].split('-')[0]);
            let colEnemy = parseInt(enemiesLocation[i].split('-')[1]);
            if (distance(rowEnemy, colEnemy, randomRowIndex, randomColIndex) < 3) {
                isClosed = true;
                break;
            }
        }
    } while (isClosed || enemiesLocation.includes(id) || wallLocation.includes(id) || sourceCell.id === id || destinationCell === id ||
    distance(randomRowIndex, randomColIndex, rowDestination, colDestination) > 12 ||
    distance(randomRowIndex, randomColIndex, rowDestination, colDestination) < 2);
    enemy = board[randomRowIndex][randomColIndex];
    enemy.classList.add('enemy');
    enemiesLocation.push(id);
    imgGengar(enemy);
}

function deleteEnemies() {
    let randomIndex = Math.floor(Math.random() * enemiesLocation.length);
    let cell = document.getElementById(enemiesLocation[randomIndex]);
    enemiesLocation.splice(randomIndex, 1);
    cell.classList.remove('enemy');
    while (cell.firstChild) {
        cell.removeChild(cell.firstChild);
    }
}


// let directionRight = [];
//
// function moveEachEnemyCol(enemyIndex) {
//
//     let id = enemiesLocation[enemyIndex];
//     let rowEnemy = parseInt(id.split('-')[0]);
//     let colEnemy = parseInt(id.split('-')[1]);
//     let enemy = document.getElementById(id);
//
//     let newId = null;
//
//
//     if (directionRight[enemyIndex]) {
//         newId = rowEnemy.toString() + '-' + (colEnemy + 1).toString();
//     } else {
//         newId = rowEnemy.toString() + '-' + (colEnemy - 1).toString();
//     }
//     if (
//         ((directionRight[enemyIndex] && (colEnemy + 1 < cols) && !wallLocation.includes(newId) && !enemiesLocation.includes(newId)) ||
//             (!directionRight[enemyIndex] && (colEnemy - 1 >= 0) && !wallLocation.includes(newId) && !enemiesLocation.includes(newId))) && (destinationCell.id !== newId) &&
//         distance(rowEnemy, parseInt(newId.split('-')[0]), parseInt(destinationCell.id.split('-')[0]), parseInt(destinationCell.id.split('-')[1])) < 10
//     ) {
//         let newEnemy = document.getElementById(newId);
//         enemiesLocation[enemyIndex] = newId;
//
//         while (enemy.firstChild) {
//             enemy.removeChild(enemy.firstChild);
//         }
//         newEnemy.classList.add('enemy');
//         imgGengar(newEnemy);
//         enemy.classList.remove('enemy');
//         enemy = newEnemy;
//     } else {
//         directionRight[enemyIndex] = !directionRight[enemyIndex];
//     }
//     if (sourceCell.id === newId) {
//         alert('You lose');
//         playGame = false;
//         clearInterval(timerInterval);
//         window.addEventListener('click', reloadGame);
//         document.getElementById('count').innerHTML = count;
//     }
// }
//
// let directionUp = [];
//
// function moveEachEnemyRow(enemyIndex) {
//     let id = enemiesLocation[enemyIndex];
//     let rowEnemy = parseInt(id.split('-')[0]);
//     let colEnemy = parseInt(id.split('-')[1]);
//     let enemy = document.getElementById(id);
//
//     let newId = null;
//     if (directionUp[enemyIndex]) {
//         newId = (rowEnemy - 1).toString() + '-' + (colEnemy).toString();
//     } else {
//         newId = (rowEnemy + 1).toString() + '-' + (colEnemy).toString();
//     }
//     if (
//         ((directionUp[enemyIndex] && (rowEnemy - 1 >= 0) && !wallLocation.includes(newId) && !enemiesLocation.includes(newId)) ||
//             (!directionUp[enemyIndex] && (rowEnemy + 1 < rows) && !wallLocation.includes(newId) && !enemiesLocation.includes(newId))) && (destinationCell.id !== newId) &&
//         distance(parseInt(newId.split('-')[0]), colEnemy, parseInt(destinationCell.id.split('-')[0]), parseInt(destinationCell.id.split('-')[1])) < 12
//     ) {
//         let newEnemy = document.getElementById(newId);
//         enemiesLocation[enemyIndex] = newId;
//
//         while (enemy.firstChild) {
//             enemy.removeChild(enemy.firstChild);
//         }
//         newEnemy.classList.add('enemy');
//         imgGengar(newEnemy);
//         enemy.classList.remove('enemy');
//         enemy = newEnemy;
//     } else {
//         directionUp[enemyIndex] = !directionUp[enemyIndex];
//     }
//     if (sourceCell.id === newId) {
//         alert('You lose');
//         playGame = false;
//         clearInterval(timerInterval);
//         window.addEventListener('click', reloadGame);
//         document.getElementById('count').innerHTML = count;
//     }
// }
//
//
// function moveEnemies() {
//     if (playGame) {
//         for (let i = 0; i < enemiesLocation.length; i++) {
//             if (Math.random() < 0.5) {
//             moveEachEnemyRow(i);
//             } else {
//                 moveEachEnemyCol(i);
//             }
//
//         }
//     }
// }
const directions = ['up', 'down', 'left', 'right', 'upright', 'upleft', 'downright', 'downleft'];

function moveEachEnemy(enemyIndex) {
    let id = enemiesLocation[enemyIndex];
    let rowEnemy = parseInt(id.split('-')[0]);
    let colEnemy = parseInt(id.split('-')[1]);
    let enemy = document.getElementById(id);

    const randomDirection = directions[Math.floor(Math.random() * directions.length)];

    let newRowEnemy = rowEnemy;
    let newColEnemy = colEnemy;


    if (randomDirection === 'up') {
        newRowEnemy -= 1;
    } else if (randomDirection === 'down') {
        newRowEnemy += 1;
    } else if (randomDirection === 'left') {
        newColEnemy -= 1;
    } else if (randomDirection === 'right') {
        newColEnemy += 1;
    } else if (randomDirection === 'upright') {
        newRowEnemy -= 1;
        newColEnemy += 1;
    } else if (randomDirection === 'upleft') {
        newRowEnemy -= 1;
        newColEnemy -= 1;
    } else if (randomDirection === 'downleft') {
        newRowEnemy += 1;
        newColEnemy -= 1;
    } else if (randomDirection === 'downright') {
        newRowEnemy += 1;
        newColEnemy += 1;
    }
    console.log(randomDirection);
    const newId = newRowEnemy.toString() + '-' + newColEnemy.toString();

    if (!wallLocation.includes(newId) && !enemiesLocation.includes(newId) && (destinationCell.id !== newId) &&
        newRowEnemy < rows && newRowEnemy >= 0 && newColEnemy < cols && newColEnemy >= 0 &&
        distance(newRowEnemy, newColEnemy, parseInt(destinationCell.id.split('-')[0]), parseInt(destinationCell.id.split('-')[1])) < 15 &&
        distance(newRowEnemy, newColEnemy, parseInt(destinationCell.id.split('-')[0]), parseInt(destinationCell.id.split('-')[1])) > 2
    ) {
        let newEnemy = document.getElementById(newId);
        enemiesLocation[enemyIndex] = newId;

        while (enemy.firstChild) {
            enemy.removeChild(enemy.firstChild);
        }
        newEnemy.classList.add('enemy');
        imgGengar(newEnemy);
        enemy.classList.remove('enemy');
        enemy = newEnemy;
    }

    if (sourceCell.id === newId) {
        alert('You lose');
        playGame = false;
        clearInterval(timerInterval);
        window.addEventListener('click', reloadGame);
        document.getElementById('count').innerHTML = count;
    }
}

function moveEnemies() {
    if (playGame) {
        for (let i = 0; i < enemiesLocation.length; i++) {
            moveEachEnemy(i);
        }
    }
}

let count = 0;
let axeRemain = 3;

function moveSourceCell(event) {
    if (playGame) {
        if (sourceCell && destinationCell) {
            let newCell = null;
            if (event.key === 'ArrowUp') {
                newCell = document.getElementById((parseInt(sourceCell.id.split('-')[0]) - 1) + '-' + sourceCell.id.split('-')[1]);
            } else if (event.key === 'ArrowDown') {
                newCell = document.getElementById((parseInt(sourceCell.id.split('-')[0]) + 1) + '-' + sourceCell.id.split('-')[1]);
            } else if (event.key === 'ArrowLeft') {
                newCell = document.getElementById(sourceCell.id.split('-')[0] + '-' + (parseInt(sourceCell.id.split('-')[1]) - 1));
            } else if (event.key === 'ArrowRight') {
                newCell = document.getElementById(sourceCell.id.split('-')[0] + '-' + (parseInt(sourceCell.id.split('-')[1]) + 1));
            }
            if (newCell && !wallLocation.includes(newCell.id)) {
                if (newCell.id === destinationCell.id) {
                    alert('Chúc mừng bạn!!!');
                    clearInterval(timerInterval);
                    window.addEventListener('click', reloadGame);
                    playGame = false;
                    document.getElementById('count').innerHTML = count;
                } else if (enemiesLocation.includes(newCell.id)) {
                    alert('You lose');
                    clearInterval(timerInterval);
                    window.addEventListener('click', reloadGame);
                    playGame = false;
                    document.getElementById('count').innerHTML = count;
                } else {
                    while (sourceCell.firstChild) {
                        sourceCell.removeChild(sourceCell.firstChild);
                    }
                    newCell.classList.add('source');
                    imgSource(newCell);
                    sourceCell.classList.remove('source');
                    sourceCell = newCell;
                    count++;
                    document.getElementById('count').innerHTML = count;
                }
            } else if (newCell && axeStatus && wallLocation.includes(newCell.id) && axeRemain > 0 && !enemiesLocation.includes(newCell.id)) {
                wallLocation.splice(wallLocation.indexOf(newCell.id), 1);
                newCell.classList.remove('wall');
                while (newCell.firstChild) {
                    newCell.removeChild(newCell.firstChild);
                }
                while (sourceCell.firstChild) {
                    sourceCell.removeChild(sourceCell.firstChild);
                }
                newCell.classList.add('source');
                imgSource(newCell);
                sourceCell.classList.remove('source');
                sourceCell = newCell;
                axeRemain--;
                document.getElementById('axeRemain').innerHTML = axeRemain;
                count++;
                document.getElementById('count').innerHTML = count;
                if (axeRemain === 0) {
                    document.getElementById('axe').style.backgroundColor = 'transparent';
                }
            }
        }
    }
}


function imgSource(cell) {
    let img = document.createElement('img');
    img.src = 'Elements/source.png';
    img.style.width = '28px';
    img.style.height = '28px';
    cell.appendChild(img);
}

function imgDestination(cell) {
    let img = document.createElement('img');
    img.src = 'Elements/destination.png';
    img.style.width = '28px';
    img.style.height = '28px';
    cell.appendChild(img);
}

function imgTree(cell) {
    let img = document.createElement('img');
    img.src = 'Elements/tree.png';
    img.style.width = '28px';
    img.style.height = '28px';
    cell.appendChild(img);
}

function imgGengar(cell) {
    let img = document.createElement('img');
    img.src = 'Elements/gengar.png';
    img.style.width = '28px';
    img.style.height = '28px';
    cell.appendChild(img);
}

function clickCell() {
    let cell = this;
    if (!wallLocation.includes(cell.id) && !enemiesLocation.includes(cell.id)) {
        if (selectSD) {
            if (sourceCell) {
                if (destinationCell) {
                    while (sourceCell.firstChild) {
                        sourceCell.removeChild(sourceCell.firstChild);
                    }
                    while (destinationCell.firstChild) {
                        destinationCell.removeChild(destinationCell.firstChild);
                    }
                    sourceCell.classList.remove('source');
                    destinationCell.classList.remove('destination');
                    sourceCell = null;
                    destinationCell = null;
                    cell.classList.add('source');
                    sourceCell = cell;
                    imgSource(cell);
                } else {
                    if (cell === sourceCell) {
                        alert('Điểm xuất phát trùng với điểm đích!!!');
                    } else {

                        cell.classList.add('destination');
                        destinationCell = cell;
                        imgDestination(cell);
                    }
                }
            } else {
                cell.classList.add('source');
                sourceCell = cell;
                imgSource(cell);
            }
        } else if (createWall && cell.id !== destinationCell.id && cell.id !== sourceCell.id ) {
                wallLocation.push(cell.id);
                cell.classList.add('wall');
                imgTree(cell);
        } else if (createEnemy && cell.id !== destinationCell.id && cell.id !== sourceCell.id) {
            enemiesLocation.push(cell.id);
            cell.classList.add('enemy');
            imgGengar(cell);
        }
    }
}
