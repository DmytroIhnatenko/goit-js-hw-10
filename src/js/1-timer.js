import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startButton = document.querySelector('button[data-start]');

const datetimePicker = document.querySelector('#datetime-picker');

const refs = {
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let timerId = null;
let userSelectDate = null;
startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
      userSelectDate = selectedDates[0];
    }
  },
};

flatpickr('#datetime-picker', options);

startButton.addEventListener('click', () => {
  startButton.disabled = true;

  datetimePicker.disabled = true;

  timerId = setInterval(() => {
    const currentTime = new Date();
    const deltaTime = userSelectDate - currentTime;

    if (deltaTime <= 0) {
      clearInterval(timerId);
      updateClockFace({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      iziToast.success({
        title: 'Готово',
        message: 'Час вийшов!',
        position: 'topRight',
      });
      datetimePicker.disabled = false;
      startButton.disabled = true;

      return;
    }

    const timeComponents = convertMs(deltaTime);
    updateClockFace(timeComponents);
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}
