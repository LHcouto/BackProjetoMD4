import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { cpf } from 'cpf-cnpj-validator';

@Injectable()
export class UserService {
  private userSelect ={
    id: true,
    name: true,
    email: true,
    password: false,
    cpf: false,
    isAdmin: false,
    createdAt: true,
    updatedAt: true,


  }
  constructor(private readonly prisma: PrismaService) {}

  findAll(user: User): Promise<User[]> {
    if(user.isAdmin){
    return this.prisma.user.findMany({
      select: this.userSelect
    })
  }      else {
    throw new UnauthorizedException(
      'Usuário não tem permissão. Caso isso esteja errado, contate o ADMIN!',
    );
  };
  }

  async findById(id: string): Promise<User> {
    const record = await this.prisma.user.findUnique({
      where: {id},
      // select: this.userSelect,
      include:{
        profile:true,
      }
    });
    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado`);
    }
    return record;
  }

  async findOne(id: string): Promise<User> {
    return this.findById(id);
  }

  async create(dto: CreateUserDto): Promise<User> {
    if(!cpf.isValid(dto.cpf)){
      throw new BadRequestException('O cpf não é válido')
    }
    if (dto.password != dto.confirmPassword) {
      throw new BadRequestException('As senhas informadas são diferentes');
    }
    delete dto.confirmPassword;

    const user: User = {
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
      cpf: cpf.format(dto.cpf)
    };

    return this.prisma.user
      .create({
        data: user,
        select: this.userSelect
      })
      .catch(this.handleError);
  }
  async update(id: string, dto: UpdateUserDto): Promise<User> {
    await this.findById(id);
    if(dto.cpf){
      if(!cpf.isValid(dto.cpf)){
        throw new BadRequestException('O cpf não é valido');
      }
    }
    if (dto.password) {
      if (dto.password != dto.confirmPassword) {
        throw new BadRequestException('As senhas informadas são diferentes');
      }
    }
    delete dto.confirmPassword;

    const data: Partial<User> = { ...dto };

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    if(data.cpf){
      data.cpf = cpf.format(data.cpf);
    }
    return this.prisma.user
      .update({
        where: { id },
        data,
        select: this.userSelect
      })
      .catch(this.handleError);
  }

  async delete(id: string) {
    await this.findById(id);
    await this.prisma.user.delete({ where: { id:id } });
  }
  handleError(error: Error): undefined {
    const errorLines = error.message?.split('\n');
    const lastErrorLine = errorLines[errorLines.length - 1]?.trim();

    if (!lastErrorLine) {
      console.error(error);
    }

    throw new UnprocessableEntityException(
      lastErrorLine || `Algum erro inesperado ocorreu`,
    );
  }
}
