import { Injectable } from '@nestjs/common';
import { MessageDto } from './dto/message.dto';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import { Subject } from 'rxjs';

@Injectable()
export class ChatService {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
  ) {}
  // 複数のObserverをまとめたものがSubject
  messageUpdates = new Subject<MessageDto>();
  async sendMessage(message: MessageDto, req: any) {
    const userId = await this.usersService.getUserInfo(req.user.username);
    const saveMessage = await this.prisma.message.create({
      data: {
        content: message.content,
        userId: userId.id,
      },
    });
    // ここでメッセージを送信する
    // sendMessageが呼ばれるたびにSubjectのnextメソッドを呼び出す
    this.messageUpdates.next(saveMessage);
    return saveMessage;
  }
}
