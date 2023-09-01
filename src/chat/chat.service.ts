import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MessageDto } from './dto/message.dto';
import { UsersService } from '../users/users.service';

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
    const messages = this.prisma.message.findMany();
    if (!messages) throw new NotFoundException();
    return messages;
  }
}
