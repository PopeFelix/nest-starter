import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Language {
  @PrimaryGeneratedColumn()
  language_id: number;

  @Column()
  name: string;
}
