import { Injectable } from '@nestjs/common';
import { CreateMovieInput } from './dto/create-movie.input';
import { UpdateMovieInput } from './dto/update-movie.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { LanguagesService } from 'src/languages/languages.service';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private repo: Repository<Movie>,
    private languages: LanguagesService,
  ) {}

  async create(createMovieInput: CreateMovieInput) {
    const {
      length,
      rating,
      release_year,
      rental_duration,
      replacement_cost,
      rental_rate,
      special_features,
      title,
    } = createMovieInput;

    const language_id = await this.getLanguageId(createMovieInput.language);
    const original_language_id = await this.getLanguageId(
      createMovieInput.original_language,
    );
    const movie = this.repo.create({
      length,
      rating,
      release_year,
      rental_duration,
      replacement_cost,
      rental_rate,
      special_features,
      title,
      language_id,
      original_language_id,
    });
    const res = await this.repo.save(movie);
    return res;
  }

  private async getLanguageId(name: string) {
    const lang = await this.languages.find({ name });
    if (lang.length) {
      return lang[0].language_id;
    } else {
      return null;
    }
  }
  async findAll() {
    return await this.repo.find();
  }

  async findOne(film_id: number) {
    return await this.repo.findOne({ where: { film_id } });
  }

  async search(where: Partial<Movie>) {
    return await this.repo.find({ where });
  }

  async update(film_id: number, updateMovieInput: UpdateMovieInput) {
    const movie = updateMovieInput as Partial<Movie>;
    if (updateMovieInput.language) {
      const language_id = await this.getLanguageId(updateMovieInput.language);
      movie.language_id = language_id;
    }
    if (updateMovieInput.original_language) {
      const original_language_id = await this.getLanguageId(
        updateMovieInput.original_language,
      );
      movie.original_language_id = original_language_id;
    }

    return await this.repo.update(film_id, movie);
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
