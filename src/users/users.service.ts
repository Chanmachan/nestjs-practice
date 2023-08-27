import { Injectable } from '@nestjs/common';
import { createUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  users: createUserDto[] = [];

  create(user: createUserDto) {
    this.users.push(user);
  }
  findAll() {
    return this.users;
  }
}
