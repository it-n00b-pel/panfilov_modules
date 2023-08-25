import {showWinModal} from '../utils/modalsHandler.ts';
import {readFromLocalStorage} from '../utils/localStorage.ts';

export const getRecords = async () => {
    const records = await fetch('http://localhost:8000/api/v1/record/');
    const data: Array<UserType> = await records.json();

    // Проверяем если ли что-то в локал сторедж и сетаем в список
    let recordList = document.getElementById('recordList');

    if (records && recordList) {
        while (recordList.firstChild) {
            recordList.removeChild(recordList.firstChild);
        }
        for (let i = 0; i < data.length; i++) {
            let listItem = document.createElement('li');
            listItem.textContent = data[i].username + '-' + data[i].time;
            recordList.appendChild(listItem);
        }
    }
};

export const setRecords = async () => {
    let username = JSON.parse(readFromLocalStorage('name') || 'noname');
    const result = await fetch('http://localhost:8000/api/v1/record/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username}),
    });

    const data: UserType = await result.json();
    showWinModal(data.time);
};


type UserType = {
    _id: string,
    username: string,
    __v: number,
    time: string
}


