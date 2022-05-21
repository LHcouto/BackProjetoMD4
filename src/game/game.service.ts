import { Injectable } from "@nestjs/common";
import { CreateGameDto } from "./dto/create-game.dto";
import { Game } from "./entities/game.entity";


@Injectable()
export class GameService {
   games: Game[] = [];


  findAll() {
    return 'Buscar todos jogos';
  }

create(createGameDto: CreateGameDto) {
    const game: Game = { id: 'random,_id', ...createGameDto };

    this.games.push(game);

    return game;
  }
}
