export const readFromLocalStorage = (key: string) => {
    return localStorage.getItem(key);
};

export const saveToLocalStorage = (key: string, data: any) => {
    if (key === 'best') {
        const oldRes = readFromLocalStorage('best');
        if (oldRes && +oldRes >= data) {
            return;
        }
    }
    
    localStorage.setItem(key, JSON.stringify(data));
};
