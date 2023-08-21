export const getBgColor = (num: number) => {
    switch (num) {
        case 4 :
            return '#b9ae98';
        case 8 :
            return '#f2b179';
        case 16 :
            return '#f59563';
        case 32 :
            return '#f67c5f';
        case 64 :
            return '#f65e3b';
        case 128 :
            return '#7b7e30';
        case 256 :
            return '#b09743';
        case 512 :
            return '#789a14';
        case 1024 :
            return '#09a2da';
        case 2048 :
            return '#9228c5';
        default :
            return '#9b9b9a';
    }
};
