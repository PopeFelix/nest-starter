import { Language } from '../../languages/entities/language.entity';

export const languages: Language[] = [
  { language_id: 1, name: 'English', last_update: Date.now(), movies: [] },
  { language_id: 2, name: 'Spanish', last_update: Date.now(), movies: [] },
  { language_id: 3, name: 'Swahili', last_update: Date.now(), movies: [] },
];
