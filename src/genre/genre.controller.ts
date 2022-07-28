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
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { Genre } from './entities/genre.entity';

@ApiTags('genre')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar um gênero',
  })
  create(
    @LoggedUser() user: User,
    @Body() dto: CreateGenreDto,
  ): Promise<Genre> {
    return this.genreService.create(dto, user);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todos os gêneros',
  })
  findAll() {
    return this.genreService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Encontrar um gênero por ID',
  })
  findOne(@Param('id') id: string): Promise<Genre> {
    return this.genreService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar um gênero',
  })
  update(
    @LoggedUser() user: User,
    @Param('id') id: string,
    @Body() dto: UpdateGenreDto,
  ): Promise<Genre> {
    return this.genreService.update(id, dto, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Deletar um gênero',
  })
  delete(@LoggedUser() user: User, @Param('id') id: string) {
    this.genreService.delete(id, user);
  }
}
