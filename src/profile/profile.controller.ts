import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { LoggedUser } from '../auth/logged-user.decorator';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';

@ApiTags('profile')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um perfil',
  })
  create(@LoggedUser() user: User,@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(user.id,createProfileDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os perfis',
  })
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Achar um perfil por ID',
  })
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar um perfil por ID',
  })
  update(@LoggedUser() user: User, @Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(user.id,id,updateProfileDto);
  }

  @Patch('favoriteGame/:id')
  @ApiOperation({
    summary: 'Adicionar ou remover um game do favorito',
  })
updateFavorite(@Param('id') id: string, @Body() UpdateProfileDto: UpdateProfileDto){
  return this.profileService.addOrRemoveFavoriteGame(id,UpdateProfileDto.favoriteGameId)
}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Deletar um perfil por ID',
  })
  delete(@LoggedUser() user:User, @Param('id') id: string) {
    this.profileService.delete(user.id,id);
  }
}
