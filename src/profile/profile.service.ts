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
        games: true,
        favoriteGames: {
          select:{
            games:{
              select:{
                title: true,
                id:true
              }
            }
          }
        }
      },
    });
  }

  async findById(id: string){
    const record = await this.prisma.profile.findUnique({
      where: {
        id: id,
      },
      include: {
        games: true,
        favoriteGames:{
          select:{
            games:true,
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
    return this.findById(id);
  }

  async create(userId: string, dto: CreateProfileDto) {
    if (dto.gameId) {
      return await this.prisma.profile
        .create({
          data: {
            title: dto.title,
            imageUrl: dto.imageUrl,
            userId: userId,
            games: {
              connect: {
                id: dto.gameId,
              },
            },
          },
          include:{
            games: true,
            favoriteGames:true,

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
          include: { games: true, favoriteGames:true},
        })
        .catch(this.handleError);
    }
  }
  async addOrRemoveFavoriteGame(profileId: string, gameId: string) {
    const user = await this.findById(profileId);
    let favoritedGame = false;
    if(user.favoriteGames!=null){

      user.favoriteGames.games.map((game)=>{
        if(gameId===game.id){
          favoritedGame = true;
        }
      })
    }else{
      return this.prisma.favoriteGames.create({
        data:{
        profile: {
          connect:{
            id: profileId
          },
        },
        games: {
          connect:{
            id: gameId
          }
        }
        }
      })
    }
    if(favoritedGame){
      return await this.prisma.favoriteGames.update({
        where:{
          id: user.favoriteGames.id,

        },
        data:{
          games:{
            disconnect:{
              id: gameId,
            }
          }
        }
      })
    }else{
      return await this.prisma.favoriteGames.update({
        where:{
          id: user.favoriteGames.id,

        },
        data:{
          games:{
            connect:{
              id: gameId,
            }
          }
        }
      })
    }
  }
  async update(userId: string, id: string, dto: UpdateProfileDto) {
    const user = await this.findById(id);

    if (dto.gameId) {
      let GameExist = false;
      user.games.map((game) => {
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
              games: {
                disconnect: {
                  id: dto.gameId,
                },
              },
            },
            include: { games: true },
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
              games: {
                connect: {
                  id: dto.gameId,
                },
              },
            },
            include: { games: true },
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
          include: { games: true },
        })
        .catch(this.handleError);
    }
  }

  async delete(userId: string, id: string) {
    const profile = await this.findById(id);
    if(profile.favoriteGames){
    await this.prisma.favoriteGames.delete({
      where:{
        id:profile.favoriteGames.id
      }
    })
    await this.prisma.profile.delete({ where: { id } });
  }else{
    await this.prisma.profile.delete({ where: { id } });
  }
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
