let startTime;
let updatedTime;
let difference;
let timerInterval;
let isRunning = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapTimes = document.getElementById('lapTimes');

function startTimer() {
    if (!isRunning) {
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateTimer, 1000);
        isRunning = true;
    }
}

function updateTimer() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    difference = 0;
    display.textContent = '00:00:00';
    lapTimes.innerHTML = '';
}

function recordLap() {
    if (isRunning) {
        lapCounter++;
        const li = document.createElement('li');
        li.textContent = `Lap ${lapCounter}: ${display.textContent}`;
        lapTimes.appendChild(li);
    }
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);
