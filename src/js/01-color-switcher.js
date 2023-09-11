const startButtonEl = document.querySelector('[data-start]');
const stopButtonEl = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');
let timerId = 0;


const onButtonStart = () => {
    timerId = setInterval(() => {
        function getRandomHexColor() {
            return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
        }
        startButtonEl.disabled = true;
        bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000);
};

const onButtonStop = () => {
    bodyEl.style.backgroundColor = "initial";
    startButtonEl.disabled = false;
    clearInterval(timerId);
};

startButtonEl.addEventListener('click', onButtonStart);
stopButtonEl.addEventListener('click', onButtonStop);
