import { LanguagesService } from './languages.service';
import { Repository } from 'typeorm';
import { Language } from './entities/language.entity';
import { CreateLanguageInput } from './dto/create-language.input';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('LanguagesService', () => {
  let service: LanguagesService;
  let repo: Repository<Language>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LanguagesService,
        {
          provide: getRepositoryToken(Language),
          useClass: Repository,
        },
      ],
    }).compile();
    service = module.get<LanguagesService>(LanguagesService);
    repo = module.get<Repository<Language>>(getRepositoryToken(Language));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Can create a language', async () => {
    const l: CreateLanguageInput = { name: 'Foobarese' };
    const expected: Language = { ...l, language_id: 999 };
    const findOneSpy = jest
      .spyOn(repo, 'findOne')
      .mockResolvedValueOnce(undefined);
    const createSpy = jest.spyOn(repo, 'create').mockReturnValueOnce(expected);
    const saveSpy = jest.spyOn(repo, 'save').mockResolvedValueOnce(expected);
    await expect(service.create(l)).resolves.toBeTruthy();
    expect(findOneSpy).toHaveBeenCalledWith({ where: { name: l.name } });
    expect(createSpy).toHaveBeenCalledWith(l);
    expect(saveSpy).toHaveBeenCalled();
  });

  it('Throws an error when attempting to create a language that is already registered', async () => {
    const l: CreateLanguageInput = { name: 'Bazbarfooish' };
    const findOneSpy = jest
      .spyOn(repo, 'findOne')
      .mockResolvedValueOnce({ language_id: 1000, ...l });
    const createSpy = jest.spyOn(repo, 'create');
    const saveSpy = jest.spyOn(repo, 'save');
    await expect(service.create(l)).rejects.toBeInstanceOf(BadRequestException);
    expect(findOneSpy).toHaveBeenCalledWith({ where: { name: l.name } });
    expect(createSpy).not.toHaveBeenCalled();
    expect(saveSpy).not.toHaveBeenCalled();
  });

  it('Can find all languages', async () => {
    const spy = jest.spyOn(repo, 'find').mockResolvedValueOnce([]);
    await expect(service.findAll()).resolves.not.toThrow();
    expect(spy).toHaveBeenCalled();
  });

  it('Can find a language by ID', async () => {
    const l: Language = { language_id: 1, name: 'Quuxish' };
    const spy = jest.spyOn(repo, 'findOne').mockResolvedValueOnce(l);
    await expect(service.findOne(l.language_id)).resolves.toEqual(l);
    expect(spy).toHaveBeenCalledWith({ where: { language_id: l.language_id } });
  });

  it('Throws an error when no language is registered with a given ID', async () => {
    const l: Language = { language_id: 10, name: 'Quuxish' };
    jest.spyOn(repo, 'findOne').mockResolvedValueOnce(undefined);
    await expect(service.findOne(l.language_id)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('Can find a language by name', async () => {
    const l: Language = { language_id: 2, name: 'Quuyish' };
    const spy = jest.spyOn(repo, 'find').mockResolvedValueOnce([l]);
    await expect(service.find({ name: l.name })).resolves.toEqual([l]);
    expect(spy).toHaveBeenCalledWith({ where: { name: l.name } });
  });

  it('Can update a language', async () => {
    const l: Language = { language_id: 3, name: 'Quuzish' };
    const newName = 'Bazish';
    const findOneSpy = jest.spyOn(repo, 'findOne').mockResolvedValueOnce(l);

    // We don't care about the result of update()
    const updateSpy = jest.spyOn(repo, 'update').mockResolvedValue({} as any);
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

  it('Throws an error when trying to update a language that is not registered', async () => {
    const l: Language = { language_id: 30, name: 'Quuzish' };
    const newName = 'Bazish';
    const findOneSpy = jest
      .spyOn(repo, 'findOne')
      .mockResolvedValueOnce(undefined);

    const updateSpy = jest.spyOn(repo, 'update').mockResolvedValue(undefined);
    await expect(
      service.update(l.language_id, { ...l, name: newName }),
    ).rejects.toBeInstanceOf(NotFoundException);
    expect(updateSpy).not.toHaveBeenCalled();
    expect(findOneSpy).toHaveBeenCalledWith({
      where: { language_id: l.language_id },
    });
  });

  it('Can delete a language', async () => {
    const language_id = 4;
    const findOneSpy = jest
      .spyOn(repo, 'findOne')
      .mockResolvedValueOnce({ language_id, name: 'Barbazbak' });

    // We don't care about the result of delete()
    const deleteSpy = jest
      .spyOn(repo, 'delete')
      .mockResolvedValueOnce({} as any);
    await expect(service.remove(language_id)).resolves.not.toThrow();
    expect(findOneSpy).toHaveBeenCalledWith({ where: { language_id } });
    expect(deleteSpy).toHaveBeenCalledWith(language_id);
  });

  it('throws an error when trying to delete a language that is not registered', async () => {
    const language_id = 40;
    const findOneSpy = jest
      .spyOn(repo, 'findOne')
      .mockResolvedValueOnce(undefined);

    const deleteSpy = jest
      .spyOn(repo, 'delete')
      .mockResolvedValueOnce(undefined);
    await expect(service.remove(language_id)).rejects.toBeInstanceOf(
      NotFoundException,
    );
    expect(findOneSpy).toHaveBeenCalledWith({ where: { language_id } });
    expect(deleteSpy).not.toHaveBeenCalled();
  });
});
