import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]')
const timerEl = document.querySelector('.timer')

 startBtn.disabled = true;





const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0] < defaultDate) {
        Notiflix.Notify.failure("Please choose a date in the future");

      } else {
        
    };
  },
};

const fp = flatpickr('#datetime-picker', options);