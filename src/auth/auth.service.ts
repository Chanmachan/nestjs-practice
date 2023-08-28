import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly UsersService: UsersService,
  ) {}

  async validateUser({ username, password }: createUserDto) {
    // ここでfindByNameを使うためにUsersServiceをインポートする->UsersServiceはusers.module.tsでexportしている
    const user = await this.UsersService.findByName(username);
    // compareは平文のパスワードとハッシュ化されたパスワードを比較できる
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return isValidPassword;
  }

  async login(user: createUserDto) {
    // これをsignに渡すことで、ユーザー名が含まれたJWTトークンを作成できる
    if (await this.validateUser(user)) {
      const payload = { username: user.username };
      return {
        'access_token': this.jwtService.sign(payload),
      };
    }
  }
}
