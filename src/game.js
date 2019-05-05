import { shuffleArray, startTimer, getTime, checkTimeLength } from './utils';

const TABLE = document.querySelector('table');
const tableCell = document.querySelectorAll('table td p');
const moveCounter = document.querySelector('.move-count span');
const winnerSection = document.querySelector('.winner-section');
const sessionRecordTime = document.querySelector('.best-time span');
const sessionRecordCount = document.querySelector('.best-count span');
let counter = 0;

const startGame = () => {
  startTimer();
  const values = shuffleArray();
  winnerSection.style.display = 'none';
  counter = 0;
  moveCounter.textContent = counter;

  for (let i = 0, cellLength = tableCell.length; i < cellLength; i += 1) {
    const value = values[i];
    tableCell[i].className = '';
    tableCell[i].textContent = value;
    if (value === '') {
      tableCell[i].className = 'empty';
    }
  }
};

const showWinBlock = () => {
  const { minutes, seconds } = getTime();
  winnerSection.style.display = 'block';
  if ((minutes * 60 + seconds < sessionStorage['minutes'] * 60 + sessionStorage['seconds']) || !sessionStorage['minutes']) {
    sessionStorage['minutes'] = minutes;
    sessionStorage['seconds'] = seconds;
    sessionRecordTime.textContent = `${checkTimeLength(sessionStorage['minutes'])} : ${checkTimeLength(sessionStorage['seconds'])}`;
  }
  if (+sessionStorage['bestCount'] > counter || !sessionStorage['bestCount']) {
    sessionStorage['bestCount'] = counter;
    sessionRecordCount.textContent = counter;
  }
};

const checkWin = () => {
  for (let i = 1, cellLength = tableCell.length; i < cellLength; i += 1) {
    if (+tableCell[i - 1].textContent !== i) {
      return false;
    }
  }

  showWinBlock();
};

TABLE.addEventListener('click', (e) => {
  if (e.target.nodeName !== 'P') {
    return false;
  }
  const selfRowIndex = +e.target.closest('tr').rowIndex;
  const selfCellIndex = +e.target.closest('td').cellIndex;
  const selfTable = e.currentTarget;
  const selfCell = e.target;
  let top = null;
  let bottom = null;
  let left = null;
  let right = null;

  if (selfRowIndex - 1 >= 0) {
    top = selfTable.rows[selfRowIndex - 1].cells[selfCellIndex].querySelector('p');
  }
  if (selfRowIndex + 1 <= 3) {
    bottom = selfTable.rows[selfRowIndex + 1].cells[selfCellIndex].querySelector('p');
  }
  if (selfCellIndex - 1 >= 0) {
    left = selfTable.rows[selfRowIndex].cells[selfCellIndex - 1].querySelector('p');
  }
  if (selfCellIndex + 1 <= 3) {
    right = selfTable.rows[selfRowIndex].cells[selfCellIndex + 1].querySelector('p');
  }

  if (top && top.classList.contains('empty')) {
    selfCell.classList.add('empty');
    top.classList.remove('empty');
    top.textContent = selfCell.textContent;
    selfCell.textContent = '';
  }
  else if (bottom && bottom.classList.contains('empty')) {
    selfCell.classList.add('empty');
    bottom.classList.remove('empty');
    bottom.textContent = selfCell.textContent;
    selfCell.textContent = '';
  }
  else if (left && left.classList.contains('empty')) {
    selfCell.classList.add('empty');
    left.classList.remove('empty');
    left.textContent = selfCell.textContent;
    selfCell.textContent = '';
  }
  else if (right && right.classList.contains('empty')) {
    selfCell.classList.add('empty');
    right.classList.remove('empty');
    right.textContent = selfCell.textContent;
    selfCell.textContent = '';
  }

  counter += 1;
  moveCounter.textContent = counter;
  checkWin();
});

export default startGame;
