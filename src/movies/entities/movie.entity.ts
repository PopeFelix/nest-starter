import { Language } from '../../languages/entities/language.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  film_id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  release_year: string;

  @Column() // This is a many to one relation on the "language" table
  language_id: number;

  @ManyToOne(() => Language, (l) => l.language_id)
  @JoinColumn({ name: 'language_id' })
  language: Language;

  @Column({
    // This is a many to one relation on the "language" table
    nullable: true,
  })
  original_language_id: number;

  @ManyToOne(() => Language, (l) => l.language_id)
  @JoinColumn({ name: 'original_language_id' })
  original_language: Language;

  @Column()
  rental_duration: number;

  @Column()
  rental_rate: number;

  @Column()
  length: number;

  @Column()
  replacement_cost: number;

  @Column({ nullable: true, default: 'G' })
  rating: string;

  @Column({
    nullable: true,
  })
  special_features: string;

  // This is automatically updated by the DB, but
  // the DB will throw an error if it's not present
  @Column({
    default: 0,
  })
  last_update: number;
}
