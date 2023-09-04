import { Body, Controller, Get, Post, Request, Response } from '@nestjs/common';
import { ChatService } from './chat.service';
import { MessageDto } from '../chat-websocket/dto/message.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @Post()
  sendMessage(@Body() message: MessageDto, @Request() req: any) {
    return this.chatService.sendMessage(message, req);
  }
  @Get()
  async sse(@Request() req: any, @Response() res: any) {
    // ここでヘッダーを設定する
    // event-streamを指定することでsseプロトコルを使用することを伝える
    res.setHeader('Content-Type', 'text/event-stream');
    // 途中でキャッシュされて誤作動を起こさないように->よくわからない
    res.setHeader('Cache-Control', 'no-cache');
    // 接続が切れないように
    res.setHeader('Connection', 'keep-alive');

    // messageUpdatesをsubscribeすると、nextメソッドが呼ばれるたびにres.write が呼ばれるようになる
    const messageSubscription = this.chatService.messageUpdates.subscribe(
      (message) => {
        res.write(`data: ${JSON.stringify(message)}\n\n`);
      },
    );
    res.on('close', () => {
      // subscribeを解除する
      messageSubscription.unsubscribe();
    });
  }
}

/*
@Get('sse')
  async sse(@Request() req, @Response() res) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const messageSubscription = this.chatService.messageUpdates.subscribe(
      (message) => {
        res.write(`data: ${JSON.stringify(message)}\n\n`);
      },
    );

    res.on('close', () => {
      messageSubscription.unsubscribe();
    });
  }
 */
