import { Module } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'test',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, UserRepository],
  exports: [AuthService],
})
export class AuthModule {}
