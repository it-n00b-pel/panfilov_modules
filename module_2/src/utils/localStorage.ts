export const saveToLocalStorage = (key: string, data: string) => {
    if (key === 'best') {
        const oldRes = localStorage.getItem(key);
        if (oldRes && +oldRes >= +data) {
            return;
        }
    }

    if (key === 'time') {
        const arr = JSON.parse(localStorage.getItem('arr') || '[]');
        let recordList = document.getElementsByClassName('table-data__record-item')[0];
        let newArr: string[] = [];
        if (arr && arr.length) {
            newArr = [...arr, data];
            localStorage.setItem('arr', JSON.stringify(newArr));
        } else {
            let listItem = document.createElement('li');
            listItem.textContent = data;
            recordList.appendChild(listItem);
            localStorage.setItem('arr', JSON.stringify([data]));
        }

        if (newArr.length) {
            while (recordList.firstChild) {
                recordList.removeChild(recordList.firstChild);
            }
            for (let i = 0; i < newArr.length; i++) {
                let listItem = document.createElement('li');
                listItem.textContent = newArr[i];
                recordList.appendChild(listItem);
            }
        }
        return;
    }

    localStorage.setItem(key, JSON.stringify(data));
};

export const checkCurrentBestValue = (num: number) => {
    const prevValue = JSON.parse(localStorage.getItem('best') || '0');
    if (num > +prevValue) {
        let pElementResult = document.querySelector('.result__best-value p');
        if (pElementResult) pElementResult.innerHTML = num.toString();
        localStorage.setItem('best', JSON.stringify(num));
    }
};


