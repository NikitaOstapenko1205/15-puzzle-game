import startGame from './game';

const startButtons = [...document.querySelectorAll('.new-game')];

startButtons.forEach(elem => elem.addEventListener('click', startGame));
startGame();
