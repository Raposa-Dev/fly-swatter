const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let squareSize;
let score = 0;
let isGameRunning = false;
let gameInterval;
let squares = [];

const squareImage = new Image();
squareImage.src = './images/fly.png';

const backgroundImage = new Image();
backgroundImage.src = './images/table.png';
const killSound = new Audio('./audios/hard-slap.mp3');
const appearSound = new Audio('./audios/flay.mp3');

function playKillSound() {
    killSound.currentTime = 0;
    killSound.play();
    stopAppearSound();
}

function stopAppearSound() {
    appearSound.pause();  // Para o som
    appearSound.currentTime = 0;  // Reinicia o som
}

function playAppearSound() {
    appearSound.play();
}

function initGame() {
    setupCanvas();
    setupTouchHandler(); // Usaremos eventos de toque no celular
    setupStartPauseButton();

    backgroundImage.onload = () => drawSquares();
    squareImage.onload = () => drawSquares();
}

function setupCanvas() {
    canvas.width = window.innerWidth * 0.9; // 90% da largura da tela
    canvas.height = window.innerHeight * 0.7; // 70% da altura da tela

    squareSize = Math.min(canvas.width, canvas.height) * 0.1; // 10% do menor valor entre largura e altura
}

function drawSquares() {
    clearCanvas();
    drawBackground();
    squares.forEach(square => {
        ctx.drawImage(squareImage, square.x, square.y, squareSize, squareSize);
    });
    drawScore();
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
    playAppearSound(); // Toca o som da mosca quando ela aparece
    drawSquares();
}

function setupTouchHandler() {
    canvas.addEventListener('touchstart', handleCanvasTouch);
}

function handleCanvasTouch(event) {
    const touch = event.touches[0]; // Pega o primeiro toque
    const { clientX, clientY } = touch;
    const { left, top } = canvas.getBoundingClientRect();
    const touchX = clientX - left;
    const touchY = clientY - top;

    squares = squares.filter(square => {
        if (isSquareClicked(square, touchX, touchY)) {
            updateScore();
            return false;
        }
        return true;
    });
    playKillSound();
    drawSquares();
}

function isSquareClicked(square, touchX, touchY) {
    return (
        touchX >= square.x &&
        touchX <= square.x + squareSize &&
        touchY >= square.y &&
        touchY <= square.y + squareSize
    );
}

function updateScore() {
    score++;
    drawSquares(); // Redesenha as moscas e a pontuação no canvas
}

function drawScore() {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'red'; // Cor da pontuação
    ctx.fillText(`Pontuação: ${score}`, 10, 30); // Desenha a pontuação no canto superior esquerdo
}

function setupStartPauseButton() {
    const button = document.getElementById('startPauseButton');
    button.addEventListener('click', toggleGame);
    stopAppearSound();
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
    playAppearSound(); // Começa a tocar o som de aparecimento
    updateButtonLabel();
}

function pauseGame() {
    isGameRunning = false;
    clearInterval(gameInterval);
    stopAppearSound(); // Para o som ao pausar o jogo
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
    clearCanvas();
    drawSquares(); // Redesenha a tela com a pontuação zerada
}

function updateButtonLabel() {
    const button = document.getElementById('startPauseButton');
    button.textContent = isGameRunning ? 'Pausar Jogo' : 'Iniciar Jogo';
}

window.addEventListener('resize', setupCanvas); // Redimensiona o canvas quando a tela é redimensionada

initGame();
