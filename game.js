const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const TILE = 32;

const dungeon = [
 "#...################",
 "#..........#.......#",
 "#..........#.......#",
 "#...####..###..##..#",
 "#...#..............#",
 "#...#..............#",    
 "#...####.###########",
 "#...#.......#......#",
 "#...........#......#",
 "#...#.......#......#",
 "#...###########.####",    
 "#...................",
 "#...................",
 "#...................",    
 "####################"
];

function isWall(px, py) {
  const tileX = Math.floor(px / TILE);
  const tileY = Math.floor(py / TILE);

  if (tileY < 0 || tileY >= dungeon.length) return true;
  if (tileX < 0 || tileX >= dungeon[0].length) return true;

  return dungeon[tileY][tileX] === "#";
}

function hitsWall(px, py) {
  const corners = [
    [px, py],
    [px + size - 1, py],
    [px, py + size - 1],
    [px + size - 1, py + size - 1]
  ];

  for (let [cx, cy] of corners) {
    if (isWall(cx, cy)) return true;
  }
  return false;
}



let facing = "down";

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
  let newX = x;
  let newY = y;

  if (keys["w"] || keys["ArrowUp"]) newY -= speed;
  if (keys["s"] || keys["ArrowDown"]) newY += speed;
  if (keys["a"] || keys["ArrowLeft"]) newX -= speed;
  if (keys["d"] || keys["ArrowRight"]) newX += speed;

  if (!hitsWall(newX, newY)) {
    x = newX;
    y = newY;
 
   if (keys["w"] || keys["ArrowUp"]) facing = "up";
   if (keys["s"] || keys["ArrowDown"]) facing = "down";
   if (keys["a"] || keys["ArrowLeft"]) facing = "left";
   if (keys["d"] || keys["ArrowRight"]) facing = "right";
}

  // clear screen
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

 for (let r = 0; r < dungeon.length; r++) {
  for (let c = 0; c < dungeon[r].length; c++) {
    if (dungeon[r][c] === "#") {
      ctx.fillStyle = "gray";
      ctx.fillRect(c * TILE, r * TILE, TILE, TILE);
    }
  }
}

  // draw square
ctx.fillStyle = "gold";
ctx.beginPath();

if (facing === "up") {
  ctx.moveTo(x + size / 2, y);
  ctx.lineTo(x, y + size);
  ctx.lineTo(x + size, y + size);
}
else if (facing === "down") {
  ctx.moveTo(x + size / 2, y + size);
  ctx.lineTo(x, y);
  ctx.lineTo(x + size, y);
}
else if (facing === "left") {
  ctx.moveTo(x, y + size / 2);
  ctx.lineTo(x + size, y);
  ctx.lineTo(x + size, y + size);
}
else if (facing === "right") {
  ctx.moveTo(x + size, y + size / 2);
  ctx.lineTo(x, y);
  ctx.lineTo(x, y + size);
}

ctx.closePath();
ctx.fill();

// game loop
setInterval(draw, 16);
