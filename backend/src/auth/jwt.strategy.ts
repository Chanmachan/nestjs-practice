import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
// interfaceはimportするだけで使える
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
// PassportStrategyを継承することで、NestJSアプリケーションでPassportを使用できるようになる。
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // super()を呼び出すことで、PassportStrategyクラスのコンストラクターを呼び出す。
    super({
      // Authorizationヘッダーに含まれるBearerをつけてトークンを送る
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret',
    });
  }
  async validate(payload: JwtPayload) {
    // ここでfindByNameを使うためにUsersServiceをインポートする->UsersServiceはusers.module.tsでexportしている
    return payload;
  }
}
