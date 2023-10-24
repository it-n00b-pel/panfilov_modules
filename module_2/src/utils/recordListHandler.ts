import {UserType} from '../types/type.ts';

export const recordListHandler = <T extends string | UserType>(arr: T[]) => {
    let recordList = document.getElementsByClassName('table-data__record-item')[0];

    if (arr && arr.length) {
        while (recordList.firstChild) {
            recordList.removeChild(recordList.firstChild);
        }
        for (let i = 0; i < arr.length; i++) {
            let listItem = document.createElement('li');
            if (typeof arr[i] === 'string') {
                listItem.textContent = <string>arr[i];
            } else {
                let user = arr[i] as UserType;
                listItem.textContent = user.username + ' - ' + user.time;
            }
            recordList.appendChild(listItem);
        }
    }
};
