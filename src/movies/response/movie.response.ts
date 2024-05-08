import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType({ description: 'A film available for rental' })
export class Movie {
  @Field(() => Int, { description: 'Unique ID of this film' })
  film_id: number;

  @Field(() => String, { description: 'Title of the film' })
  title: string;

  @Field(() => String, {
    description: 'Description of the film',
    nullable: true,
  })
  description: string;

  @Field(() => String, {
    description: 'Year the film was released',
    nullable: true,
  })
  release_year: string;

  @Field(() => Int, { description: 'ID of primary language of the film' })
  language_id: number;

  @Field(() => Int, {
    nullable: true,
    description: 'ID of original language of the film (if applicable)',
  })
  original_language_id: number;

  @Field(() => Float, { description: 'Rental duration for this film' })
  rental_duration: number;

  @Field(() => Float, { description: 'Cost to rent this film' })
  rental_rate: number;

  @Field(() => Int, {
    description: 'Length (in minutes) of the film',
    nullable: true,
  })
  length: number;

  @Field(() => Float, { description: 'Cost to replace this film' })
  replacement_cost: number;

  @Field(() => String, {
    description: 'MPAA Rating of the film',
    nullable: true,
  })
  rating: string;

  @Field(() => String, {
    nullable: true,
    description: 'Special features included with tis film',
  })
  special_features: string;
}
