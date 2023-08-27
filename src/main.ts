import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // NestFactory.create()はNestアプリケーションのインスタンスを作成する
  const app = await NestFactory.create(AppModule);
  // app.listen()はHTTPサーバーを起動する
  await app.listen(3000);
}
bootstrap();
