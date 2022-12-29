import { Injectable, Logger } from '@nestjs/common';
import AppResponse from 'src/models/AppResponse';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.userRepository.create(createUserDto);
    } catch (error) {
      this.logger.error(error);
      return AppResponse.internalServerError([error.message]);
    }
  }

  async findAll() {
    try {
      return await this.userRepository.findAll();
    } catch (error) {
      this.logger.error(error);
      return AppResponse.internalServerError([error.message]);
    }
  }

  async findOne(id: number) {
    try {
      return await this.userRepository.findById(id);
    } catch (error) {
      this.logger.error(error);
      return AppResponse.internalServerError([error.message]);
    }
  }

  async updateOne(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.userRepository.updateOne(id, updateUserDto);
    } catch (error) {
      this.logger.error(error);
      return AppResponse.internalServerError([error.message]);
    }
  }

  async delete(id: number, isSoftDelete: boolean) {
    try {
      if (isSoftDelete) {
        return await this.userRepository.softDelete(id);
      }
      return await this.userRepository.delete(id);
    } catch (error) {
      this.logger.error(error);
      return AppResponse.internalServerError([error.message]);
    }
  }
}
