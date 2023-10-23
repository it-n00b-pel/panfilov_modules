import {getFontSize, getBgColor} from './utils/styleUtils.ts';
import {checkCurrentBestValue, saveToLocalStorage} from './utils/localStorage.ts';
import {checkFirstStart, showGameOverModal, showWinModal} from './utils/modalsHandler.ts';
import {resetTimer, startTimer, time} from './utils/timer.ts';


export function startGame() {
    let gameField: Array<Array<number>> = [];
    let score = 0;
    let isFinish = false;
    let winNum = 2048;
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
    const renderData = () => {
        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 5; y++) {
                // let div = document.getElementById('c' + x + y);
                let countCell = x * 5 + y;
                let div = document.getElementsByClassName('game-field__cell')[countCell] as HTMLElement;

                if (div) {
                    if (gameField[x][y] === 0) {
                        div.innerHTML = '';
                        div.className = 'game-field__cell';
                        div.style.background = getBgColor(gameField[x][y]);
                    } else {
                        div.style.background = getBgColor(gameField[x][y]);
                        div.classList.add('tile');
                        div.innerHTML = String(gameField[x][y]);
                        // Изменяет размер текст по мере увеличения значение числа в ячейке
                        div.style.fontSize = getFontSize(gameField[x][y]);
                    }
                }
            }
        }

        let pElementResult = document.getElementsByClassName('result__value');
        if (pElementResult.length) pElementResult[0].innerHTML = score.toString();

        checkCurrentBestValue(currentValue);

        // Если есть ячейка 2048, то модалка победы
        if (isWin) {
            saveToLocalStorage('best', currentValue.toString());
            saveToLocalStorage('time', time);
            showWinModal(time);
            currentValue = 0;
        }
        // Если конец, то модалка проигрыша
        if (isFinish) {
            showGameOverModal(currentValue, score);
        }
    };

// Находим индекс след ячейки в зависимости от направления движения
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


    const move = async (direction: 'left' | 'up' | 'down' | 'right') => {
        const oldGameField = String(gameField);

        // Сначала проходимся по строкам / внутри них по столбцам (горизонталь или вертикаль)
        if (!isWin) {
            for (let x = 0; x < 5; x++) {
                if (direction === 'left' || direction === 'right') {
                    for (let y = (direction === 'left' ? 0 : 4); (direction === 'left' ? y < 4 : y > 0); (direction === 'left' ? y++ : y--)) {
                        const nextCell = getNextIndexCell(direction, x, y);
                        if (nextCell !== -1) {
                            if (gameField[x][y] === 0) {
                                gameField[x][y] = gameField[x][nextCell];
                                gameField[x][nextCell] = 0;
                                (direction === 'left' ? y-- : y++);
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
                } else if (direction === 'up' || direction === 'down') {
                    for (let y = (direction === 'up' ? 0 : 4); (direction === 'up' ? y < 4 : y > 0); (direction === 'up' ? y++ : y--)) {
                        const nextCell = getNextIndexCell(direction, x, y);
                        if (nextCell !== -1) {
                            if (gameField[y][x] === 0) {
                                gameField[y][x] = gameField[nextCell][x];
                                gameField[nextCell][x] = 0;
                                direction === 'up' ? y-- : y++;
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

    const keyPressOnceTracker = () => {
        window.addEventListener('keydown', handleKeydown, {
            once: true,
        });
    };

    const resetGame = async () => {
        let divGameOver = document.getElementsByClassName('game-over-nodal modal')[0] as HTMLElement;
        let divWin = document.getElementsByClassName('win-modal')[0] as HTMLElement;

        if (divGameOver || divWin) {
            resetTimer();
            currentValue = 0;
            isWin = false;
            await start();
            if (divGameOver) divGameOver.style.display = 'none';
            if (divWin) divWin.style.display = 'none';
        }

        keyPressOnceTracker();
    };

    const handleKeydown = async (event: KeyboardEvent) => {
        switch (event.key) {
            case 'ArrowUp':
                await move('up');
                break;
            case 'ArrowRight':
                await move('right');
                break;
            case 'ArrowDown':
                await move('down');
                break;
            case 'ArrowLeft':
                await move('left');
                break;
            default:
                keyPressOnceTracker();
                return;
        }
        keyPressOnceTracker();
    };

    let resetButtons = document.getElementsByClassName('reset-game-btn');

// Назначаем обработчик события для каждой кнопки
    for (let i = 0; i < resetButtons.length; i++) {
        resetButtons[i].addEventListener('click', async () => {
            await resetGame();
        });
    }

// Для управления мышкой/жестами находим, где было нажатие и где отпустили/ вычисляем направление
    let startX: number, startY: number, endX: number, endY: number;

    const handleMove = async (event: MouseEvent | TouchEvent) => {
        if (event instanceof MouseEvent) {
            startX = event.x;
            startY = event.y;
        } else if (event instanceof TouchEvent) {
            startX = event.touches[0].pageX;
            startY = event.touches[0].pageY;
        }
    };

    const handleEnd = async (event: MouseEvent | TouchEvent) => {
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

        if (x > 0 && absX && !isWin) {
            await move('right');
        } else if (x < 0 && absX && !isWin) {
            await move('left');
        } else if (y > 0 && absY && !isWin) {
            await move('down');
        } else if (y < 0 && absY && !isWin) {
            await move('up');
        }

    };

    document.addEventListener('mousedown', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchstart', handleMove);
    document.addEventListener('touchend', handleEnd);

// Открытие списка результатов
    let listData = document.getElementsByClassName('table-data__img');

// Назначаем обработчик события для кнопки открытия списка
    listData[0].addEventListener('click', (event) => {
        let div = document.getElementsByClassName('table-data__record-list');
        (div[0] as HTMLElement).style.left = '0px';
        event.stopPropagation();
    });

    const div = document.getElementsByClassName('table-data__record-list');
    document.addEventListener('click', (e) => {
        const withinBoundaries = e.composedPath().includes(div[0]);
        if (!withinBoundaries) {
            (div[0] as HTMLElement).style.left = '-340px'; // скрываем элемент тк клик был за
            // его пределами
        }
    });

//Обработчик на кнопку с формы + чек на пустое поле
    document.addEventListener('DOMContentLoaded', async function () {
        let form = document.getElementsByClassName('name-modal__form')[0];
        form && form.addEventListener('submit', function (event) {
            let input = <HTMLInputElement>document.getElementsByClassName('name-modal__input')[0];

            if (input && input.value == '') {
                alert('Поле не может быть пустым');
                event.preventDefault();
            } else {
                saveToLocalStorage('name', input.value);
                let div = document.getElementsByClassName('name-modal')[0] as HTMLElement;
                if (div) {
                    div.style.display = 'none';
                    resetGame();
                }
            }
        });
    });

// ==== START

    const start = async () => {
        // Проверяем если ли что-то в локал сторедж и сетаем в бест
        const bestRes = await JSON.parse(localStorage.getItem('best') || '0');
        let pElementResult = document.querySelector('.result__best-value p');
        if (pElementResult) pElementResult.innerHTML = bestRes;

        isWin = false;
        checkFirstStart();
        startTimer();
        gameField = [];
        score = 0;
        isFinish = false;
        createGameField();
        getRandomNumber();
        getRandomNumber();
        renderData();
        keyPressOnceTracker();
    };

    start();
}
