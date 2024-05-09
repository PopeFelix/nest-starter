import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { CreateMovieInput } from './dto/create-movie.input';
import { Language } from '../languages/entities/language.entity';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateMovieInput } from './dto/update-movie.input';
import { TypeOrmSqliteTestingModule } from '../test-utils/testdb';
import { movies } from '../test-utils/fixtures/movie';
import { languages } from '../test-utils/fixtures/language';

describe('MoviesService', () => {
  let service: MoviesService;
  let module: TestingModule;
  let moviesRepo: Repository<Movie>;
  let languagesRepo: Repository<Language>;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [...TypeOrmSqliteTestingModule([Movie, Language])],
      providers: [MoviesService],
    }).compile();

    moviesRepo = module.get<Repository<Movie>>(getRepositoryToken(Movie));
    languagesRepo = module.get<Repository<Language>>(
      getRepositoryToken(Language),
    );
    service = module.get<MoviesService>(MoviesService);

    await Promise.all(
      languages.map(async (language) => await languagesRepo.insert(language)),
    );
    await Promise.all(
      movies.map(async (movie) => await moviesRepo.insert(movie)),
    );
  });
  afterAll(() => module.close());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('can create a movie', async () => {
    const lang = languages[0];
    const original_lang = languages[1];
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

    const ret = await service.create(movie);
    console.debug('Create returned', ret);
    expect(ret).toBeInstanceOf(Movie);
    expect(ret).toEqual({
      ...movie,
      film_id: expect.any(Number),
      last_update: expect.any(Number),
    });
  });

  it('Can update a movie', async () => {
    const lang = languages[0];
    const movie: UpdateMovieInput = {
      film_id: movies[1].film_id,
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
    const ret = await service.update(movie.film_id, movie);
    expect(ret).toBeTruthy();
    expect(ret).toHaveProperty('affected', 1);
    const updatedMovie = await service.findOne(movie.film_id);
    Object.entries(movie).forEach(([key, value]) => {
      expect(updatedMovie[key]).toEqual(value);
    });
  });

  it('Can find all movies', async () => {
    const ret = await service.findAll();
    expect(ret[0]).toBeInstanceOf(Movie);
  });

  it('Can find a movie by ID', async () => {
    const film_id = 1;
    await expect(service.findOne(film_id)).resolves.toBeInstanceOf(Movie);
  });
});
