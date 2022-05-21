import { Controller, Get, Post } from '@nestjs/common';

@Controller('game')
export class GameController {
  @Get()
  findAll() {
    return 'Buscar todos os jogos';
  }

  @Post()
  create() {
    return 'Criar um jogo';
  }
}
