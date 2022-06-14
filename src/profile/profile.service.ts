import {
    Injectable,
    NotFoundException,
    UnprocessableEntityException,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './entities/profile.entity';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
    constructor(private readonly prisma: PrismaService) {}

    findAll(): Promise<Profile[]> {
        return this.prisma.profile.findMany({
            include: {
                user: true,
                favoritos: true,
            },
        });
    }

    async findById(id: string): Promise<Profile> {
        const record = await this.prisma.profile.findUnique({
            where: { id: id },
            include: { favoritos: true },
        });

        if (!record) {
            throw new NotFoundException(
                `Registro com o '${id}' não encontrado.`,
            );
        }

        return record;
    }

    findOne(id: string): Promise<Profile> {
        return this.prisma.profile.findUnique({ where: { id } });
    }

    async create(dto: CreateProfileDto): Promise<Profile> {
        if (dto.gameId) {
            return await this.prisma.profile
                .create({
                    data: {
                        title: dto.title,
                        imageUrl: dto.imageUrl,
                        userId: dto.UserId,
                        favoritos: {
                            connect: {
                                id: dto.gameId,
                            },
                        },
                    },
                    include: { favoritos: true, user: true },
                })
                .catch(this.handleError);
        } else {
            return await this.prisma.profile
                .create({
                    data: {
                        title: dto.title,
                        imageUrl: dto.imageUrl,
                        userId: dto.UserId,
                    },
                    include: { favoritos: true },
                })
                .catch(this.handleError);
        }
    }

    async update(id: string, dto: UpdateProfileDto): Promise<Profile> {
        await this.findById(id);

        if (dto.gameId) {
          return this.prisma.profile
            .update({
              where: { id },
              data: {
                title: dto.title,
                imageUrl: dto.imageUrl,
                userId: dto.UserId,
                favoritos: {
                  connect: {
                    id: dto.gameId,
                  },
                },
              },
              include: { favoritos: true },
            })

        } else {
          return this.prisma.profile
            .update({
              where: { id },
              data: {
                title: dto.title,
                imageUrl: dto.imageUrl,
                userId: dto.UserId,
              },
              include: { favoritos: true },
            })
            
        }
      }
    async delete(id: string) {
        await this.findById(id);

        await this.prisma.profile.delete({ where: { id } });
    }

    handleError(error: Error): undefined {
        const errorLines = error.message?.split('\n');
        const lastErrorLine = errorLines[errorLines.length - 1]?.trim();
        throw new UnprocessableEntityException(
            lastErrorLine || `Algum erro inesperado ocorreu`,
        );
    }
}
