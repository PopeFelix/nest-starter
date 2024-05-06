import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateLanguageInput {
  @Field(() => Int, { description: 'Unique ID for this language' })
  language_id: number;

  @Field(() => String, { description: 'Name of the language' })
  name: string;
}
