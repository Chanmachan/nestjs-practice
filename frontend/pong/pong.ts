// Socket.IOを用いる
import io from 'socket.io-client';

// サーバとの接続
const socket = io('http://localhost:3000');

// サーバへの接続が完了したとき
socket.on('connect', () => {
  console.log('Connected to the server');
});

let ball;
let paddle1;
let paddle2;
// サーバからゲーム状態を取得
socket.on('gameState', (gameState) => {
  ball = gameState.ball;
  paddle1 = gameState.paddle1;
  paddle2 = gameState.paddle2;
  // ここでゲーム状態に基づいて描画などを行う
  console.log('Received game state:', gameState);
});

// パドル移動などの操作をサーバに送る
// function movePaddle(/* ここに必要なパラメータ */) {
//   const data = { /* パドルの新しい状態など */ };
//   socket.emit('movePaddle', data);
// }

// 以下、ゲームの描画や操作に必要なコード

const canvas = document.getElementById('pongCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
let state = 1;

document.addEventListener('mousemove', (e) => {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    const data = { x: relativeX };
    socket.emit('movePaddle', data);
  }
});

function drawBall(obj) {
  ctx.beginPath();
  ctx.arc(obj.x, obj.y, obj.Radius, 0, Math.PI*2);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

function drawPaddle(obj) {
  ctx.beginPath();
  ctx.rect(obj.x, obj.y, obj.Width, obj.Height);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

function collisionDetection() {
  // この関数をpaddleに当たったかを判定する関数に修正する
  // canvasの上半分かした半分かで処理を分岐する
  if (ball.y - ball.Radius < paddle2.Height) {
    // paddle2の幅の範囲内にballがあるかを確認する
    if (ball.x > paddle2.x && ball.x < paddle2.x + paddle2.Width) {
      ball.dy = -ball.dy;
    } else {
      state = 0;
    }
  } else if (ball.y + ball.Radius > canvas.height - paddle1.Height) {
    if (ball.x > paddle1.x && ball.x < paddle1.x + paddle1.Width) {
      ball.dy = -ball.dy;
    } else {
      state = 0;
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall(ball);
  drawPaddle(paddle1);
  drawPaddle(paddle2);
  if (state === 1) {
    collisionDetection();
  }
  if (
    ball.x + ball.dx > canvas.width - ball.Radius ||
    ball.x + ball.dx < ball.Radius
  ) {
    ball.dx = -ball.dx;
  }
  if (ball.y > canvas.height - ball.Radius || ball.y < ball.Radius) {
    alert('GAME OVER');
    // document.location.reload();
    clearInterval(interval);
  }
  ball.x += ball.dx;
  ball.y += ball.dy;
}
