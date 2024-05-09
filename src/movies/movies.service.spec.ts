import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { CreateMovieInput } from './dto/create-movie.input';
import { Language } from '../languages/entities/language.entity';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateMovieInput } from './dto/update-movie.input';

describe('MoviesService', () => {
  let service: MoviesService;

  let repo: Repository<Movie>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        { provide: getRepositoryToken(Movie), useClass: Repository },
      ],
    }).compile();

    repo = module.get<Repository<Movie>>(getRepositoryToken(Movie));
    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('can create a movie', async () => {
    const film_id = 1;
    const lang: Language = {
      language_id: 1,
      name: 'English',
      last_update: 0,
      movies: [],
    };
    const original_lang: Language = {
      language_id: 10,
      name: 'Barbazish',
      last_update: 0,
      movies: [],
    };
    const movie: CreateMovieInput = {
      language_id: lang.language_id,
      description: 'A dummy movie',
      length: 120,
      rating: 'R',
      release_year: '1945',
      rental_duration: 3,
      rental_rate: 3.5,
      replacement_cost: 29.99,
      title: 'Unit Testing Strikes Back',
      special_features: null,
      original_language_id: original_lang.language_id,
    };
    const createSpy = jest.spyOn(repo, 'create').mockReturnValue({
      ...movie,
      film_id,
      language_id: lang.language_id,
      original_language_id: original_lang.language_id,
      last_update: 0,
      language: lang,
      original_language: original_lang,
    });
    const saveSpy = jest.spyOn(repo, 'save').mockResolvedValue({
      ...movie,
      film_id,
      language_id: lang.language_id,
      original_language_id: original_lang.language_id,
      last_update: 0,
      language: lang,
      original_language: original_lang,
    });

    await expect(service.create(movie)).resolves.toBeTruthy();
    expect(createSpy).toHaveBeenCalled();
    expect(saveSpy).toHaveBeenCalledWith({
      ...movie,
      film_id,
      language_id: lang.language_id,
      original_language_id: original_lang.language_id,
      language: lang,
      original_language: original_lang,
      last_update: expect.any(Number),
    });
  });

  it('Can update a movie', async () => {
    const lang: Language = {
      language_id: 2,
      name: 'Foobarese',
      last_update: 0,
      movies: [],
    };
    const original_lang: Language = {
      language_id: 20,
      name: 'Foobarish',
      last_update: 0,
      movies: [],
    };
    const movie: UpdateMovieInput = {
      film_id: 2,
      language_id: lang.language_id,
      length: 120,
      rating: 'R',
      release_year: '1945',
      rental_duration: 3,
      rental_rate: 3.5,
      replacement_cost: 29.99,
      title: 'Unit Testing Strikes Back (Again)',
      description: 'Dummy movie',
      special_features: null,
      original_language_id: null,
    };
    const findSpy = jest.spyOn(repo, 'findOne').mockResolvedValue({
      ...movie,
      language: lang,
      original_language: original_lang,
      last_update: Date.now(),
    });
    const updateSpy = jest
      .spyOn(repo, 'update')
      .mockResolvedValueOnce({ generatedMaps: [], raw: '' });
    await expect(service.update(movie.film_id, movie)).resolves.toBeTruthy();
    expect(findSpy).toHaveBeenCalledWith(
      expect.objectContaining({ where: { film_id: movie.film_id } }),
    );
    expect(updateSpy).toHaveBeenCalledWith(movie.film_id, movie);
  });

  it('Can find all movies', async () => {
    const findSpy = jest.spyOn(repo, 'find').mockResolvedValueOnce([]);
    await expect(service.findAll()).resolves.toBeTruthy();
    expect(findSpy).toHaveBeenCalled();
  });

  it('Can find a movie by ID', async () => {
    const lang: Language = {
      language_id: 3,
      name: 'Foobarish',
      last_update: 0,
      movies: [],
    };

    const film_id = 3;
    const findSpy = jest.spyOn(repo, 'findOne').mockResolvedValueOnce({
      film_id,
      description: 'A movie about finding movies by ID',
      title: 'Finding Movie By ID',
      release_year: '2024',
      language_id: lang.language_id,
      original_language_id: null,
      original_language: null,
      language: lang,
      last_update: Date.now(),
      length: 90,
      rating: 'Q',
      rental_duration: 3,
      rental_rate: 3.5,
      replacement_cost: 29.99,
      special_features: null,
    });
    await expect(service.findOne(film_id)).resolves.toBeTruthy();
    expect(findSpy).toHaveBeenCalledWith(
      expect.objectContaining({ where: { film_id } }),
    );
  });
});
