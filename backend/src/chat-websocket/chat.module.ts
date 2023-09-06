import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { PrismaService } from '../prisma/prisma.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  // gatewayをprovidersに追加する
  providers: [ChatService, ChatGateway, PrismaService],
  controllers: [ChatController],
})
export class ChatModule {}
