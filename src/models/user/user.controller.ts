import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import AppResponse from 'src/common/models/AppResponse';
import { CreateUserDto } from './dto/create-user.dto';
import { UserQueries } from './dto/user-query.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { UserParams } from './dto/user-param.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<AppResponse<User>> {
    const user: User = await this.userService.create(createUserDto);
    return AppResponse.ok<User>(user);
  }

  @Get()
  async findAll(): Promise<AppResponse<User[]>> {
    const users: User[] = await this.userService.findAll();
    return AppResponse.ok<User[]>(users);
  }

  @Get(':id')
  async findOne(@Param() { id }: UserParams): Promise<AppResponse<User>> {
    const user: User = await this.userService.findOne(id);
    return AppResponse.ok<User>(user);
  }

  @Patch(':id')
  async update(
    @Param() { id }: UserParams,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<AppResponse<User>> {
    const user: User = await this.userService.updateOne(id, updateUserDto);
    return AppResponse.ok<User>(user);
  }

  @Delete(':id')
  async delete(
    @Param() { id }: UserParams,
    @Query() { isSoftDelete }: UserQueries,
  ): Promise<AppResponse<User>> {
    const user: User = await this.userService.delete(id, isSoftDelete);
    return AppResponse.ok<User>(user);
  }
}
