export const getBgColor = (num: number) => {
    const numsToColor = {
        2: '#9b9b9a',
        4: '#b9ae98',
        8: '#f2b179',
        16: '#f59563',
        32: '#f67c5f',
        64: '#f65e3b',
        128: '#7b7e30',
        256: '#b09743',
        512: '#789414',
        1024: '#09a2da',
        2048: '#9228C5'
    } as { [num: number]: string };
    return numsToColor [num] || '#333';
};

export const getFontSize = (num: number) => {
    if (num > 1000) {
        return '4vmin';
    }
    if (num >= 512) {
        return '5vmin';
    }
    if (num >= 128) {
        return '6vmin';
    }
    if (num >= 64) {
        return '7vmin';
    }
    if (num >= 8) {
        return '8vmin';
    }
    return '10vmin';
};
