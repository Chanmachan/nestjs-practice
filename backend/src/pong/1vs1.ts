// game.ts

interface Ball {
  x: number;
  y: number;
  dx: number;
  dy: number;
  Radius: number;
}

interface Paddle {
  x: number;
  y: number;
  Height: number;
  Width: number;
}

const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
let state = 1;

const ball: Ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  dx: 2,
  dy: 2,
  Radius: 10,
};

const paddle1: Paddle = {
  x: (canvas.width - 75) / 2,
  y: canvas.height - 10,
  Height: 10,
  Width: 480,
};

const paddle2: Paddle = {
  x: (canvas.width - 75) / 2,
  y: 0,
  Height: 10,
  Width: 480,
};

function mouseMoveHandler(e) {
  // relativeXはマウスの相対的な位置->特定の要素内でのカーソルの位置
  // e.clientXはマウスの絶対的な位置->Webページの左端からカーソルまで
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddle1.x = relativeX - paddle1.Width / 2;
    paddle2.x = relativeX - paddle2.Width / 2;
  }
}

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

// document.addEventListener("keydown", keyDownHandler, false);
// document.addEventListener("keyup", keyUpHandler, false);
// マウスの動きを検知する
document.addEventListener('mousemove', mouseMoveHandler, false);
const interval = setInterval(draw, 10);
