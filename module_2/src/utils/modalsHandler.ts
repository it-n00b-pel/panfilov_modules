import {readFromLocalStorage, saveToLocalStorage} from './localStorage.ts';

export const showWinModal = (time: string) => {
    let div = document.getElementById('win');
    let spanRes = document.getElementById('finishTime');
    if (div && spanRes) {
        spanRes.innerHTML = time;
        div.style.display = 'flex';
    }
};

export const showGameOverModal = (currentValue: number, score: number) => {
    saveToLocalStorage('best', currentValue);
    let div = document.getElementById('gameOver');
    let spanRes = document.getElementById('finishResult');
    if (div && spanRes) {
        spanRes.innerHTML = score.toString();
        div.style.display = 'flex';
    }
};

export const checkFirstStart = () => {
    const name = readFromLocalStorage('name');
    if (!name) {
        let div = document.getElementById('modalForName');
        if (div) {
            div.style.display = 'flex';
        }
    }
};
