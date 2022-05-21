import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class CreateGameDto {
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'O número do jogo',
    example: 1
})
  number: number;
}
