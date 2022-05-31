import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString, IsUrl } from 'class-validator';

export class CreateGameDto {
    @ApiProperty({
        description: 'titulo do jogo',
        example: 'Halo Infinite',
    })
    @IsString()
    title: string;

    @ApiProperty({
        description: 'link da imagem do jogo',
        example: 'wwww.haloimg.com',
    })
    @IsString()
    coverImageUrl: string;

    @ApiProperty({
        description: 'descrição do jogo',
        example:
            'Halo Infinite é um jogo eletrônico de tiro em primeira pessoa desenvolvido pela 343 Industries e publicado pela Xbox Game Studios.',
    })
    description: string;

    @ApiProperty({
        description: 'ano de lançamento',
        example: '2021',
    })
    @IsNumber()
    @IsPositive()
    year: number;

    @ApiProperty({
        description: 'nota do jgo (0 a 5)',
        example: 2,
    })
    @IsNumber()
    @IsPositive()
    imdbScore: number;

    @ApiProperty({
        description: 'trailer do jogo',
        example: 'wwww.youtube.com.br/halotrailer',
    })
    @IsUrl()
    trailerYoutubeUrl: string;

    @ApiProperty({
        description: 'gampeplay do jogo',
        example: 'wwww.youtube.com.br/gameplayhalo',
    })
    @IsUrl()
    gameplayYoutubeUrl: string;

    @IsString()
    profileName: string;
}
