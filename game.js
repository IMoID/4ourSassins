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
}

  // clear screen
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // draw square
  ctx.fillStyle = "gold";
  ctx.fillRect(x, y, size, size);
}

// game loop
setInterval(draw, 16);
