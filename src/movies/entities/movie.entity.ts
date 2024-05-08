import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  film_id: number;

  @Column()
  title: string;

  @Column()
  release_year: string;

  @Column() // This is a many to one relation on the "language" table
  language_id: number;

  @Column({
    // This is a many to one relation on the "language" table
    nullable: true,
  })
  original_language_id: number;

  @Column()
  rental_duration: number;

  @Column()
  rental_rate: number;

  @Column()
  length: number;

  @Column()
  replacement_cost: number;

  @Column()
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
