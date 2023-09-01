// controllerは送られたリクエストを受け取り、serviceに処理を委譲する
import {
  Get,
  Body,
  Request,
  Controller,
  Post,
  ValidationPipe,
  Param,
  UseGuards, Delete,
} from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Get(':username')
  // 今回はjwtを使って認証するので、@UseGuards(AuthGuard('jwt'))を使う
  // リクエストがくるたびに、jwtの認証を行う
  @UseGuards(AuthGuard('jwt'))
  findByName(@Param('username') username: string, @Request() req: any) {
    return req.user;
    /*
    "iat"はトークンが発行された時間を表す
    "exp"はトークンが有効期限切れになる時間を表す
     */
  }

  @Post()
  // createUserDtoの型をValidationPipeで検証する
  // createUserDto内の@IsString()などのデコレーターで検証する
  create(@Body(ValidationPipe) createUser: createUserDto) {
    return this.usersService.create(createUser);
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete(':username')
  delete(@Param('username') username: string) {
    return this.usersService.delete(username);
  }
}
