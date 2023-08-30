import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';

@Module({
  // gatewayをprovidersに追加する
  providers: [ChatService, ChatGateway],
  controllers: [ChatController],
})
export class ChatModule {}
