import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepository } from 'src/models/user/user.repository';

@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class UserExists implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}

  async validate(id: number) {
    try {
      const user = await this.userRepository.findOne(id);
      return !!user;
    } catch (error) {
      return false;
    }
  }

  defaultMessage() {
    return `User doesn't exist`;
  }
}
