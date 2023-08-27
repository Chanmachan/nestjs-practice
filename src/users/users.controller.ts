import { Get, Body, Controller, Post, ValidationPipe } from "@nestjs/common";
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
  // createUserDtoの型をValidationPipeで検証する
  // createUserDto内の@IsString()などのデコレーターで検証する
  create(@Body(ValidationPipe) createUser: createUserDto) {
    return this.usersService.create(createUser);
  }
}
