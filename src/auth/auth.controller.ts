import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { LoggedUser } from './logged-user.decorator';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Realizar login com token de AUTH.'
  })
  login(@Body()loginDto: LoginDto): Promise<LoginResponseDto>{
    return this.authService.login(loginDto)
  }
  @Get()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'retorna usuário autenticado no momento'
  })
  @ApiBearerAuth()
  profile(@LoggedUser() user: User){
    return user;
  }
}
