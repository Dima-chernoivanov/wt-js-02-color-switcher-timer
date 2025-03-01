const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.body;
let colorInterval;

stopBtn.disabled = true;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    colorInterval = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
});

stopBtn.addEventListener('click', () => {
    clearInterval(colorInterval);
    startBtn.disabled = false;
    stopBtn.disabled = true;
});