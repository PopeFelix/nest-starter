import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesResolver } from './movies.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { LanguagesModule } from 'src/languages/languages.module';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), LanguagesModule],
  providers: [MoviesResolver, MoviesService],
})
export class MoviesModule {}
