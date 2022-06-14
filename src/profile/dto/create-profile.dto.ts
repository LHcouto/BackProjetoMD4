import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class CreateProfileDto {
    @IsString()
    @ApiProperty({
        description: 'nome do perfil',
        example: 'Luis',
    })
    title: string;

    @IsUrl()
    @ApiProperty({
        description: 'Imagem do perfil',
        example: 'https://avatars.githubusercontent.com/u/98226434?v=4',
    })
    imageUrl: string;

    @ApiProperty({
      description: 'id do jogo (opcional)',
      example: '1d565ff0-d675-401a-98ae-52fbb2268f10',
    })
    gameId?: string;

    @ApiProperty({
      description: 'id do jogo para adicionar ou remover dos favoritos (opcional)',
      example: '1d565ff0-d675-401a-98ae-52fbb2268f10',
    })
    favoritoId?: string;
}
