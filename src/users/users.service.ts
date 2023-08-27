import { Injectable } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  // これだとメモリ上にユーザー情報を保存している->DBに保存するように変更することで永続的に保存できる
  // users: createUserDto[] = [];
  constructor(private readonly prisma: PrismaService) {}

  create(user: createUserDto) {
    // this.users.push(user);
    return this.prisma.user.create({
      data: {
        ...user,
      },
    });
  }
  findAll() {
    return this.prisma.user.findMany();
  }
}
