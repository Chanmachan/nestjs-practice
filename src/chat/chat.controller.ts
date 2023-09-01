import {
  Body,
  Controller, Delete,
  Get, Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { MessageDto } from './dto/message.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  sendMessage(@Body() message: MessageDto, @Request() req: any) {
    return this.chatService.sendMessage(req, message);
  }
  @Get()
  getMessages() {
    return this.chatService.getMessages();
  }
  @UseGuards(AuthGuard('jwt'))
  @Get(':username')
  getMessagesByUsername(@Param('username') username: string) {
    return this.chatService.getMessagesByUsername(username);
  }
  // 別のユーザーのメッセージも消せてしまうのでコメントアウト
  // @UseGuards(AuthGuard('jwt'))
  // @Delete()
  // deleteLastMessage() {
  //   return this.chatService.deleteLastMessage();
  // }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':username')
  deleteMessages(@Param('username') username: string) {
    return this.chatService.deleteMessages(username);
  }
}
