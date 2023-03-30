import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]')
const inputDateEl = document.querySelector('#datetime-picker')
const daysEl = document.querySelector('[data-days]')
const hoursEl = document.querySelector('[data-hours]')
const minutesEl = document.querySelector('[data-minutes]')
const secondsEl = document.querySelector('[data-seconds]')
const timerEl = document.querySelector('.timer')
const valueEl = document.querySelectorAll('.value')
const labelEl = document.querySelectorAll('.label')



startBtn.disabled = true;
timerEl.style.display = 'flex';
timerEl.style.gap = '10px';
timerEl.style.padding = '20px';
valueEl.forEach(elem => {
  elem.style.display = 'block';
  elem.style.textAlign = 'center';
  elem.style.fontSize = '30px';
});
labelEl.forEach(elem => {
  elem.style.fontSize = '20px';
});




startBtn.addEventListener('click', startTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
      Notiflix.Notify.failure("Please choose a date in the future");

    } else {
      startBtn.disabled = false;
     };
  },
};

const fp = flatpickr('#datetime-picker', options);

function startTimer() {
  startBtn.disabled = true;
  const timerID = setInterval(() => {
    const currentTime = new Date();
    const finishTime = new Date(inputDateEl.value);
    const time = finishTime - currentTime;
    const { days, hours, minutes, seconds } = convertMs(time);
    console.log(`${days}:${hours}:${minutes}:${seconds}`)
    
    addLeadingZero(convertMs(time));

     if (time <= 1000) {
       clearInterval(timerID);
       return;
    }

  }, 1000)

}
function addLeadingZero({ days, hours, minutes, seconds }) {
  daysEl.textContent = days.toString().padStart(2, '0');
  hoursEl.textContent = hours.toString().padStart(2, '0');
  minutesEl.textContent = minutes.toString().padStart(2, '0');
  secondsEl.textContent = seconds.toString().padStart(2, '0');
}



function convertMs(ms) {
  /// Кількість мілісекунд на одиницю часу
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Решта днів
  const days = Math.floor(ms / day);
  // Решта годин
  const hours = Math.floor((ms % day) / hour);
  // Решта хвилин
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Решта секунд
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
