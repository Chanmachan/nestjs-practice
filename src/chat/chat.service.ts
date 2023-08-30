import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MessageDto } from './dto/message.dto';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async sendMessage(id: number, message: MessageDto) {
    return this.prisma.message.create({
      data: message,
    });
  }
  async getAllMessages() {
    return this.prisma.message.findMany({
      orderBy: {
        // 作成日時の降順で取得する
        createdAt: 'desc',
      },
    });
  }
  async getMessageById(id: number) {
    return this.prisma.message.findUnique({
      where: {
        id,
      },
    });
  }
  async deleteMessage(id: number) {
    return this.prisma.message.delete({
      where: {
        id,
      },
    });
  }
  async updateMessage(id: number, message: MessageDto) {
    return this.prisma.message.update({
      where: {
        id,
      },
      data: message,
    });
  }
}
