import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';

@Module({
  // JwtModuleをインポートすることで、NestJSアプリケーションでJWTを使用できるようになる。
  imports: [
    // UsersModuleをインポートすることで、UsersServiceをAuthServiceで使用できるようになる。
    UsersModule,
    JwtModule.register({
      // jwtトークンを暗号化するための秘密鍵。今回は簡単にするために、'secret'という文字列を使う。
      secret: 'secret',
      signOptions: { expiresIn: '5m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
