import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService],
  // exportしないと、他のモジュールでUsersServiceを使用できない
  exports: [UsersService],
})
export class UsersModule {}
