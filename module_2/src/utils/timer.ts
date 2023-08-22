let timer = document.getElementById('timer');

export let time = '';

let seconds = 0;
let minutes = 0;
let hours = 0;
let interval: number | undefined;

function updateTime() {
    seconds++;
    if (seconds === 60) {
        minutes++;
        seconds = 0;
    }
    if (minutes === 60) {
        hours++;
        minutes = 0;
    }

    time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    if (timer) timer.textContent = time;
}

export const startTimer = () => {
    interval = setInterval(updateTime, 1000);
};

export const resetTimer = () => {
    clearInterval(interval);
    seconds = 0;
    minutes = 0;
    hours = 0;
};
