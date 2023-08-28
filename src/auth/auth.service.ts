import { Injectable } from '@nestjs/common';
import { createUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly UsersService: UsersService,
  ) {}

  async validateUser({ username, password }: createUserDto) {
    // ここでfindByNameを使うためにUsersServiceをインポートする->UsersServiceはusers.module.tsでexportしている
    const user = await this.UsersService.findByName(username);
    return true;

  }

  async login(user: createUserDto) {
    // これをsignに渡すことで、ユーザー名が含まれたJWTトークンを作成できる
    const payload = { username: user.username };
    return {
      'access_token': this.jwtService.sign(payload),
    };
  }
}
