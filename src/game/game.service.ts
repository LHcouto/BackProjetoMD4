import { Injectable } from "@nestjs/common";
import { CreateGameDto } from "./dto/create-game.dto";


@Injectable()
export class GameService {
  findAll() {
    return 'Buscar todos jogos';
  }

create(createGameDto: CreateGameDto) {
    return 'Criar um Jogo: ' + JSON.stringify(createGameDto);
  }
}
