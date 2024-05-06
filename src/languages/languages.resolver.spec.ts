import { Test, TestingModule } from '@nestjs/testing';
import { LanguagesResolver } from './languages.resolver';
import { LanguagesService } from './languages.service';

describe('LanguagesResolver', () => {
  let resolver: LanguagesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LanguagesResolver, LanguagesService],
    }).compile();

    resolver = module.get<LanguagesResolver>(LanguagesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
