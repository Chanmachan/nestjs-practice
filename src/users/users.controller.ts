import { Body, Controller, Post } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  @Post()
  create(@Body() createUser: createUserDto) {
    return createUser;
  }
}
