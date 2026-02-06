// Stopwatch variables
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let intervalId = null;
let laps = [];

// DOM elements
const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

// Progress ring elements
const hoursRing = document.querySelector('.progress-ring__circle--hours');
const minutesRing = document.querySelector('.progress-ring__circle--minutes');
const secondsRing = document.querySelector('.progress-ring__circle--seconds');

// Circumferences for progress rings
const hoursCircumference = 2 * Math.PI * 120;
const minutesCircumference = 2 * Math.PI * 100;
const secondsCircumference = 2 * Math.PI * 80;

// Event listeners
startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);

// Start the stopwatch
function start() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 10);
    }
}

// Pause the stopwatch
function pause() {
    if (isRunning) {
        isRunning = false;
        clearInterval(intervalId);
        intervalId = null;
    }
}

// Reset the stopwatch
function reset() {
    isRunning = false;
    clearInterval(intervalId);
    intervalId = null;
    elapsedTime = 0;
    laps = [];
    updateDisplay();
    updateProgress();
    lapsList.innerHTML = '';
}

// Record a lap time
function recordLap() {
    if (isRunning) {
        const lapTime = elapsedTime;
        laps.push(lapTime);
        displayLaps();
    }
}

// Update the time display and progress rings
function updateTime() {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
    updateProgress();
}

// Update the time display
function updateDisplay() {
    const totalMilliseconds = elapsedTime;
    const hours = Math.floor(totalMilliseconds / 3600000);
    const minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
    const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
    const milliseconds = Math.floor((totalMilliseconds % 1000) / 10);

    hoursDisplay.textContent = hours.toString().padStart(2, '0');
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    millisecondsDisplay.textContent = milliseconds.toString().padStart(2, '0');
}

// Update the progress rings
function updateProgress() {
    const totalMilliseconds = elapsedTime;
    const hours = (totalMilliseconds / 3600000) % 24;
    const minutes = (totalMilliseconds / 60000) % 60;
    const seconds = (totalMilliseconds / 1000) % 60;

    const hoursProgress = (hours / 24) * hoursCircumference;
    const minutesProgress = (minutes / 60) * minutesCircumference;
    const secondsProgress = (seconds / 60) * secondsCircumference;

    hoursRing.style.strokeDashoffset = hoursCircumference - hoursProgress;
    minutesRing.style.strokeDashoffset = minutesCircumference - minutesProgress;
    secondsRing.style.strokeDashoffset = secondsCircumference - secondsProgress;
}

// Display lap times
function displayLaps() {
    lapsList.innerHTML = '';
    laps.forEach((lap, index) => {
        const lapItem = document.createElement('li');
        const lapTime = formatTime(lap);
        lapItem.textContent = `Lap ${index + 1}: ${lapTime}`;
        lapsList.appendChild(lapItem);
    });
}

// Format time for lap display
function formatTime(milliseconds) {
    const hours = Math.floor(milliseconds / 3600000);
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const ms = Math.floor((milliseconds % 1000) / 10);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
}

// Initialize display
updateDisplay();
updateProgress();