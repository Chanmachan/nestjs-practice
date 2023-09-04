import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat-websocket/chat.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [UsersModule, AuthModule, ChatModule],
  controllers: [AppController],
  // providersはNestJSのDIコンテナに登録することで、他のモジュールから参照できるようになる
  providers: [AppService, PrismaService],
})
export class AppModule {}
