import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto{
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Nickname do usuário',
    example: 'luiscouto',
  })
  nickname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
     description: 'Senha do usário',
     example: 'Abcd@1234',

  })
  password: string;
}
