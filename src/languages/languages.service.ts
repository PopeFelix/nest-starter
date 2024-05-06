import { Injectable } from '@nestjs/common';
import { CreateLanguageInput } from './dto/create-language.input';
import { UpdateLanguageInput } from './dto/update-language.input';

@Injectable()
export class LanguagesService {
  create(createLanguageInput: CreateLanguageInput) {
    return 'This action adds a new language';
  }

  findAll() {
    return `This action returns all languages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} language`;
  }

  update(id: number, updateLanguageInput: UpdateLanguageInput) {
    return `This action updates a #${id} language`;
  }

  remove(id: number) {
    return `This action removes a #${id} language`;
  }
}
