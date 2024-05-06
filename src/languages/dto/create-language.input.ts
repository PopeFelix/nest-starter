import { InputType, Field, OmitType } from '@nestjs/graphql';
import { UpdateLanguageInput } from './update-language.input';

@InputType()
export class CreateLanguageInput extends OmitType(UpdateLanguageInput, [
  'language_id',
]) {
  @Field(() => String, { description: 'Name of the language' })
  name: string;
}
