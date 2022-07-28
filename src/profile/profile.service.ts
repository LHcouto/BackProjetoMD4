import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.profile.findMany({
      include: {
        user: true,
        game: true,
        favoritos: {
          select:{
            game:{
              select:{
                title: true
              }
            }
          }
        }
      },
    });
  }

  async find(id: string){
    const record = await this.prisma.profile.findUnique({
      where: {
        id: id,
      },
      include: {
        game: true,
        favoritos:{
          select:{
            game:true,
            id: true
          }
        } },
    });
    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado`);
    }
    return record;
  }

  async findOne(id: string) {
    return this.findOne(id);
  }

  async create(userId: string, dto: CreateProfileDto) {
    if (dto.gameId) {
      return await this.prisma.profile
        .create({
          data: {
            title: dto.title,
            imageUrl: dto.imageUrl,
            userId: userId,
            game: {
              connect: {
                id: dto.gameId,
              },
            },
          },
          include:{
            game: true,
            favoritos:true,

          }
        })
        .catch(this.handleError);
    } else {
      return await this.prisma.profile
        .create({
          data: {
            title: dto.title,
            imageUrl: dto.imageUrl,
            userId: userId,
          },
          include: { game: true, favoritos:true},
        })
        .catch(this.handleError);
    }
  }
  async addOrRemoveFavoriteGame(profileId: string, gameId: string) {
    const user = await this.findOne(profileId);
    let favoritedGame = false;
    if(user.favoritos!=null){

      user.favoritos.game.map((game)=>{
        if(gameId===game.id){
          favoritedGame = true;
        }
      })
    }else{
      return this.prisma.favoritos.create({
        data:{
        profile: {
          connect:{
            id: profileId
          },
        },
        game: {
          connect:{
            id: gameId
          }
        }
        }
      })
    }
    if(favoritedGame){
      return await this.prisma.favoritos.update({
        where:{
          id: user.favoritos.id,

        },
        data:{
          game:{
            disconnect:{
              id: gameId,
            }
          }
        }
      })
    }else{
      return await this.prisma.favoritos.update({
        where:{
          id: user.favoritos.id,

        },
        data:{
          game:{
            connect:{
              id: gameId,
            }
          }
        }
      })
    }
  }
  async update(userId: string, id: string, dto: UpdateProfileDto) {
    const user = await this.findOne(id);

    if (dto.gameId) {
      let GameExist = false;
      user.game.map((game: { id: string; }) => {
        if (game.id == dto.gameId) {
          GameExist = true;
        }
      });
      if (GameExist) {
        return this.prisma.profile
          .update({
            where: { id: id },
            data: {
              title: dto.title,
              imageUrl: dto.imageUrl,
              userId: userId,
              game: {
                disconnect: {
                  id: dto.gameId,
                },
              },
            },
            include: { game: true },
          })
          .catch(this.handleError);
      } else {
        return this.prisma.profile
          .update({
            where: { id: id },
            data: {
              title: dto.title,
              imageUrl: dto.imageUrl,
              userId: userId,
              game: {
                connect: {
                  id: dto.gameId,
                },
              },
            },
            include: { game: true },
          })
          .catch(this.handleError);
      }
    } else {
      return this.prisma.profile
        .update({
          where: { id: id },
          data: {
            title: dto.title,
            imageUrl: dto.imageUrl,
            userId: userId,
          },
          include: { game: true },
        })
        .catch(this.handleError);
    }
  }

  async delete(userId: string, id: string) {
    const profile = await this.findOne(id);
    await this.prisma.favoritos.delete({
      where:{
        id:profile.favoritos.id
      }
    })
    await this.prisma.profile.delete({ where: { id } });
  }

  handleError(error: Error): undefined {
    console.error(error);
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1]?.trim();

    throw new UnprocessableEntityException(
      lastErrorLine || `Algum erro inesperado ocorreu`,
    );
  }
}
