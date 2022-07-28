import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategty } from './jwt.strategy';

@Module({
  imports:[PrismaModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
     JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions:{ expiresIn: '24h'},
  })
],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategty]
})
export class AuthModule {}
