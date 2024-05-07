import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLanguageInput } from './dto/create-language.input';
import { UpdateLanguageInput } from './dto/update-language.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Language } from './entities/language.entity';

@Injectable()
export class LanguagesService {
  constructor(@InjectRepository(Language) private repo: Repository<Language>) {}
  async create(createLanguageInput: CreateLanguageInput) {
    const { name } = createLanguageInput;
    const check = await this.repo.findOne({ where: { name } });

    if (check) throw new BadRequestException('Language already registered');

    const language = this.repo.create({ name });
    return await this.repo.save(language);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(language_id: number) {
    const lang = await this.repo.findOne({ where: { language_id } });
    if (!lang) {
      throw new NotFoundException('Language not found');
    }
    return lang;
  }

  async find(where: Partial<Language>) {
    return await this.repo.find({ where });
  }

  async update(language_id: number, updateLanguageInput: UpdateLanguageInput) {
    const { name } = updateLanguageInput;
    const lang = await this.repo.findOne({ where: { language_id } });
    if (!lang) {
      throw new NotFoundException('Language not found');
    }
    await this.repo.update(language_id, { name });
    return;
  }

  async remove(language_id: number) {
    const lang = await this.repo.findOne({ where: { language_id } });
    if (!lang) {
      throw new NotFoundException('Language not found');
    }
    await this.repo.delete(language_id);
    return;
  }
}
