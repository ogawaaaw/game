<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invaders Game</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        canvas {
            border: 2px solid black;
        }
    </style>
</head>
<body>
    <canvas id="gameCanvas" width="800" height="600"></canvas>
    <script>
        const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");

        const player = {
            x: canvas.width / 2,
            y: canvas.height - 30,
            width: 50,
            height: 10,
            speed: 5,
        };

        const invaders = [];
        const invaderWidth = 30;
        const invaderHeight = 30;
        const invaderSpeed = 2;
        const invaderRowCount = 5;
        const invaderColumnCount = 8;

        for (let c = 0; c < invaderColumnCount; c++) {
            invaders[c] = [];
            for (let r = 0; r < invaderRowCount; r++) {
                invaders[c][r] = { x: 0, y: 0, status: 1 };
            }
        }

        document.addEventListener("keydown", movePlayer);

        function movePlayer(event) {
            if (event.key === "ArrowLeft" && player.x > 0) {
                player.x -= player.speed;
            }
            if (event.key === "ArrowRight" && player.x + player.width < canvas.width) {
                player.x += player.speed;
            }
        }

        function drawPlayer() {
            ctx.beginPath();
            ctx.rect(player.x, player.y, player.width, player.height);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }

        function drawInvaders() {
            for (let c = 0; c < invaderColumnCount; c++) {
                for (let r = 0; r < invaderRowCount; r++) {
                    if (invaders[c][r].status === 1) {
                        const invaderX = c * (invaderWidth + 10) + 30;
                        const invaderY = r * (invaderHeight + 10) + 30;
                        invaders[c][r].x = invaderX;
                        invaders[c][r].y = invaderY;
                        ctx.beginPath();
                        ctx.rect(invaderX, invaderY, invaderWidth, invaderHeight);
                        ctx.fillStyle = "#0095DD";
                        ctx.fill();
                        ctx.closePath();
                    }
                }
            }
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawPlayer();
            drawInvaders();
            requestAnimationFrame(draw);
        }

        draw();
    </script>
</body>
</html>
