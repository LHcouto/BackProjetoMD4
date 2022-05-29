import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: 'Nome de usuário. Deve ser único',
    example:  'LuisCouto',
  })
  name: string;

  @IsString()
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca',
  })
  @ApiProperty({
    description: 'Senha do usuário para login',
    example: 'Abcd@1234',
  })
  password: string;

  @ApiProperty({
    description: 'A confirmação da senha deve ser igual a senha',
    example: 'Abcd@1234',
  })
  confirmPassword: string;

  @IsString()
  @ApiProperty({
    description: 'email do usuário',
    example: 'lhcp96@gmail.com'
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'cpf do usuário',
    example: '123.456.789-00'
  })
  cpf: string;

  @ApiProperty({
    description: 'permissoes do usuário usuário',
    example: false,
  })
  isAdmin: boolean;
  }
