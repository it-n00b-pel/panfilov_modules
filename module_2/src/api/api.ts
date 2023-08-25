import {showWinModal} from '../utils/modalsHandler.ts';
import {readFromLocalStorage} from '../utils/localStorage.ts';

export const getRecords = async () => {
    const records = await fetch('http://localhost:8000/api/v1/record/');
    const data: Array<UserType> = await records.json();
    console.log(data);

    // Проверяем если ли что-то в локал сторедж и сетаем в список
    let recordList = document.getElementById('recordList');

    if (records && recordList) {
        while (recordList.firstChild) {
            recordList.removeChild(recordList.firstChild);
        }
        for (let i = 0; i < data.length; i++) {
            let listItem = document.createElement('li');
            listItem.textContent = data[i].name + '-' + data[i].record;
            recordList.appendChild(listItem);
        }
    }
};

export const setRecords = async () => {
    let name = JSON.parse(readFromLocalStorage('name') || 'noname');
    const result = await fetch('http://localhost:8000/api/v1/record/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({name}),
    });

    const data: UserType = await result.json();
    showWinModal(data.record);
};


type UserType = {
    _id: string,
    name: string,
    __v: number,
    record: string
}


