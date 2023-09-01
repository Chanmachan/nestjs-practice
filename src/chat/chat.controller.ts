import {
  Body,
  Controller,
  Get,
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
}
