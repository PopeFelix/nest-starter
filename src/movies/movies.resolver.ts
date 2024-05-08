import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { MoviesService } from './movies.service';
import { Movie } from './response/movie.response';
import { CreateMovieInput } from './dto/create-movie.input';
import { UpdateMovieInput } from './dto/update-movie.input';
import { Language } from '../languages/response/language.response';
import { LanguagesService } from '../languages/languages.service';

@Resolver(() => Movie)
export class MoviesResolver {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly languagesService: LanguagesService,
  ) {}

  @Mutation(() => Movie)
  createMovie(@Args('createMovieInput') createMovieInput: CreateMovieInput) {
    return this.moviesService.create(createMovieInput);
  }

  @Query(() => [Movie], { name: 'movies' })
  findAll() {
    return this.moviesService.findAll();
  }

  @Query(() => Movie, { name: 'movie' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.moviesService.findOne(id);
  }

  @Mutation(() => Movie)
  updateMovie(@Args('updateMovieInput') updateMovieInput: UpdateMovieInput) {
    return this.moviesService.update(
      updateMovieInput.film_id,
      updateMovieInput,
    );
  }

  @Mutation(() => Movie)
  removeMovie(@Args('id', { type: () => Int }) id: number) {
    return this.moviesService.remove(id);
  }

  @ResolveField(() => Language)
  language(@Parent() movie: Movie) {
    const { language_id } = movie;
    return this.languagesService.findOne(language_id);
  }

  @ResolveField(() => Language)
  original_language(@Parent() movie: Movie) {
    const { original_language_id } = movie;
    return this.languagesService.findOne(original_language_id);
  }
}
