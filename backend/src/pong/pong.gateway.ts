import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PongService } from './pong.service';
import { GameStateDto } from './dto/game-state.dto';

@WebSocketGateway()
export class PongGateway {
  @WebSocketServer()
  server: Server;

  private gameState;

  constructor(private readonly pongService: PongService) {
    // ゲームの状態を初期化する
    this.gameState = this.pongService.createInitialGameState();
  }

  @SubscribeMessage('movePaddle')
  handleMovePaddle(client: any, data: GameStateDto) {
    this.gameState = this.pongService.nextGameState(this.gameState, data);
    this.server.emit('gameState', this.gameState);
  }
  @SubscribeMessage('moveBall')
  handleMoveBall(client: any, data: GameStateDto) {
    this.gameState = this.pongService.nextGameState(this.gameState, data);
    this.server.emit('gameState', this.gameState);
  }
}
