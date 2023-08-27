import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  // アプリケーションが起動するときにPrismaClientのインスタンスを作成することができる
  async onModuleInit() {
    await this.$connect();
  }

  // アプリケーションが終了するときにPrismaClientのインスタンスを閉じることができる
  async onModuleDestroy() {
    await this.$disconnect();
  }
}