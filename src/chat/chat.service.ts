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
  async getMessagesByUsername(username: string) {
    const user = await this.usersService.getUserInfo(username);
    const messages = await this.prisma.message.findMany({
      where: {
        userId: user.id,
      },
    });
    if (!messages) throw new NotFoundException('No messages found');
    return messages;
  }

  // async deleteLastMessage() {
  //   try {
  //     const lastMessage = await this.prisma.message.findFirst({
  //       orderBy: {
  //         createdAt: 'desc',
  //       },
  //     });
  //     if (!lastMessage) throw new NotFoundException('No messages found');
  //     const deleteResult = await this.prisma.message.delete({
  //       where: {
  //         messageId: lastMessage.messageId,
  //       },
  //     });
  //     if (!deleteResult) throw new NotFoundException('No messages found');
  //     return 'Last message deleted';
  //   } catch (e) {
  //     if (e instanceof NotFoundException) {
  //       throw new NotFoundException('No messages found');
  //     } else {
  //       throw new InternalServerErrorException(
  //         'An error occurred while deleting messages',
  //       );
  //     }
  //   }
  // }
  async deleteMessages(username: string) {
    try {
      const user = await this.usersService.getUserInfo(username);
      if (!user) throw new NotFoundException('User not found');
      const deleteResult = await this.prisma.message.deleteMany({
        where: {
          userId: user.id,
        },
      });
      if (deleteResult.count === 0) {
        return 'No messages to delete';
      }
      return 'All of your messages are deleted';
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw new NotFoundException('User not found');
      } else {
        throw new InternalServerErrorException(
          'An error occurred while deleting messages',
        );
      }
    }
  }
}
