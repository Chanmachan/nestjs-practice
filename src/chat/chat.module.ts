import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { UsersModule } from '../users/users.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [UsersModule],
  controllers: [ChatController],
  providers: [ChatService, PrismaService],
})
export class ChatModule {}
