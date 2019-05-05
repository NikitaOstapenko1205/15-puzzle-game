const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ''];
const timerElem = document.querySelector('.game-time span');
let actualTime = '';
let minutes = 0;
let seconds = 0;
let interval;

const checkTimeLength = num => (+num <= 9 ? `0${num}` : num);

const resetTimer = () => {
  minutes = 0;
  seconds = 0;
  timerElem.textContent = '00 : 00';
};

const startTimer = () => {
  clearInterval(interval);
  resetTimer();
  interval = setInterval(() => {
    seconds += 1;
    if (seconds === 60) {
      minutes += 1;
      seconds = 0;
    }
    if (minutes === 60) {
      clearInterval(interval);
    }
    const strMin = checkTimeLength(minutes);
    const strSec = checkTimeLength(seconds);

    actualTime = `${strMin} : ${strSec}`;
    timerElem.textContent = actualTime;
  }, 1000);
};

const getTime = () => {
  return { minutes, seconds };
};

const shuffleArray = () => {
  for (let i = values.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [values[i], values[j]] = [values[j], values[i]];
  }
  return values;
};

export { shuffleArray, startTimer, getTime, checkTimeLength };
