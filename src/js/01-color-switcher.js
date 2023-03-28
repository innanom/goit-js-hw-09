const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyEl = document.body;
stopBtn.disabled = true;


let timerId = null;

startBtn.addEventListener('click', changeBackground);
stopBtn.addEventListener('click', stopChangeBC);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function changeBackground() {
    timerId = setInterval(() => {
        bodyEl.style.backgroundColor = getRandomHexColor()
    }, 1000)
    startBtn.disabled = true;
    stopBtn.disabled = false;
}

function stopChangeBC() {
    clearInterval(timerId);
    stopBtn.disabled = true;
    startBtn.disabled = false;
}