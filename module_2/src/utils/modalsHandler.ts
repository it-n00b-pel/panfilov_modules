import {saveToLocalStorage} from './localStorage.ts';

export const showWinModal = (time: string) => {
    let div = document.getElementsByClassName('win-modal')[0] as HTMLElement;
    let spanRes = document.getElementsByClassName('win-modal__time-result')[0];
    if (div && spanRes) {
        spanRes.innerHTML = time;
        div.style.display = 'flex';
    }
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

    const arr = JSON.parse(localStorage.getItem('arr') || '[]');
    let recordList = document.getElementsByClassName('table-data__record-item')[0];

    if (arr && arr.length) {
        while (recordList.firstChild) {
            recordList.removeChild(recordList.firstChild);
        }
        for (let i = 0; i < arr.length; i++) {
            let listItem = document.createElement('li');
            listItem.textContent = arr[i];
            recordList.appendChild(listItem);
        }
    }
};
