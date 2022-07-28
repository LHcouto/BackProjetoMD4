import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HomepageService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(id: string) {
    const profileData = await this.prisma.profile.findUnique({
      where: {
        id: id,
      },
      select: {
        title: true,
        imageUrl: true,
        game: {
          include: {
            genre: true,
          },
        },
        favoritos:{
          select:{
            game: true
          }
        }

    }});
    const listGames = profileData.game;
    const favoritos = profileData.favoritos;
    const orderedGames = [];
    const allGenres = await this.prisma.genre.findMany();
    allGenres.map((genre) => {
      const gamesperGenre = [];
      const IdGame = [];
      listGames.map((game) => {
        if (game.genre[0].name == genre.name) {
          gamesperGenre.push(game.title);
          IdGame.push(game.id);
        }
      });
      const genderObj = {
        genre: genre.name,
        title: gamesperGenre,
        id: IdGame,
      };
      if (gamesperGenre.length !== 0) {
        orderedGames.push(genderObj);
      }
    });
    return {
      games: orderedGames,
      favoritos: favoritos,
    };
  }
}
