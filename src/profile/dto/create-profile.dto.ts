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

    UserId: string;
    gameId?: string;
}
