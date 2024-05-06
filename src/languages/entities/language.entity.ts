import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Language {
  @Field(() => Int, { description: 'Unique ID for this language' })
  language_id: number;

  @Field(() => String, { description: 'Name of the language' })
  name: string;
}
