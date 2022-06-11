import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma/prisma.module';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [GenreController],
  providers: [GenreService],
})
export class GenreModule {}
