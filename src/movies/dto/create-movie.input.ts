import { InputType, OmitType } from '@nestjs/graphql';
import { UpdateMovieInput } from './update-movie.input';

@InputType()
export class CreateMovieInput extends OmitType(UpdateMovieInput, ['film_id']) {}
