import {saveToLocalStorage} from './localStorage.ts';

export const showWinModal = (time: string) => {
    let div = document.getElementsByClassName('win-modal')[0] as HTMLElement;
    let spanRes = document.getElementsByClassName('win-modal__time-result')[0];
    if (div && spanRes) {
        if (!time) {
            spanRes.innerHTML = 'no-time';
        } else {
            spanRes.innerHTML = time;
        }
        div.style.display = 'flex';
    }
    saveToLocalStorage('time', time);
};

export const showGameOverModal = (currentValue: number, score: number) => {
    saveToLocalStorage('best', currentValue.toString());
    let div = document.getElementsByClassName('game-over-nodal')[0] as HTMLElement;
    let spanRes = document.getElementsByClassName('game-over-nodal__result')[0] as HTMLElement;
    if (div && spanRes) {
        spanRes.innerHTML = score.toString();
        div.style.display = 'flex';
    }
};

export const checkFirstStart = () => {
    const name = localStorage.getItem('name');
    if (!name) {
        let div = document.getElementsByClassName('name-modal')[0] as HTMLElement;
        if (div) {
            div.style.display = 'flex';
        }
    }
};
