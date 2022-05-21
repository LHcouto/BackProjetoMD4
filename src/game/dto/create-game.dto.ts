import { IsNumber, IsPositive } from 'class-validator';

export class CreateGameDto {
  @IsNumber()
  @IsPositive()
  number: number;
}
