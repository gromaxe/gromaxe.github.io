const canvas = document.getElementById('snake-game');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let direction = 'right';
let isPaused = false;

function drawSnake() {
  ctx.fillStyle = '#00ff88';
  snake.forEach(segment => ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20));
}

function drawFood() {
  ctx.fillStyle = '#ff4444';
  ctx.fillRect(food.x * 20, food.y * 20, 20, 20);
}

function checkCollision(head) {
  if (head.x < 0 || head.x >= canvas.width / 20 || head.y < 0 || head.y >= canvas.height / 20) return true;
  for (let segment of snake.slice(1)) {
    if (segment.x === head.x && segment.y === head.y) return true;
  }
  return false;
}

function gameOver() {
  ctx.fillStyle = '#fff';
  ctx.font = '30px Poppins';
  ctx.textAlign = 'center';
  ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2);
}

function update() {
  const head = { ...snake[0] };
  if (direction === 'right') head.x++;
  if (direction === 'left') head.x--;
  if (direction === 'down') head.y++;
  if (direction === 'up') head.y--;
  if (checkCollision(head)) {
    gameOver();
    return;
  }
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    food.x = Math.floor(Math.random() * (canvas.width / 20));
    food.y = Math.floor(Math.random() * (canvas.height / 20));
  } else {
    snake.pop();
  }
}

function gameLoop() {
  if (isPaused) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawFood();
  update();
  setTimeout(gameLoop, 100);
}

window.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') direction = 'right';
  if (e.key === 'ArrowLeft') direction = 'left';
  if (e.key === 'ArrowDown') direction = 'down';
  if (e.key === 'ArrowUp') direction = 'up';
});

window.addEventListener('click', () => isPaused = true);
window.addEventListener('scroll', () => isPaused = true);

gameLoop();
