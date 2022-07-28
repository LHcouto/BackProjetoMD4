import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggedUser } from '../auth/logged-user.decorator';
import { User } from '../user/entities/user.entity';
import { CreateGenreDto} from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';
import { GenreService } from './genre.service';
@ApiTags('Genres')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService){}

  @Get()
  @ApiOperation({
    summary: 'Listar todos os gêneros'
  })
  findAll(): Promise<Genre[]> {
    return this.genreService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Achar um gênero por NOME'
  })
  findOne(@Param('id') id:string): Promise<Genre>{
    return this.genreService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Criar um gênero'
  })
  create(@LoggedUser() user: User,@Body()dto: CreateGenreDto): Promise<Genre> {
    return this.genreService.create(dto, user);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar um gênero por NOME'
  })
  update(@LoggedUser() user: User,@Param('id') id:string, @Body()dto: UpdateGenreDto): Promise<Genre>{
    return this.genreService.update(id, dto, user)

  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Deletar um gênero por NOME'
  })
  delete(@LoggedUser() user: User,@Param('id') id: string){
    this.genreService.delete(id, user);
  }
}
