import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessageDto } from './dto/message.dto';

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  // サーバーのインスタンスを保持する
  // これによってサーバーのインスタンスへのアクセスが可能になる
  server: Server;
  // ハンドラーの実装
  afterInit(server: Server) {
    this.server = server;
    console.log('initialized');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleConnection(client: any, ...args: any[]) {
    console.log('connected ' + client.id);
  }
  handleDisconnect(client: any) {
    console.log('disconnected' + client.id);
  }
  @SubscribeMessage('msgToServer')
  handleMessage(client: any, payload: MessageDto): void {
    this.server.emit('msgToClient', payload);
  }
}
