export let time = '';

let seconds = 0;
let minutes = 0;
let hours = 0;
let interval: number | undefined;

let startSeconds = 0;
let endSeconds = 0;
let lastSecondTimer = 0;
let lastMinutesTimer = 0;
let lastHoursTimer = 0;


function updateTime() {
    let timer = document.getElementsByClassName('result__timer')[0];
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
    clearInterval(interval);
    interval = setInterval(updateTime, 1000);
};

export const resetTimer = () => {
    clearInterval(interval);
    seconds = 0;
    minutes = 0;
    hours = 0;
};

// сохраняет последнее значение таймера
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') {
        endSeconds = new Date().valueOf();
        let outTime = endSeconds - startSeconds;
        seconds = lastSecondTimer + Math.floor((outTime / 1000) % 60);
        minutes = lastMinutesTimer + Math.floor((outTime / (1000 * 60)) % 60);
        lastHoursTimer = lastHoursTimer + Math.floor((outTime / (1000 * 60 * 60)) % 24);
        if (seconds >= 60) {
            minutes++;
            seconds = seconds - 60;
        }
        if (minutes >= 60) {
            hours++;
            minutes = minutes - 60;
        }
    } else {
        startSeconds = new Date().valueOf();
        lastSecondTimer = seconds;
        lastMinutesTimer = minutes;
        lastHoursTimer = hours;
    }
});
