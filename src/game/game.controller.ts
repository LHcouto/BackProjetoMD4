import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';
import { GameService } from './game.service';

@ApiTags('game')
@Controller('game')
export class GameController {
    constructor(private readonly gameService: GameService) {}

    @Get()
    @ApiOperation({
        summary: 'Listar todos os jogos',
    })
    findAll(): Promise<Game[]> {
        return this.gameService.findAll();
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Visualizar um jogo',
    })
    findOne(@Param('id') id: string): Promise<Game> {
        return this.gameService.findOne(id);
    }

    @Post()
    @ApiOperation({
        summary: 'Criar um jogo',
    })
    create(@Body() dto: CreateGameDto): Promise<Game> {
        return this.gameService.create(dto);
    }

    @Patch(':id')
    @ApiOperation({
        summary: 'Editar um jogo por ID',
    })
    update(@Param('id') id: string, @Body() dto: UpdateGameDto): Promise<Game> {
        return this.gameService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: 'Remover um jogo pelo ID',
    })
    delete(@Param('id') id: string) {
        this.gameService.delete(id);
    }
}
