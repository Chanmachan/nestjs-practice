import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { AuthService } from './auth.service';
import { createUserDto } from "../users/dto/create-user.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  create(@Body(ValidationPipe) authUser: createUserDto) {
    return this.authService.login(authUser);
  }
}
