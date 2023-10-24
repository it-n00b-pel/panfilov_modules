import {UserType} from '../types/type.ts';
import {recordListHandler} from '../utils/recordListHandler.ts';
import {showWinModal} from '../utils/modalsHandler.ts';
import {resetTimer} from '../utils/timer.ts';

export const getRecords = async () => {
    try {
        const data = await fetch('http://localhost:8000/api/v1/record/');
        const records: Array<UserType> = await data.json();
        records.length && recordListHandler(records);
    } catch (e) {
        console.error(e);
        const arr = JSON.parse(localStorage.getItem('arr') || '[]');
        recordListHandler(arr);
    } finally {
        resetTimer();
    }
};

export const setRecords = async (time: string) => {
    try {
        const username = JSON.parse(localStorage.getItem('name') || 'noname');
        const result = await fetch('http://localhost:8000/api/v1/record/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username}),
        });

        const data: UserType = await result.json();
        showWinModal(data.time);
    } catch (e) {
        console.error(e);
        showWinModal(time);
    }
};
