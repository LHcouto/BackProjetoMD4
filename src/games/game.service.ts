import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '../user/entities/user.entity';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createGameDto: CreateGameDto, user: User) {
    if (user.isAdmin) {
      const data: Prisma.GameCreateInput = {
        title: createGameDto.title,
        description: createGameDto.description,
        coverImageUrl: createGameDto.coverImageUrl,
        year: createGameDto.year,
        imdbScore: createGameDto.imdbScore,
        trailerYoutubeUrl: createGameDto.trailerYoutubeUrl,
        gameplayYoutubeUrl: createGameDto.gameplayYoutubeUrl,
        genres: {
          connect: {
            name: createGameDto.genreName,
          },
        },
      };

      return await this.prisma.game
        .create({
          data,
          include: {
            genres: true,
          },
        })
        .catch(this.handleError);
    } else {
      throw new UnauthorizedException(
        'Usuário não tem permissão. Caso isso esteja errado, contate o ADMIN!',
      );
    }
  }

  findAll() {
    return this.prisma.game.findMany({
      include: {
        genres: true,
      },
    });
  }
  async findById(id: string) {
    const record = await this.prisma.game.findUnique({
      where: {
        id: id,
      },
      include: {
        genres: true,
      },
    });
    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado`);
    }
    return record;
  }

  async update(id: string, dto: UpdateGameDto, user: User) {
    if(user.isAdmin){
    const gameAtual = await this.findById(id);
    const data: Prisma.GameUpdateInput = {
      title: dto.title,
      description: dto.description,
      coverImageUrl: dto.coverImageUrl,
      year: dto.year,
      imdbScore: dto.imdbScore,
      trailerYoutubeUrl: dto.trailerYoutubeUrl,
      gameplayYoutubeUrl: dto.gameplayYoutubeUrl,
      genres: {
        disconnect: {
          name: gameAtual.genres[0].name,
        },
        connect: {
          name: dto.genreName,
        },
      },
    };
    return await this.prisma.game
      .update({
        where: { id },
        data,
        include: {
          genres: true,
        },
      })
      .catch(this.handleError)}
      else {
        throw new UnauthorizedException(
          'Usuário não tem permissão. Caso isso esteja errado, contate o ADMIN!',
        );
      }
  }

  async delete(id: string, user: User) {
    if(user.isAdmin){
    await this.findById(id);
    await this.prisma.game.delete({ where: { id } })}
    else{
      throw new UnauthorizedException('Usuário não tem permissão. Caso isso esteja errado, contate o ADMIN!')
    }
  }

  handleError(error: Error): undefined {
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1]?.trim();

    throw new UnprocessableEntityException(
      lastErrorLine || `Algum erro inesperado ocorreu`,
    );
  }
}
