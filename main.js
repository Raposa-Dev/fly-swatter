const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const squareSize = 50;
let score = 0;
let isGameRunning = false;
let gameInterval;
let squares = []; 


const squareImage = new Image();
squareImage.src = './images/fly.png'; 

const backgroundImage = new Image();
backgroundImage.src = './images/table.png'; 

function initGame() {
    setupCanvas();
    setupClickHandler();
    setupStartPauseButton();

    backgroundImage.onload = () => drawSquares();
    squareImage.onload = () => drawSquares();
}


function setupCanvas() {
    canvas.width = 500;
    canvas.height = 500;
}


function drawSquares() {
    clearCanvas();
    drawBackground(); 
    squares.forEach(square => {
        ctx.drawImage(squareImage, square.x, square.y, squareSize, squareSize);
    });
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawBackground() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}

function createNewSquare() {
    if (squares.length >= 3) {
        endGame();
        return;
    }
    const squareX = Math.random() * (canvas.width - squareSize);
    const squareY = Math.random() * (canvas.height - squareSize);
    squares.push({ x: squareX, y: squareY });
    drawSquares();
}

function setupClickHandler() {
    canvas.addEventListener('click', handleCanvasClick);
}

function handleCanvasClick(event) {
    const { clientX, clientY } = event;
    const { left, top } = canvas.getBoundingClientRect();
    const clickX = clientX - left;
    const clickY = clientY - top;

    squares = squares.filter(square => {
        if (isSquareClicked(square, clickX, clickY)) {
            updateScore();
            return false; 
        }
        return true;
    });

    drawSquares();
}

function isSquareClicked(square, clickX, clickY) {
    return (
        clickX >= square.x &&
        clickX <= square.x + squareSize &&
        clickY >= square.y &&
        clickY <= square.y + squareSize
    );
}

function updateScore() {
    score++;
    document.getElementById('score').textContent = `Pontuação: ${score}`;
}

function setupStartPauseButton() {
    const button = document.getElementById('startPauseButton');
    button.addEventListener('click', toggleGame);
}

function toggleGame() {
    if (isGameRunning) {
        pauseGame();
    } else {
        startGame();
    }
}

function startGame() {
    isGameRunning = true;
    gameInterval = setInterval(createNewSquare, 2000);
    updateButtonLabel();
}


function pauseGame() {
    isGameRunning = false;
    clearInterval(gameInterval);
    updateButtonLabel();
}

function endGame() {
    pauseGame();
    alert('Fim de jogo! Você alcançou 3 quadrados na tela.');
    resetGame();
}

function resetGame() {
    score = 0;
    squares = [];
    document.getElementById('score').textContent = `Pontuação: 0`;
    clearCanvas();
}

function updateButtonLabel() {
    const button = document.getElementById('startPauseButton');
    button.textContent = isGameRunning ? 'Pausar Jogo' : 'Iniciar Jogo';
}

initGame();