import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto
{
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email da conta',
    example: 'lhcp96@gmail.com'
  })
  email: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'senha da conta',
    example: 'Abcd@123456'
  })
  password: string;
}
