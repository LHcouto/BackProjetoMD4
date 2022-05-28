import { Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Injectable()
export class GenreService {
  create(createGenreDto: CreateGenreDto) {
    return 'This action adds a new genre';
  }

  findAll() {
    return `This action returns all genre`;
  }

  findOne(id: string) {
    return `This action returns a #${id} genre`;
  }

  update(id: string, updateGenreDto: UpdateGenreDto) {
    return `This action updates a #${id} genre`;
  }

  delete(id: string) {
    return `This action removes a #${id} genre`;
  }
}
