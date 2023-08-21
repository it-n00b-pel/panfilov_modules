import {getBgColor} from './utils/getBgColor.ts';

const gameField: Array<Array<0 | number>> = [];


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
    console.log(777);
    gameField[rowIndex][colIndex] = Math.random() < 0.5 ? 2 : 4;
}

// После каждого изменения массива gameField вызываем для отрисовки новых данных
const renderData = () => {
    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
            let div = document.getElementById('c' + x + y);
            if (div && gameField[x][y]) {
                if (gameField[x][y] === 0) {
                    div.innerHTML = '';
                    div.className = 'cell';
                } else {
                    div.innerHTML = String(gameField[x][y]);
                    div.className = 'cell tile';
                    // Меняем bg ячейки для комфщрта/визульного различия
                    const bg = getBgColor(gameField[x][y]);
                    div.style.background = bg;
                }
            }
        }
    }
};


createGameField();

getRandomNumber();
getRandomNumber();
// setInterval(() => {
//     getRandomNumber();
//     renderData();
// }, 300);

renderData();

console.log(gameField);


document.onkeydown = function (event) {
    if (event.code == 'ArrowLeft') {

    }
};


