// Select elements
const hourDropdown = document.getElementById('hours');
const minuteDropdown = document.getElementById('minutes');
const secondDropdown = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resumeButton = document.getElementById('resume');
const resetButton = document.getElementById('reset');
const timerText = document.getElementById('timer-text');
const circle = document.querySelector('.circle');

let countdownInterval;
let totalTimeInSeconds = 0;
let elapsedSeconds = 0;

// Function to populate the dropdowns for hours, minutes, and seconds
function populateDropdown(dropdown, max) {
    for (let i = 0; i <= max; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i.toString().padStart(2, '0');
        dropdown.appendChild(option);
    }
}

// Populate each dropdown
populateDropdown(hourDropdown, 23);
populateDropdown(minuteDropdown, 59);
populateDropdown(secondDropdown, 59);

// Start the countdown timer
function startTimer() {
    const hours = parseInt(hourDropdown.value) || 0;
    const minutes = parseInt(minuteDropdown.value) || 0;
    const seconds = parseInt(secondDropdown.value) || 0;

    totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;

    if (totalTimeInSeconds <= 0) {
        alert("Please set a valid timer!");
        return;
    }

    if (countdownInterval) clearInterval(countdownInterval);
    elapsedSeconds = 0;

    countdownInterval = setInterval(() => {
        if (elapsedSeconds >= totalTimeInSeconds) {
            clearInterval(countdownInterval);

            // Play the sound
            const timerAudio = document.getElementById("timer-audio");
            timerAudio.loop = true;
            timerAudio.play()
                .then(() => console.log("Audio is playing"))
                .catch((error) => console.error("Audio play failed:", error));

            alert("Time's up!");

         // **Stop the audio after alert is dismissed**
             setTimeout(() => {
                timerAudio.pause();
                timerAudio.currentTime = 0;
            }, 1000); // Wait for 1 second after the alert

            return;
        }
        elapsedSeconds++;
        const remainingSeconds = totalTimeInSeconds - elapsedSeconds;

        const hoursLeft = Math.floor(remainingSeconds / 3600);
        const minutesLeft = Math.floor((remainingSeconds % 3600) / 60);
        const secondsLeft = remainingSeconds % 60;

        // Update the display
        timerText.textContent = `${hoursLeft.toString().padStart(2, '0')}:${minutesLeft.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;

        // Update the circle progress
        updateCircleProgress(remainingSeconds, totalTimeInSeconds);
    }, 1000);
}

// Function to update the circle's progress
function updateCircleProgress(remainingTime, totalTime) {
    const progress = (remainingTime / totalTime) * 360;
    circle.style.background = `conic-gradient(#ff4c4c ${progress}deg, transparent 0)`;
}

// Pause the timer
function pauseTimer() {
    clearInterval(countdownInterval);
}

function resumeTimer() {
    if (countdownInterval) clearInterval(countdownInterval); // Clear any existing interval

    // Check if the timer has already ended
    if (elapsedSeconds >= totalTimeInSeconds) {
        const timerAudio = document.getElementById("timer-audio");
        timerAudio.loop = true; // Set loop for the audio
        timerAudio.play()
            .then(() => console.log("Audio is playing and looping"))
            .catch((error) => console.error("Audio play failed:", error));

        alert("Time's up!");

        // Stop the audio after alert is dismissed
        timerAudio.pause(); 
        timerAudio.currentTime = 0;
        return;
    }

    countdownInterval = setInterval(() => {
        if (elapsedSeconds >= totalTimeInSeconds) {
            clearInterval(countdownInterval);

            const timerAudio = document.getElementById("timer-audio");
            timerAudio.loop = true; // Set loop with delay
            console.log("Loop is set to:", timerAudio.loop);
            timerAudio.play()
                .then(() => console.log("Audio is playing and looping"))
                .catch((error) => console.error("Audio play failed:", error));

            alert("Time's up!");

            // Stop the audio after alert is dismissed
            timerAudio.pause(); 
            timerAudio.currentTime = 0;
            return;
        }

        elapsedSeconds++;
        const remainingSeconds = totalTimeInSeconds - elapsedSeconds;

        const hoursLeft = Math.floor(remainingSeconds / 3600);
        const minutesLeft = Math.floor((remainingSeconds % 3600) / 60);
        const secondsLeft = remainingSeconds % 60;

        // Update the display
        timerText.textContent = `${hoursLeft.toString().padStart(2, '0')}:${minutesLeft.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;

        // Update the circle progress
        updateCircleProgress(remainingSeconds, totalTimeInSeconds);
    }, 1000);
}
// Reset the timer
function resetTimer() {
    clearInterval(countdownInterval);
    elapsedSeconds = 0;
    totalTimeInSeconds = 0;
    timerText.textContent = "00:00:00";
    circle.style.background = 'none';
    hourDropdown.value = '0';
    minuteDropdown.value = '0';
    secondDropdown.value = '0';
}

// Add event listeners for buttons
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resumeButton.addEventListener('click', resumeTimer);
resetButton.addEventListener('click', resetTimer);
