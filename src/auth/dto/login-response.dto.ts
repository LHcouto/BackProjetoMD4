import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../user/entities/user.entity";


export class LoginResponseDto {
  @ApiProperty({
    description: 'JWT gerado pelo login',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtlbGxiYmVyYmFyY2Fyb2xvQGdtYWlsLmNvbSIsImlhdCI6MTY1NDAzNDk2OSwiZXhwIjoxNjU0MTIxMzY5fQ.hb8VdUIK07O3-vV3UUbq_nCvNvChE5ceQuXaQz51v-U',
  })
  token: string;
  @ApiProperty({
    description:'Dados do usuário autenticado',
  })
  user: User;
}
