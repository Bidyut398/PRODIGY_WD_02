// Global variables to track time, running state, interval, and lap times
let time = 0;
let running = false;
let interval;
let laps = [];

// Start the stopwatch
function start() {
    if (!running) {
        running = true;
        // Update time every 10ms
        interval = setInterval(update, 10);
    }
}

// Pause the stopwatch
function pause() {
    running = false;
    // Stop the interval
    clearInterval(interval);
}

// Reset the stopwatch
function reset() {
    running = false;
    clearInterval(interval);
    time = 0;
    laps = [];
    // Reset display and clear laps
    document.getElementById('display').textContent = '00:00:00.000';
    document.getElementById('laps').innerHTML = '';
}

// Record a lap time
function lap() {
    if (running) {
        laps.push(time);
        // Create and display new lap entry
        const lapTime = formatTime(time);
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${laps.length}: ${lapTime}`;
        document.getElementById('laps').prepend(lapElement);
    }
}

// Update the displayed time
function update() {
    time += 10;
    document.getElementById('display').textContent = formatTime(time);
}

// Format time in HH:MM:SS.mmm
function formatTime(ms) {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    ms %= (1000 * 60 * 60);
    const minutes = Math.floor(ms / (1000 * 60));
    ms %= (1000 * 60);
    const seconds = Math.floor(ms / 1000);
    const milliseconds = ms % 1000;
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad3(milliseconds)}`;
}

// Pad numbers to two digits
function pad(num) {
    return num.toString().padStart(2, '0');
}

// Pad milliseconds to three digits
function pad3(num) {
    return num.toString().padStart(3, '0');
}