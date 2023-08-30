import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
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
  @Get()
  getAllMessages() {
    return this.chatService.getAllMessages();
  }
  @Get(':id')
  getMessageById(@Param('id') id: number) {
    return this.chatService.getMessageById(id);
  }
  @Delete(':id')
  deleteMessage(@Param('id') id: number) {
    return this.chatService.deleteMessage(id);
  }
  // 安全のため認証から得たuserオブジェクトを取得し、渡す
  @UseGuards(AuthGuard('jwt'))
  @Post()
  sendMessage(@Request() req, @Body() payload: MessageDto) {
    const userId = req.user.id;
    return this.chatService.sendMessage(userId, payload);
  }
  @Patch()
  updateMessage(@Param('id') id: number, @Body() payload: MessageDto) {
    return this.chatService.updateMessage(id, payload);
  }
}
