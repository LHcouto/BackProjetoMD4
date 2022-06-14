import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/user/entities/user.entity';

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
  create(@LoggedUser() user: User, @Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(user.id, createProfileDto);
  }

  @Get()
  @ApiOperation({
    summary: 'listar todos os perfis',
  })
  findAll() {
    return this.profileService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar um perfil por ID',
  })
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar um perfil por ID',
  })
  update(
    @LoggedUser() user: User,
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profileService.update(user.id, id, updateProfileDto);
  }

  @Patch('favoriteGame/:id')
  @ApiOperation({
    summary: 'Adicionar ou remover um jogo favorito',
  })
  updateFavorite(
    @Param('id') id: string,
    @Body() UpdateProfileDto: UpdateProfileDto,
  ) {
    return this.profileService.addOrRemoveFavoriteGame(
      id,
      UpdateProfileDto.favoritoId,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Deletar um perfil por ID',
  })
  delete(@LoggedUser() user: User, @Param('id') id: string) {
    this.profileService.delete(user.id, id);
  }
}
