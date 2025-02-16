const canvas = document.getElementById('snake-game');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let direction = 'right';
let isPaused = false;

// Draw the snake
function drawSnake() {
  ctx.fillStyle = '#00ff88';
  snake.forEach(segment => ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20));
}

// Draw the food
function drawFood() {
  ctx.fillStyle = '#ff4444';
  ctx.fillRect(food.x * 20, food.y * 20, 20, 20);
}

// Check if the snake eats the food
function checkFoodCollision(head) {
  return head.x === food.x && head.y === food.y;
}

// Spawn food at a random position
function spawnFood() {
  food.x = Math.floor(Math.random() * (canvas.width / 20));
  food.y = Math.floor(Math.random() * (canvas.height / 20));
}

// Update the game state
function update() {
  const head = { ...snake[0] };

  // Move the snake based on direction
  if (direction === 'right') head.x++;
  if (direction === 'left') head.x--;
  if (direction === 'down') head.y++;
  if (direction === 'up') head.y--;

  // Loop the snake around the screen
  if (head.x < 0) head.x = Math.floor(canvas.width / 20) - 1;
  if (head.x >= Math.floor(canvas.width / 20)) head.x = 0;
  if (head.y < 0) head.y = Math.floor(canvas.height / 20) - 1;
  if (head.y >= Math.floor(canvas.height / 20)) head.y = 0;

  // Check if the snake eats the food
  if (checkFoodCollision(head)) {
    spawnFood(); // Spawn new food
  } else {
    snake.pop(); // Remove the tail segment
  }

  // Add the new head to the snake
  snake.unshift(head);
}

// Game loop
function gameLoop() {
  if (isPaused) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawFood();
  update();
  setTimeout(gameLoop, 100);
}

// Handle keyboard input
window.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' && direction !== 'left') direction = 'right';
  if (e.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
  if (e.key === 'ArrowDown' && direction !== 'up') direction = 'down';
  if (e.key === 'ArrowUp' && direction !== 'down') direction = 'up';
});

// Pause the game on click or scroll
window.addEventListener('click', () => isPaused = true);
window.addEventListener('scroll', () => isPaused = true);

// Start the game
gameLoop();
