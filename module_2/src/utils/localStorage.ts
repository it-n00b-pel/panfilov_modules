export const readFromLocalStorage = (key: string) => {
    return localStorage.getItem(key);
};

export const saveToLocalStorage = (key: string, data: any) => {
    if (key === 'best') {
        const oldRes = readFromLocalStorage('best');
        if (oldRes) {
            if (+oldRes < data) {
                localStorage.setItem(key, data.toString());
            }
        } else {
            localStorage.setItem(key, data.toString());
        }
    } else if (key === 'recordList') {
        let arr = localStorage.getItem('recordList');
        let array = arr !== null ? JSON.parse(arr) : [];
        array.push(data);
        localStorage.setItem('recordList', JSON.stringify(array));
    }
};
