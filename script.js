let score = 0;
let timeLeft = 30;
let gameActive = true;
let moveInterval;
let timerInterval;

const circle = document.getElementById('circle');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const gameOver = document.getElementById('game-over');
const finalScore = document.getElementById('final-score');
const restartBtn = document.getElementById('restart-btn');
const gameArea = document.getElementById('game-area');

function getRandomPosition() {
    const gameAreaRect = gameArea.getBoundingClientRect();
    const circleSize = 80;
    
    const maxX = gameAreaRect.width - circleSize;
    const maxY = gameAreaRect.height - circleSize;
    
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    return { x: randomX, y: randomY };
}

function moveCircle() {
    if (!gameActive) return;
    
    const position = getRandomPosition();
    circle.style.left = position.x + 'px';
    circle.style.top = position.y + 'px';
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function startCircleMovement() {
    moveCircle();
    moveInterval = setInterval(moveCircle, 2000);
}

function endGame() {
    gameActive = false;
    clearInterval(moveInterval);
    clearInterval(timerInterval);
    
    circle.style.display = 'none';
    finalScore.textContent = score;
    gameOver.classList.remove('hidden');
}

function resetGame() {
    score = 0;
    timeLeft = 30;
    gameActive = true;
    
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;
    
    circle.style.display = 'block';
    gameOver.classList.add('hidden');
    
    clearInterval(moveInterval);
    clearInterval(timerInterval);
    
    startCircleMovement();
    startTimer();
}

circle.addEventListener('click', () => {
    if (!gameActive) return;
    
    score++;
    scoreDisplay.textContent = score;
    
    moveCircle();
});

restartBtn.addEventListener('click', resetGame);

window.addEventListener('load', () => {
    startCircleMovement();
    startTimer();
});
