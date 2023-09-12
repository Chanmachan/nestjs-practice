import { Injectable } from '@nestjs/common';
import { GameStateDto } from './dto/game-state.dto';
import { Ball, Paddle } from './interfaces/object.interface';

@Injectable()
export class PongService {
  getPongData() {
    return { message: 'Pong data' };
  }

  createInitialGameState() {
    // TODO: 後でcanvasのサイズを動的に取得するようにする
    const canvasWidth = 480;
    const canvasHeight = 320;
    return {
      // <canvas id="myCanvas" width="480" height="320"></canvas>
      ball: {
        x: canvasWidth / 2,
        y: canvasHeight / 2,
        dx: 2,
        dy: 2,
        Radius: 10,
      } as Ball,
      paddle1: {
        x: (canvasWidth - 75) / 2,
        y: canvasHeight - 10,
        Height: 10,
        Width: 480,
      } as Paddle,
      paddle2: {
        x: (canvasWidth - 75) / 2,
        y: 0,
        Height: 10,
        Width: 480,
      } as Paddle,
    };
  }

  nextGameState(gameState: GameStateDto, data: GameStateDto
    // TODO: あとで実装
    return gameState;
  }
}
