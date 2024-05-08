import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMovieInput } from './dto/create-movie.input';
import { UpdateMovieInput } from './dto/update-movie.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { LanguagesService } from '../languages/languages.service';

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
    const lang = (await this.languages.find({ name })) || [];
    if (lang.length) {
      return lang[0].language_id;
    } else {
      throw new BadRequestException(`Language "${name}" is not registered`);
    }
  }
  async findAll() {
    return await this.repo.find({
      relations: {
        language: true,
        original_language: true,
      },
    });
  }

  async findOne(film_id: number) {
    const movie = await this.repo.findOne({
      where: { film_id },
      relations: {
        language: true,
        original_language: true,
      },
    });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    console.debug('Found movie', movie);
    return movie;
  }

  async find(where: Partial<Movie>) {
    return await this.repo.find({
      where,
      relations: {
        language: true,
        original_language: true,
      },
    });
  }

  async update(film_id: number, updateMovieInput: UpdateMovieInput) {
    const movie: Partial<Movie> = {
      ...updateMovieInput,
      language: null,
      original_language: null,
    };
    try {
      await this.findOne(film_id);
    } catch (e) {
      if (e instanceof NotFoundException) {
        console.log(`Movie ${film_id} not found`);
      } else {
        console.error(`Error retrieving movie ${film_id}`, e);
      }
      throw e;
    }

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
