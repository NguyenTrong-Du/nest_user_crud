// eslint-disable-next-line import/no-extraneous-dependencies
import { Response } from 'express';
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import AppResponse from 'src/models/AppResponse';
import { UserRepository } from 'src/user/user.repository';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}

  async login(loginDto: LoginDto, res: Response) {
    try {
      const { email, password } = loginDto;
      const user = await this.userRepository.findOne(email);
      if (!user) return AppResponse.badRequest(['User does not exist'], 2001);

      if (user.password !== password)
        return AppResponse.badRequest(['Password incorrect'], 2002);

      const payload = { id: user.id, email: user.email };
      const accessToken = this.jwtService.sign(payload);
      return res.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: true,
      });
    } catch (error) {
      this.logger.error(error);
      return AppResponse.internalServerError([error.message]);
    }
  }

  async signup(signupDto: SignupDto) {
    try {
      const { email } = signupDto;
      const existingUser = await this.userRepository.findOne(email);
      if (existingUser)
        return AppResponse.badRequest(['User already exist'], 2003);

      const newUser = {
        displayName: signupDto.displayName,
        email: signupDto.email,
        password: signupDto.password,
      };
      await this.userRepository.create(newUser);
      return {
        success: true,
      };
    } catch (error) {
      this.logger.error(error);
      return AppResponse.internalServerError([error.message]);
    }
  }

  logout(res: Response) {
    try {
      return res.clearCookie('access_token');
    } catch (error) {
      this.logger.error(error);
      return AppResponse.internalServerError([error.message]);
    }
  }
}
