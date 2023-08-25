let board = [];
let rows = 20;
let cols = 20;

let wallLocation = [];
let enemiesLocation = [];

let sourceCell = null;
let destinationCell = null;

let selectSD = false;
let createWall = false;
let createEnemy = false;

let playGame = false;
let axeStatus = false;

window.onload = function () {
    mazeGenerator();
}

function reloadGame() {
    window.location.reload();
}

window.addEventListener('keydown', moveSourceCell);

function mazeGenerator() {
    document.getElementById('axe').addEventListener('click', setAxe);
    document.getElementById('playButton').addEventListener('click', setButton);
    boardInit();
    generator();
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement('div');
            cell.id = i.toString() + '-' + j.toString();
            if (wallLocation.includes(cell.id)) {
                cell.classList.add('wall');
                imgTree(cell);
            }
            document.getElementById('board').append(cell);
            row.push(cell);
        }
        board.push(row);
    }
    randomSourceDestination();
    let countEnemy = +document.getElementById('numberP').value;
    for (let i = 0; i < countEnemy; i++) {
        randomEnemies();
    }
    moveEnemies();
}

function addition() {
    let numberPokemon = +document.getElementById('numberP').value;
    if (!playGame) {
        if (numberPokemon < 10) {
            randomEnemies();
            numberPokemon++
        }
        document.getElementById('numberP').value = numberPokemon;
    }
}

function subtraction() {
    let numberPokemon = +document.getElementById('numberP').value;
    if (!playGame) {
        if (numberPokemon > 0) {
            numberPokemon--;
            deleteEnemies();
        }
        document.getElementById('numberP').value = numberPokemon;
    }
}


let speed = +document.getElementById('speed').value;
let intervalId = setInterval(moveEnemies, speed);
document.getElementById('speed').addEventListener('change', updateSpeed);

function updateSpeed() {
    speed = +document.getElementById('speed').value;
    clearInterval(intervalId);
    intervalId = setInterval(moveEnemies, speed);
}

function setButton() {
    if (playGame) {
        startTimer();
        playGame = false;
        document.getElementById('playButton').innerHTML = `<img src="Elements/playButton2.png" width="150">`
    } else {
        createWall = false;
        selectSD = false;
        createEnemy = false;
        startTimer();
        playGame = true;
        document.getElementById('playButton').innerHTML = `<img src="Elements/playbutton.png" width="150">`
    }
}

function setAxe() {
    if (playGame) {
        if (axeStatus) {
            axeStatus = false;
            document.getElementById('axe').style.backgroundColor = 'transparent';
        } else {
            axeStatus = true;
            document.getElementById('axe').style.backgroundColor = '#0be30b';
        }
    }
}



// Time Format

let startTime = null;
let elapsedTime = 0;
let timerInterval;
let isTimeRemaining = false;

function formatTime(seconds) {
    const MINUTE = Math.floor((seconds % 3600) / 60);
    const REMAININGSECOND = Math.floor(seconds % 60);

    const FORMATTIME = `${padZero(MINUTE)}:${padZero(REMAININGSECOND)}`;
    return FORMATTIME;
}

function padZero(number) {
    return (number < 10) ? `0${number}` : number;
}

function updateTimer() {
    elapsedTime++;
    document.getElementById('time').innerHTML = formatTime(elapsedTime);
}

function startTimer() {
    if (!isTimeRemaining) {
        startTime = new Date().getTime();
        timerInterval = setInterval(updateTimer, 1000);
        isTimeRemaining = true;
    } else {
        clearInterval(timerInterval);
        isTimeRemaining = false;
    }
}

document.getElementById('delete').addEventListener('click', function () {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let cell = board[i][j];
            wallLocation.splice(wallLocation.indexOf(cell.id), 1);
            enemiesLocation.splice(enemiesLocation.indexOf(cell.id), 1);
            while (cell.firstChild) {
                cell.removeChild(cell.firstChild);
            }
            cell.classList.remove('source');
            cell.classList.remove('destination');
            cell.classList.remove('wall');
            cell.classList.remove('enemy');
            sourceCell = null;
            destinationCell = null;
        }
    }
})
document.getElementById('selectSD').addEventListener('click', function () {
    selectSD = true;
    createWall = false;
    createEnemy = false;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let cell = board[i][j];
            cell.addEventListener('click', clickCell);
        }
    }
})
document.getElementById('createWall').addEventListener('click', function () {
    selectSD = false;
    createWall = true;
    createEnemy = false;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let cell = board[i][j];
            cell.addEventListener('click', clickCell);
        }
    }
})
document.getElementById('createEnemy').addEventListener('click', function () {
    selectSD = false;
    createWall = false;
    createEnemy = true;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let cell = board[i][j];
            cell.addEventListener('click', clickCell);
        }
    }
})
document.getElementById('reload').addEventListener('click', function () {
    reloadGame();
})

