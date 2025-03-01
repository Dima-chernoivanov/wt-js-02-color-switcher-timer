const dateInput = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');
let countdownInterval;

startButton.disabled = true;

flatpickr(dateInput, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] <= Date.now()) {
            Notiflix.Notify.failure('Будь ласка, оберіть дату у майбутньому');
            startButton.disabled = true;
        } else {
            Notiflix.Notify.success('Натисніть Start!');
            startButton.disabled = false;
        }
    },
});

startButton.addEventListener('click', () => {
    startButton.disabled = true;
    dateInput.disabled = true;
    countdownInterval = setInterval(() => {
        const timeRemaining = new Date(dateInput.value) - Date.now();
        if (timeRemaining <= 0) {
            clearInterval(countdownInterval);
            return;
        }
        const { days, hours, minutes, seconds } = convertMs(timeRemaining);
        daysSpan.textContent = addLeadingZero(days);
        hoursSpan.textContent = addLeadingZero(hours);
        minutesSpan.textContent = addLeadingZero(minutes);
        secondsSpan.textContent = addLeadingZero(seconds);
    }, 1000);
});

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    return {
        days: Math.floor(ms / day),
        hours: Math.floor((ms % day) / hour),
        minutes: Math.floor(((ms % day) % hour) / minute),
        seconds: Math.floor((((ms % day) % hour) % minute) / second),
    };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}