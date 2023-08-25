import {
    getBgColor,
} from './utils/getBgColor.ts';
import {
    resetTimer,
    startTimer,
} from './utils/timer.ts';
import {
    readFromLocalStorage,
    saveToLocalStorage,
} from './utils/localStorage.ts';
import {getRecords, setRecords} from './api/api.ts';
import {checkFirstStart, showGameOverModal} from './utils/modalsHandler.ts';

let gameField: Array<Array<0 | number>> = [];
let score = 0;
let isFinish = false;
let winNum = 2018;
let isWin = false;
let currentValue = 0;

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
const renderData = async () => {
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

                    // Изменяет размер текст по мере увеление значение числа в ячейке
                    if (gameField[x][y] > 0) {
                        div.style.fontSize = '12vmin';
                    }
                    if (gameField[x][y] >= 8) {
                        div.style.fontSize = '10vmin';
                    }
                    if (gameField[x][y] >= 64) {
                        div.style.fontSize = '8vmin';
                    }
                    if (gameField[x][y] >= 128) {
                        div.style.fontSize = '7vmin';
                    }
                    if (gameField[x][y] >= 512) {
                        div.style.fontSize = '6vmin';
                    }
                    if (gameField[x][y] > 1000) {
                        div.style.fontSize = '5vmin';
                    }
                }
            }
        }
    }

    let pElementResult = document.querySelector('.result p');
    if (pElementResult) pElementResult.innerHTML = score.toString();

    // Если есть ячейка 2048 то модалка победы
    if (isWin) {
        saveToLocalStorage('best', currentValue);
        await setRecords();
    }
    // Если конец то модалка проигр
    if (isFinish) {
        showGameOverModal(currentValue, score);
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
        default:
            return -1;
    }
};
export const moveLeft = async () => {
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
                    currentValue = score;
                    check2048(gameField[x][y]);
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
        await renderData();
    }
};

export const moveRight = async () => {
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
                    currentValue = score;
                    check2048(gameField[x][y]);
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
        await renderData();
    }

};

export const moveUp = async () => {
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
                    currentValue = score;
                    check2048(gameField[y][x]);
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
        await renderData();
    }
};

export const moveDown = async () => {
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
                    currentValue = score;
                    check2048(gameField[y][x]);
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
        await renderData();
    }
};

//Проверка есть ли результат 2048
const check2048 = (num: number) => {
    if (num === winNum) {
        isWin = true;
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
    resetTimer();
    isFinish = true;
    return;
};

export const resetGame = async () => {
    let divGameOver = document.getElementById('gameOver');
    let divWin = document.getElementById('win');

    if (divGameOver && divWin) {
        resetTimer();
        currentValue = 0;
        isWin = false;
        await start();
        divGameOver.style.display = 'none';
        divWin.style.display = 'none';
    }
};


const keyPressOnceTracker = () => {
    window.addEventListener('keydown', handleKeydown, {
        once: true,
    });
};

const handleKeydown = async (event: KeyboardEvent) => {
    switch (event.key) {
        case 'ArrowUp':
            await moveUp();
            break;
        case 'ArrowRight':
            await moveRight();
            break;
        case 'ArrowDown':
            await moveDown();
            break;
        case 'ArrowLeft':
            await moveLeft();
            break;
        default:
            keyPressOnceTracker();
            return;
    }
    keyPressOnceTracker();
};

let resetButtons = document.getElementsByClassName('btnAgain');

// Назначаем обработчик события для каждой кнопки
for (let i = 0; i < resetButtons.length; i++) {
    resetButtons[i].addEventListener('click', async () => {
        await resetGame();
    });
}

// Для управления мышкой/жестами находим где было нажатие и где отпустили/ вычисляем направление
let startX: number, startY: number, endX: number, endY: number;

function handleMove(event: MouseEvent | TouchEvent) {
    if (event instanceof MouseEvent) {
        startX = event.x;
        startY = event.y;
    } else if (event instanceof TouchEvent) {
        startX = event.touches[0].pageX;
        startY = event.touches[0].pageY;
    }
}

async function handleEnd(event: MouseEvent | TouchEvent) {
    if (event instanceof MouseEvent) {
        endX = event.x;
        endY = event.y;
    } else if (event instanceof TouchEvent) {
        endX = event.changedTouches[0].pageX;
        endY = event.changedTouches[0].pageY;
    }

    let x = endX - startX;
    let y = endY - startY;

    let absX = Math.abs(x) > Math.abs(y);
    let absY = Math.abs(y) > Math.abs(x);
    if (x > 0 && absX) {
        await moveRight();
    } else if (x < 0 && absX) {
        await moveLeft();
    } else if (y > 0 && absY) {
        await moveDown();
    } else if (y < 0 && absY) {
        await moveUp();
    }
}

document.addEventListener('mousedown', handleMove);
document.addEventListener('mouseup', handleEnd);
document.addEventListener('touchstart', handleMove);
document.addEventListener('touchend', handleEnd);

// Открытие списка результатов
let listData = document.getElementsByClassName('tableData__img');

// Назначаем обработчик события для кнопки открытия списка
listData[0].addEventListener('click', (event) => {
    let div = document.getElementsByClassName('recordList');
    (div[0] as HTMLElement).style.left = '0px';
    event.stopPropagation();
});

const div = document.getElementsByClassName('recordList');
document.addEventListener('click', (e) => {
    const withinBoundaries = e.composedPath().includes(div[0]);
    if (!withinBoundaries) {
        (div[0] as HTMLElement).style.left = '-330px'; //// скрываем элемент тк клик был за его пределами
    }
});

//Обработчик на кнопку с формы + чек на пустое поле
document.addEventListener('DOMContentLoaded', async function () {
    let form = document.getElementById('myForm');
    form && form.addEventListener('submit', function (event) {
        let input = <HTMLInputElement>document.getElementById('myField');

        if (input && input.value == '') {
            alert('Поле не может быть пустым');
            event.preventDefault();
        } else {
            saveToLocalStorage('name', input.value);
            let div = document.getElementById('modalForName');
            if (div) {
                div.style.display = 'none';
                resetGame();
            }
        }
    });
});

// ==== START

async function start() {
    // Проверяем если ли что-то в локал сторедж и сетаем в бест
    await getRecords();

    const bestRes = readFromLocalStorage('best');
    let pElementResult = document.querySelector('.bestResult p');
    if (pElementResult && bestRes) pElementResult.innerHTML = bestRes.toString();

    isWin = false;
    checkFirstStart();
    startTimer();
    gameField = [];
    score = 0;
    isFinish = false;
    createGameField();
    getRandomNumber();
    getRandomNumber();
    await renderData();
    keyPressOnceTracker();
}

await start();
