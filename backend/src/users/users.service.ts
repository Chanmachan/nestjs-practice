import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { Prisma } from '@prisma/client';

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

  async delete(username: string) {
    try {
      await this.prisma.user.delete({
        where: {
          username,
        },
      });
      return 'Deleted';
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        // 2015 -> "A related record could not be found. {details}"
        // 2025 -> "An operation failed because it depends on one or more records that were required but not found. {cause}"
        e.code === 'P2025'
      ) {
        throw new NotFoundException('User not found');
      } else {
        throw new InternalServerErrorException('Something went wrong');
      }
    }
  }
  // chat.service.tsで使う
  // usernameからidを取得する
  async getUserInfo(username: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        username: true,
        id: true,
        messages: true,
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
