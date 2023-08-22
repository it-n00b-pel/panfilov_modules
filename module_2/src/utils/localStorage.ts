export const readFromLocalStorage = (key: string) => {
    return localStorage.getItem(key);
};

export const saveToLocalStorage = (currentValue: number) => {
    const oldRes = readFromLocalStorage('best');
    if (oldRes) {
        if (+oldRes < currentValue) {
            localStorage.setItem('best', currentValue.toString());
        }
    } else {
        localStorage.setItem('best', currentValue.toString());
    }
};
