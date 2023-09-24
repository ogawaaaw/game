const canvas = document.getElementById('gameCanvas');
   const ctx = canvas.getContext('2d');
    const controls = document.getElementById('controls');
    const moveLeftButton = document.getElementById('moveLeftButton');
    const moveRightButton = document.getElementById('moveRightButton');
    const shootButton = document.getElementById('shootButton');

    const keys = {};

    document.addEventListener('keydown', (e) => {
      keys[e.code] = true;
    });

    document.addEventListener('keyup', (e) => {
      keys[e.code] = false;
    });

    let player = {
      x: canvas.width / 2,
      y: canvas.height - 70,
      size: 90,
      speed: 4,
      bullets: []
    };

    let enemies = [];
    let enemySpawnCounter = 0;
    let score = 0;
    let bossSpawned = false; // ボスの出現フラグ

    function drawPlayer() {
      // キャラクター画像を読み込む
      const playerImage = new Image();
      playerImage.src = "/Users/shokupanman/Downloads/rdesign_2925a-removebg-preview.png";

      // キャラクター画像を描画
      ctx.drawImage(playerImage, player.x, player.y, player.size, player.size);
    }

    function drawEnemies() {
      for (const enemy of enemies) {
        if (enemy.isBoss) {
          // ボスの画像を読み込む
          const bossImage = new Image();
          bossImage.src = "/Users/shokupanman/Downloads/rdesign_2972.png"; // ボスの画像のURLを指定してください

          // ボスの画像を描画
          ctx.drawImage(bossImage, enemy.x, enemy.y, enemy.size, enemy.size);
        } else {
          // 敵の画像を読み込む
          const enemyImage = new Image();
          enemyImage.src = "/Users/shokupanman/Downloads/kohacu.com_samune_002473.png"; // 敵の画像のURLを指定してください

          // 敵の画像を描画
          ctx.drawImage(enemyImage, enemy.x, enemy.y, enemy.size, enemy.size);
        }
      }
    }

    function drawBullets() {
      ctx.fillStyle = 'blue';
      for (const bullet of player.bullets) {
        ctx.fillRect(bullet.x, bullet.y, bullet.size * 1, bullet.size * 4);
      }

      ctx.fillStyle = 'yellow';
      for (const enemy of enemies) {
        for (const bullet of enemy.bullets) {
          ctx.fillRect(bullet.x, bullet.y, bullet.size, bullet.size * 2);
        }
      }
    }

    function update() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawPlayer();
      drawEnemies();
      drawBullets();

      if (keys['ArrowLeft']) {
        player.x -= player.speed;
      }
      if (keys['ArrowRight']) {
        player.x += player.speed;
      }
      if (keys['ArrowUp']) {
        player.y -= player.speed;
      }
      if (keys['ArrowDown']) {
        player.y += player.speed;
      }

      for (const bullet of player.bullets) {
        bullet.y -= bullet.speed;
      }
      player.bullets = player.bullets.filter(bullet => bullet.y > 0);

      for (const enemy of enemies) {
        for (const bullet of enemy.bullets) {
          bullet.y += bullet.speed;
        }

        enemy.bullets = enemy.bullets.filter(bullet => bullet.y < canvas.height);

        if (Math.random() < 0.01) {
          enemyShoot(enemy);
        }

        if (enemy.direction === 'straight') {
          enemy.y += enemy.speed;
        } else if (enemy.direction === 'diagonal-left') {
          enemy.x -= enemy.speed / 2;
          enemy.y += enemy.speed;
        } else if (enemy.direction === 'diagonal-right') {
          enemy.x += enemy.speed / 2;
          enemy.y += enemy.speed;
        }
      }

      enemies = enemies.filter(enemy => enemy.y < canvas.height);

      // 衝突判定
      for (const bullet of player.bullets) {
        for (const enemy of enemies) {
          if (
            bullet.x < enemy.x + enemy.size &&
            bullet.x + bullet.size > enemy.x &&
            bullet.y < enemy.y + enemy.size &&
            bullet.y + bullet.size > enemy.y
          ) {
            bullet.toRemove = true;
            enemy.toRemove = true;
            score += 10;
          }
        }
      }

      for (const enemy of enemies) {
        for (const enemyBullet of enemy.bullets) {
          if (
            player.x < enemyBullet.x + enemyBullet.size &&
            player.x + player.size > enemyBullet.x &&
            player.y < enemyBullet.y + enemyBullet.size &&
            player.y + player.size > enemyBullet.y
          ) {
            gameOver();
            return;
          }
        }
      }

      player.bullets = player.bullets.filter((bullet) => !bullet.toRemove);
      enemies = enemies.filter((enemy) => !enemy.toRemove);

      enemySpawnCounter++;
      if (enemySpawnCounter >= 40) {
        createEnemy();
        enemySpawnCounter = 0;
      }

      // スコア表示を追加（画面左上に表示）
      ctx.fillStyle = "white";
      ctx.font = "16px Arial";
      ctx.fillText("Score: " + score, 10, 20);

      requestAnimationFrame(update);
    }

    function createEnemy() {
      if (bossSpawned) {
        return; // ボスが既に出現している場合は敵を生成しない
      }
      const direction = getRandomEnemyDirection(); // ランダムな方向を設定する
      const enemy = {
        x: Math.random() * (canvas.width - 20),
        y: 10,
        size: 70, // 大きさを修正
        speed: Math.random() * (4 - 1) + 2, // 速度をランダムに設定
        bullets: [],
        direction: direction // directionプロパティを追加
      };
      enemies.push(enemy);

      // スコア200でボスを生成
      if (score >= 200) {
        const boss = {
          x: canvas.width / 2 - 50, // ボスの初期位置を設定
          y: 10,
          size: 150, // ボスのサイズを設定
          speed: 1, // ボスの速度を設定
          bullets: [],
          direction: 'straight', // ボスの移動方向を設定
          isBoss: true // ボスフラグを追加
        };
        enemies.push(boss);
        bossSpawned = true; // ボス出現フラグを更新
        return; // ボスが既に出現している場合は敵を生成しない
      }
    }

    function enemyShoot(enemy) {
      enemy.bullets.push({
        x: enemy.x + enemy.size / 2 - 2,
        y: enemy.y + enemy.size,
        size: 4,
        speed: 4
      });
    }

    function gameOver() {
      ctx.fillStyle = "white";
      ctx.font = "32px Arial";
      ctx.fillText("Game Over", canvas.width / 2 - 80, canvas.height / 2);
      ctx.font = "16px Arial";
      ctx.fillText("Score: " + score, canvas.width / 2 - 30, canvas.height / 2 + 30);

      player = null;
      enemies = [];
      bossSpawned = false; // ゲームオーバー時にボスの出現フラグをリセット
    }

    canvas.addEventListener('click', (e) => {
      if (!player) {
        resetGame();
      } else {
        player.bullets.push({
          x: player.x + player.size / 2 - 2,
          y: player.y - 10,
          size: 4,
          speed: 6
        });
      }
    });

    function resetGame() {
      player = {
        x: canvas.width / 2,
        y: canvas.height - 60,
        size: 70,
        speed: 4,
        bullets: []
      };

      enemies = [];
      enemySpawnCounter = 0;
      score = 0;

      update();
    }

    function getRandomEnemyDirection() {
      const directions = ['straight', 'diagonal-left', 'diagonal-right'];
      const randomIndex = Math.floor(Math.random() * directions.length);
      return directions[randomIndex];
    }

    update();
