import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class UpdateMovieInput {
  @Field(() => Int)
  film_id: number;

  @Field(() => String, { description: 'Title of the film' })
  @MaxLength(255)
  title: string;

  @Field(() => String, { description: 'Year the film was released' })
  @Length(4, 4)
  release_year: string;

  @Field(() => String, { description: 'Primary language of the film' })
  language: string;

  @Field(() => String, {
    nullable: true,
    description: 'Original language of the film (if applicable)',
  })
  original_language: string;

  @Field(() => Float, { description: 'Rental duration for this film' })
  rental_duration: number;

  @Field(() => Float, { description: 'Cost to rent this film' })
  rental_rate: number;

  @Field(() => Int, {
    nullable: true,
    description: 'Length (in minutes) of the film',
  })
  @IsOptional()
  length: number;

  @Field(() => String, {
    description: 'MPAA Rating of the film',
    nullable: true,
  })
  @IsOptional()
  @MaxLength(10)
  rating: string;

  @Field(() => Float, { description: 'Cost to replace this film' })
  replacement_cost: number;

  @Field(() => String, {
    nullable: true,
    description: 'Special features included with tis film',
  })
  @MaxLength(100)
  @IsOptional()
  special_features: string;
}
