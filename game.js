const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let speed = 4;
const keys = {};

document.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

// test object
let x = 300;
let y = 220;
const size = 32;

function draw() {
  // movement
  if (keys["w"] || keys["ArrowUp"]) y -= speed;
  if (keys["s"] || keys["ArrowDown"]) y += speed;
  if (keys["a"] || keys["ArrowLeft"]) x -= speed;
  if (keys["d"] || keys["ArrowRight"]) x += speed;

  // clear screen
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // draw square
  ctx.fillStyle = "gold";
  ctx.fillRect(x, y, size, size);
}

// game loop
setInterval(draw, 16);
