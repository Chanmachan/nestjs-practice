import { Get, Body, Controller, Post } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Post()
  create(@Body() createUser: createUserDto) {
    return this.usersService.create(createUser);
  }
}
