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
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags()
@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Post()
    @ApiOperation({
        summary: 'Criar um perfil',
    })
    create(@Body() createProfileDto: CreateProfileDto) {
        return this.profileService.create(createProfileDto);
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
        @Param('id') id: string,
        @Body() updateProfileDto: UpdateProfileDto,
    ) {
        return this.profileService.update(id, updateProfileDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: 'Deletar um perfil por ID',
    })
    remove(@Param('id') id: string) {
        this.profileService.remove(id);
    }
}
