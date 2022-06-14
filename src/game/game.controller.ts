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
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from "../user/entities/user.entity";
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';
import { GameService } from './game.service';


@ApiTags('game')
@UseGuards(AuthGuard())
@ApiBearerAuth()
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
    create(@LoggedUser() user: User, @Body() dto: CreateGameDto): Promise<Game> {
        return this.gameService.create(dto,user);
    }

    @Patch(':id')
    @ApiOperation({
        summary: 'Editar um jogo por ID',
    })
    update(@LoggedUser() user: User, @Param('id') id: string, @Body() dto: UpdateGameDto): Promise<Game> {
        return this.gameService.update(id, dto, user);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: 'Remover um jogo pelo ID',
    })
    delete(@LoggedUser() user: User, @Param('id') id: string) {
        return this.gameService.delete(id, user);
    }
}
