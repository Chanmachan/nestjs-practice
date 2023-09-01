import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MessageDto } from './dto/message.dto';
import { UsersService } from '../users/users.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ChatService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}
  async sendMessage(req: any, message: MessageDto) {
    const userId = await this.usersService.getUserInfo(req.user.username);
    return this.prisma.message.create({
      data: {
        content: message.content,
        userId: userId.id,
      },
    });
  }
  async getMessages() {
    try {
      const messages = await this.prisma.message.findMany();
      // ここでメッセージがない場合は例外返したいけどうまくできなかった
      // 今はメッセージが一つもなくても空の配列が返ってくる
      if (!messages) throw new NotFoundException('No messages found');
      return messages;
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        // カラムが存在しない、またはその他のPrismaエラーの場合の処理
        throw new InternalServerErrorException('Database error');
      } else {
        // その他の未知のエラー
        throw new InternalServerErrorException('An unexpected error occurred');
      }
    }
  }
}
