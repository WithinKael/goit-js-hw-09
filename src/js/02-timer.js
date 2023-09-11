import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
const inputEl = document.querySelector('#datetime-picker');
const buttonEl = document.querySelector('[data-start]');
buttonEl.disabled = true;

flatpickr(inputEl, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const dateDiff = selectedDates[0] - Date.now();
        if (dateDiff <= 0) {
            window.alert('Choose future date');
            buttonEl.disabled = true;
            return;
        } else {
            buttonEl.disabled = false;
            timer.deadline = selectedDates[0];
        }
    },
});

buttonEl.addEventListener('click', event => {
  buttonEl.disabled = true;
  timer.start();
});

const timer = {
    deadline: new Date(2023, 2, 5, 13),
    intervalId: null,
    refs: {
        days: document.querySelector('[data-days]'),
        hours: document.querySelector('[data-hours]'),
        minutes: document.querySelector('[data-minutes]'),
        seconds: document.querySelector('[data-seconds]'),
    },
    
    start() {
        this.intervalId = setInterval(() => {
            const diff = this.deadline - Date.now();
            console.log('hello');
            if (diff <= 0) {
                this.stop();

                return;
            }

            let { days, hours, minutes, seconds } = this.getTimeComponents(diff);

            this.refs.days.textContent = this.pad(days);
            this.refs.hours.textContent = this.pad(hours);
            this.refs.minutes.textContent = this.pad(minutes);
            this.refs.seconds.textContent = this.pad(seconds);
        }, 1000);
    },

    stop() {
        clearInterval(this.intervalId);
    },

    pad(value) {
        return String(value).padStart(2, '0');
    },

    getTimeComponents(diff) {
        const days = Math.floor(diff / 1000 / 60 / 60 / 24);
        const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
        const minutes = Math.floor(diff / 1000 / 60) % 60;
        const seconds = Math.floor(diff / 1000) % 60;

        return {
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        };
    },
};
