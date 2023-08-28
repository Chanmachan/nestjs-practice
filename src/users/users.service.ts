import { Injectable, NotFoundException } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  // これだとメモリ上にユーザー情報を保存している->DBに保存するように変更することで永続的に保存できる
  // users: createUserDto[] = [];
  // DBに保存するように変更することで永続的に保存できる
  constructor(private readonly prisma: PrismaService) {}

  async create(user: createUserDto) {
    // this.users.push(user);
    return this.prisma.user.create({
      data: {
        ...user,
        // ここでパスワードをハッシュ化する
        // 第二引数のソルトは今回は10で固定
        password: await bcrypt.hash(user.password, 10),
      },
    });
  }
  findAll() {
    return this.prisma.user.findMany();
  }

  async findByName(username: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}

/*
// スプレッド演算子
const user = {
  name: 'John',
  age: 30
};

const data = {
  ...user
};

 */
