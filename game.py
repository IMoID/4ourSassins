print("PYTHON STARTED")

from js import document

canvas = document.getElementById("game")
ctx = canvas.getContext("2d")

ctx.fillStyle = "darkslategray"
ctx.fillRect(0, 0, canvas.width, canvas.height)

ctx.fillStyle = "gold"
ctx.fillRect(100, 100, 100, 100)

