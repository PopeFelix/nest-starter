import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';
import { CreateMovieInput } from 'src/movies/dto/create-movie.input';

export class Datastore {
  private static instance: Datastore;
  private constructor(
    private db: Database<sqlite3.Database, sqlite3.Statement>,
  ) {}

  public static async Factory(dbfile: string) {
    if (!Datastore.instance) {
      const db = await open({
        filename: dbfile,
        driver: sqlite3.Database,
      });
      Datastore.instance = new Datastore(db);
    }
    return Datastore.instance;
  }

  public async getMovie(film_id: number, fields?: string[]) {
    console.debug(`GET movie ${film_id}. Fields: `, fields || 'ALL');

    const query =
      `SELECT ` +
      (fields ? fields.join(',') : '*') +
      ' FROM film WHERE film_id=?';
    const result = await this.db.get(query, film_id);
    return result;
  }

  public async searchLanguage(language: string) {
    console.debug(`SEARCH for language "${language}"`);
    const query = 'SELECT * FROM language WHERE name=?';
    const result = await this.db.get(query, language);
    return result;
  }

  public async newLanguage(language: string) {
    console.debug(`NEW LANGUAGE "${language}"`);
    const query = 'INSERT INTO language (name) VALUES (?)';
    const result = await this.db.run(query, language);
    console.debug('Create new language successful', result);
    return result.lastID;
  }

  public async newMovie(movie: CreateMovieInput) {
    console.debug('CREATE movie', movie);

    const getLanguageId = async (language: string) => {
      const res = await this.searchLanguage(language);
      console.debug('searchLanguage returned', res);
      if (!res.language_id) {
        throw new Error(`No language ID found for language "${language}"`);
      }
      return res.language_id;
    };

    const language_id = await getLanguageId(movie.language);
    let original_langage_id: number | null;
    if (movie.original_language) {
      original_langage_id = await getLanguageId(movie.original_language);
    } else {
      original_langage_id = null;
    }
    const query =
      'INSERT INTO film ' +
      '(title, release_year, language_id, original_langage_id, ' +
      'rental_duration, rental_rate, replacement_cost, special_features)' +
      ' VALUES (?,?,?,?,?,?,?,?)';
    const result = await this.db.run(query, [
      movie.title,
      movie.release_year || null,
      language_id,
      original_langage_id,
      movie.rental_duration,
      movie.rental_rate,
      movie.replacement_cost,
      movie.special_features,
    ]);
    console.debug('Create new movie successful', result);
    return result.lastID;
  }
}
