import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive, IsString, Matches, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: 'nome do usuário',
    example: 'Luis'
  })
  name: string;
  @IsString()
  @ApiProperty({
    description: 'email do usuário',
    example: 'lhcp96@gmail.com'
  })
  email: string;
  @IsString()
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca',
  })
  @ApiProperty({
    description: 'senha usuário',
    example: 'Abcd@123456'
  })
  password: string;
  @ApiProperty({
    description: 'confirmação senha usuário',
    example: 'Abcd@123456'
  })
  confirmPassword: string;
  @IsString()
  @ApiProperty({
    description: 'cpf do usuário',
    example: '123456789'
  })
  cpf: string;

  isAdmin: boolean;
}
