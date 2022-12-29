import { Module } from '@nestjs/common';
import { UserExists } from 'src/validators/user.validator';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, UserExists],
})
export class UserModule {}
