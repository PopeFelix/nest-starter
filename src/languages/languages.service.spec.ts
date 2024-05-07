//import { TestBed } from '@automock/jest';
import { LanguagesService } from './languages.service';
import { Repository } from 'typeorm';
import { Language } from './entities/language.entity';
import { CreateLanguageInput } from './dto/create-language.input';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('LanguagesService', () => {
  let service: LanguagesService;
  let repo: Repository<Language>;

  // beforeAll(() => {
  //   const { unit, unitRef } = TestBed.create(LanguagesService).compile();

  //   service = unit;
  //   mockRepo = unitRef.get(Repository<Language>);
  // });

  beforeEach(async () => {
    // mockRepo = {
    //   find: jest.fn(),
    //   findOne: jest.fn(),
    //   create: jest.fn(),
    //   save: jest.fn(),
    //   update: jest.fn(),
    //   delete: jest.fn(),
    // } as unknown as jest.Mocked<Repository<Language>>;
    const module: TestingModule = await Test.createTestingModule({
      providers: [LanguagesService, Repository<Language>],
    })
      // .overrideProvider(Repository<Language>)
      // .useValue(mockRepo)
      .compile();
    service = module.get<LanguagesService>(LanguagesService);
    repo = module.get<Repository<Language>>(getRepositoryToken(Language));
  });
  beforeEach(async () => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Can create a language', async () => {
    const l: CreateLanguageInput = { name: 'Foobarese' };
    const findOneSpy = jest
      .spyOn(repo, 'findOne')
      .mockResolvedValueOnce(undefined);
    const createSpy = jest.spyOn(repo, 'create');
    const saveSpy = jest
      .spyOn(repo, 'save')
      .mockResolvedValueOnce({ ...l, language_id: 999 });
    await expect(service.create(l)).resolves.toBeInstanceOf(Language);
    expect(findOneSpy).toHaveBeenCalledWith({ where: { name: l.name } });
    expect(createSpy).toHaveBeenCalledWith(l);
    expect(saveSpy).toHaveBeenCalled();
  });

  it('Can find all languages', async () => {
    const spy = jest.spyOn(repo, 'find');
    await expect(service.findAll()).resolves.not.toThrow();
    expect(spy).toHaveBeenCalled();
  });

  it('Can find a language by ID', async () => {
    const l: Language = { language_id: 1, name: 'Quuxish' };
    const spy = jest.spyOn(repo, 'findOne').mockResolvedValueOnce(l);
    await expect(service.findOne(l.language_id)).resolves.toEqual(l);
    expect(spy).toHaveBeenCalledWith(l.language_id);
  });

  it('Can find a language by name', async () => {
    const l: Language = { language_id: 2, name: 'Quuyish' };
    const spy = jest.spyOn(repo, 'find').mockResolvedValueOnce([l]);
    await expect(service.find({ name: l.name })).resolves.toEqual(l);
    expect(spy).toHaveBeenCalledWith({ name: l.name });
  });

  it('Can update a language', async () => {
    const l: Language = { language_id: 3, name: 'Quuzish' };
    const newName = 'Bazish';
    const findOneSpy = jest.spyOn(repo, 'findOne').mockResolvedValueOnce(l);
    const updateSpy = jest.spyOn(repo, 'update');
    await expect(
      service.update(l.language_id, { ...l, name: newName }),
    ).resolves.not.toThrow();
    expect(updateSpy).toHaveBeenCalledWith(l.language_id, {
      name: newName,
    });
    expect(findOneSpy).toHaveBeenCalledWith({
      where: { language_id: l.language_id },
    });
  });

  it('Can delete a language', async () => {
    const language_id = 4;
    const findOneSpy = jest
      .spyOn(repo, 'findOne')
      .mockResolvedValueOnce({ language_id, name: 'Barbazbak' });
    const deleteSpy = jest.spyOn(repo, 'delete');
    await expect(service.remove(language_id)).resolves.not.toThrow();
    expect(findOneSpy).toHaveBeenCalledWith({ where: { language_id } });
    expect(deleteSpy).toHaveBeenCalledWith(language_id);
  });
});
