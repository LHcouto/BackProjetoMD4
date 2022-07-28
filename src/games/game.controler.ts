import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { User } from "../user/entities/user.entity";
import { LoggedUser } from "../auth/logged-user.decorator";
import { CreateGameDto } from "./dto/create-game.dto";
import { UpdateGameDto } from "./dto/update-game.dto";
import { Game } from "./entities/game.entity";
import { GameService } from "./game.service";
@ApiTags('Games')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('games')
export class GameController{
  constructor(private readonly gameService: GameService){}
  @Get()
  @ApiOperation({
    summary: 'Listar todos os games'
  })

  findAll(): Promise<Game[]>{
    return this.gameService.findAll();
  }
  @Get(':id')
  @ApiOperation({
    summary: 'Achar um game por ID'
  })
  findOne(@Param('id') id:string): Promise<Game>{
    return this.gameService.findById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Criar um game'
  })
  create(@LoggedUser() user: User,@Body()dto: CreateGameDto): Promise<Game>{
    return this.gameService.create(dto,user);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar um game por ID'
  })
  update(@LoggedUser() user: User,@Param('id') id:string, @Body()dto: UpdateGameDto): Promise<Game>{
    return this.gameService.update(id, dto, user)

  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Deletar um game por ID'
  })
  delete(@LoggedUser() user: User,@Param('id') id: string){
    return this.gameService.delete(id, user);
  }
}
