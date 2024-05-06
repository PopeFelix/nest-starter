import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType({ description: 'A film available for rental' })
export class Movie {
  @Field(() => Int, { description: 'Unique ID of this film' })
  film_id: number;

  @Field(() => String, { description: 'Title of the film' })
  title: string;

  @Field(() => String, { description: 'Year the film was released' })
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

  @Field(() => Int, { description: 'Length (in minutes) of the film' })
  length: number;

  @Field(() => Float, { description: 'Cost to replace this film' })
  replacement_cost: number;

  @Field(() => String, { description: 'MPAA Rating of the film' })
  rating: string;

  @Field(() => String, {
    nullable: true,
    description: 'Special features included with tis film',
  })
  special_features: string;
}
