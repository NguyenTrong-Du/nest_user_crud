/* eslint-disable import/no-extraneous-dependencies */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import AppResponse from 'src/common/models/AppResponse';
import { CustomRequest } from 'src/common/models/CustomRequest';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}

  async use(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;
      const bearerToken =
        authHeader &&
        (authHeader.includes(' ') ? authHeader.split(' ')[1] : '');

      if (!bearerToken) throw new Error('Unauthorized');

      const { id } = this.jwtService.verify(bearerToken, { secret: 'test' });

      if (!id) throw new Error('Invalid token');

      const user = await this.userRepository.findById(id);

      if (!user) throw new Error('Invalid token');

      delete user.password;
      req.user = user;

      next();
    } catch (error) {
      throw AppResponse.authenticationFailed([error.message], 1000);
    }
  }
}
