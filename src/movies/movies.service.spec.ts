// import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { CreateMovieInput } from './dto/create-movie.input';
import { LanguagesService } from 'src/languages/languages.service';
import { TestBed } from '@automock/jest';
import { Language } from 'src/languages/entities/language.entity';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';

describe('MoviesService', () => {
  let service: MoviesService;

  let mockLanguagesService: jest.Mocked<LanguagesService>;
  let mockRepo: jest.Mocked<Repository<Movie>>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(MoviesService).compile();

    service = unit;
    mockLanguagesService = unitRef.get(LanguagesService);
    mockRepo = unitRef.get(Repository<Movie>);
  });

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [MoviesService],
  //   }).compile();

  //   service = module.get<MoviesService>(MoviesService);
  // });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('can create a movie', async () => {
    const film_id = 1;
    const lang: Language = {
      language_id: 1,
      name: 'English',
    };
    const movie: CreateMovieInput = {
      language: lang.name,
      length: 120,
      rating: 'R',
      release_year: '1945',
      rental_duration: 3,
      rental_rate: 3.5,
      replacement_cost: 29.99,
      title: 'Unit Testing Strikes Back',
      special_features: null,
      original_language: null,
    };
    mockLanguagesService.find.mockResolvedValue([lang]);
    mockRepo.create.mockResolvedValue({
      ...movie,
      film_id,
    } as unknown as never); // IDK why TS thinks the resolved value of create() is never...

    await expect(service.create(movie)).resolves.toBeInstanceOf(Movie);
    expect(mockLanguagesService.find).toHaveBeenCalledWith(movie.language);
    expect(mockRepo.create).toHaveBeenCalledWith(movie);
  });
});
