import {getBgColor} from './utils/getBgColor.ts';

let gameField: Array<Array<0 | number>> = [];
let score = 0;
let isFinish = false;

const createGameField = () => {
    for (let i = 0; i < 5; i++) {
        gameField[i] = [];
        for (let j = 0; j < 5; j++) {
            gameField[i][j] = 0;
        }
    }
};

function getRandomNumber() {
    let nullCells: Array<Array<number>> = [];

    // Находим все пустые ячейки
    for (let i = 0; i < gameField.length; i++) {
        for (let j = 0; j < gameField.length; j++) {
            if (gameField[i][j] === 0) {
                nullCells.push([i, j]);
            }
        }
    }

    if (nullCells.length === 0) {
        return;
    }

    // Заполняем рандомную из пустых ячеек
    const randomIndex = Math.floor(Math.random() * nullCells.length);
    const [rowIndex, colIndex] = nullCells[randomIndex];
    gameField[rowIndex][colIndex] = Math.random() < 0.9 ? 2 : 4;
}

// После каждого изменения массива gameField вызываем для перерисовки новых данных
const renderData = () => {
    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
            let div = document.getElementById('c' + x + y);
            if (div) {
                if (gameField[x][y] === 0) {
                    div.innerHTML = '';
                    div.className = 'cell';
                    div.style.background = getBgColor(gameField[x][y]);
                } else {
                    div.innerHTML = String(gameField[x][y]);
                    div.classList.add('tile');
                    // Меняем bg ячейки для комфорта/визульного различия
                    div.style.background = getBgColor(gameField[x][y]);
                }
            }
        }
    }

    let pElementResult = document.querySelector('.result p');
    if (pElementResult) pElementResult.innerHTML = score.toString();

    if (isFinish) {
        let div = document.getElementById('gameOver');
        let spanRes = document.getElementById('finishResult');
        if (div && spanRes) {
            spanRes.innerHTML = score.toString();
            div.style.display = 'flex';
        }
    }
};

// Находим идндекс след ячейки в зависимости от напрвлени джвижения
const getNextIndexCell = (direction: 'left' | 'up' | 'down' | 'right', x: number, y: number) => {
    switch (direction) {
        case 'left':
            for (let i = y + 1; i < 5; i++) {
                if (gameField[x][i]) return i;
            }
            return -1;
        case 'right':
            for (let i = y - 1; i >= 0; i--) {
                if (gameField[x][i] !== 0) return i;
            }
            return -1;
        case 'up':
            for (let i = y + 1; i < 5; i++) {
                if (gameField[i][x] !== 0) return i;
            }
            return -1;
        case 'down':
            for (let i = y - 1; i >= 0; i--) {
                if (gameField[i][x] !== 0) return i;
            }
            return -1;
        default :
            return -1;
    }
};
const moveLeft = () => {
    const oldGameField = String(gameField);

    // Сначала проходимся по строкам / внутри них по столбцам (горизонталь)
    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 4; y++) {
            const nextCell = getNextIndexCell('left', x, y);

            if (nextCell !== -1) {
                if (gameField[x][y] === 0) {
                    gameField[x][y] = gameField[x][nextCell];
                    gameField[x][nextCell] = 0;
                    y--;
                } else if (gameField[x][y] === gameField[x][nextCell]) {
                    gameField[x][y] *= 2;
                    gameField[x][nextCell] = 0;
                    score += gameField[x][y];
                }
            } else {
                break;
            }
        }
    }

    const newGameField = String(gameField);

    // Если меняется местоположение или нового значения
    // Если меняется местоположение или нового значения
    if (oldGameField !== newGameField) {
        getRandomNumber();
        checkGameOver();
        renderData();
    }
};

const moveRight = () => {
    const oldGameField = String(gameField);

    // Сначала проходимся по строкам / внутри них по столбцам (горизонталь)
    for (let x = 0; x < 5; x++) {
        for (let y = 4; y > 0; y--) {
            const nextCell = getNextIndexCell('right', x, y);

            if (nextCell !== -1) {
                if (gameField[x][y] === 0) {
                    gameField[x][y] = gameField[x][nextCell];
                    gameField[x][nextCell] = 0;
                    y++;
                } else if (gameField[x][y] === gameField[x][nextCell]) {
                    gameField[x][y] *= 2;
                    gameField[x][nextCell] = 0;
                    score += gameField[x][y];
                }
            } else {
                break;
            }
        }
    }

    const newGameField = String(gameField);

    // Если меняется местоположение или нового значения
    if (oldGameField !== newGameField) {
        getRandomNumber();
        checkGameOver();
        renderData();
    }

};
const moveUp = () => {
    const oldGameField = String(gameField);

    // Сначала проходимся по строкам / внутри них по столбцам (вертикаль)
    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 4; y++) {
            const nextCell = getNextIndexCell('up', x, y);

            if (nextCell !== -1) {
                if (gameField[y][x] === 0) {
                    gameField[y][x] = gameField[nextCell][x];
                    gameField[nextCell][x] = 0;
                    y--;
                } else if (gameField[y][x] === gameField[nextCell][x]) {
                    gameField[y][x] *= 2;
                    gameField[nextCell][x] = 0;
                    score += gameField[y][x];
                }
            } else {
                break;
            }
        }
    }

    const newGameField = String(gameField);

    // Если меняется местоположение или нового значения
    if (oldGameField !== newGameField) {
        getRandomNumber();
        checkGameOver();
        renderData();
    }
};

const moveDown = () => {
    const oldGameField = String(gameField);

    // Сначала проходимся по строкам / внутри них по столбцам (вертикаль)
    for (let x = 0; x < 5; x++) {
        for (let y = 4; y > 0; y--) {
            const nextCell = getNextIndexCell('down', x, y);

            if (nextCell !== -1) {
                if (gameField[y][x] === 0) {
                    gameField[y][x] = gameField[nextCell][x];
                    gameField[nextCell][x] = 0;
                    y++;
                } else if (gameField[y][x] === gameField[nextCell][x]) {
                    gameField[y][x] *= 2;
                    gameField[nextCell][x] = 0;
                    score += gameField[y][x];
                }
            } else {
                break;
            }
        }
    }
    const newGameField = String(gameField);

    // Если меняется местоположение или нового значения
    if (oldGameField !== newGameField) {
        getRandomNumber();
        checkGameOver();
        renderData();
    }
};

//Проверка на окончание игры
// если по горизонтали/вертикали есть совпадеие или нули = еще играем
const checkGameOver = () => {
    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
            if (gameField[x][y] === 0) {
                return;
            }
            // Проверка есть одинаковые в ряду
            if (y < 4) {
                if (gameField[x][y] === gameField[x][y + 1]) {
                    return;
                }
            }
            // Проверка есть одинаковые в столбце
            if (x < 4) {
                if (gameField[x][y] === gameField[x + 1][y]) {
                    return;
                }
            }
        }
    }
    isFinish = true;
    return;
};

const keyPressOnceTracker = () => {
    window.addEventListener('keydown', handleKeydown, {once: true});
};

const handleKeydown = (event: KeyboardEvent) => {
    switch (event.key) {
        case 'ArrowUp' :
            moveUp();
            break;
        case 'ArrowRight' :
            moveRight();
            break;
        case 'ArrowDown' :
            moveDown();
            break;
        case 'ArrowLeft' :
            moveLeft();
            break;
        default:
            keyPressOnceTracker();
            return;
    }
    keyPressOnceTracker();
};

const button = document.querySelector('.btnAgain');
button && button.addEventListener('click', function () {
    let div = document.getElementById('gameOver');
    if (div) {
        start();
        div.style.display = 'none';
    }
});

// ==== START

function start() {
    gameField = [];
    score = 0;
    isFinish = false;
    createGameField();
    getRandomNumber();
    getRandomNumber();
    renderData();
    keyPressOnceTracker();
}

start();



