import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Language {
  @PrimaryGeneratedColumn()
  language_id: number;

  @Column()
  name: string;

  // This is automatically updated by the DB, but
  // the DB will throw an error if it's not present
  @Column({ default: 0 })
  last_update: number;
}
