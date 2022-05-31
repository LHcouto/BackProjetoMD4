import {
    Injectable,
    NotFoundException,
    UnprocessableEntityException,
} from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { Game } from './entities/game.entity';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateGameDto } from './dto/update-game.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class GameService {
    constructor(private readonly prisma: PrismaService) {}

    findAll(): Promise<Game[]> {
        return this.prisma.game.findMany();
    }

    async findOne(id: string) {
        const record = await this.prisma.game.findUnique({
            where: { id: id },
            include: { genre: true },
        });

        if (!record) {
            throw new NotFoundException(
                `Registro com o '${id}' não encontrado.`,
            );
        }

        return record;
    }

    async create(dto: CreateGameDto) {
        const data: Prisma.GameCreateInput = {
            title: dto.title,
            description: dto.description,
            coverImageUrl: dto.coverImageUrl,
            year: dto.year,
            imdbScore: dto.imdbScore,
            trailerYoutubeUrl: dto.trailerYoutubeUrl,
            gameplayYoutubeUrl: dto.gameplayYoutubeUrl,
            genre: {
                connect: {
                    name: dto.profileName,
                },
            },
        };
        return await this.prisma.game.create({
            data,
            include: { genre: true },
        });
    }

    async update(id: string, dto: UpdateGameDto) {
        const gameAtual = await this.findOne(id);
        const data: Prisma.GameUpdateInput = {
            title: dto.title,
            description: dto.description,
            coverImageUrl: dto.coverImageUrl,
            year: dto.year,
            imdbScore: dto.imdbScore,
            trailerYoutubeUrl: dto.trailerYoutubeUrl,
            gameplayYoutubeUrl: dto.gameplayYoutubeUrl,
            genre: {
                disconnect: {
                    name: gameAtual.genre[0].name,
                },
                connect: {
                    name: dto.profileName,
                },
            },
        };

        return await this.prisma.game
            .update({
                where: { id },
                data,
                include: { genre: true },
            })
            .catch(this.handleError);
    }
    async delete(id: string) {
        await this.findOne(id);

        await this.prisma.game.delete({ where: { id } });
    }

    handleError(error: Error): undefined {
        const errorLines = error.message?.split('\n');
        const lastErrorLine = errorLines[errorLines.length - 1]?.trim();
        throw new UnprocessableEntityException(
            lastErrorLine || `Algum erro inesperado ocorreu`,
        );
    }
}
