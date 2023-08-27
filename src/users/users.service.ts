import { Injectable } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  // これだとメモリ上にユーザー情報を保存している->DBに保存するように変更することで永続的に保存できる
  users: createUserDto[] = [];

  create(user: createUserDto) {
    this.users.push(user);
  }
  findAll() {
    return this.users;
  }
}
