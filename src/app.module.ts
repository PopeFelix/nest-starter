import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { LanguagesModule } from './languages/languages.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from 'config/database.config';

@Module({
  imports: [
    MoviesModule,
    LanguagesModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), '/schema.gql'),
      sortSchema: true,
      playground: true,
    }),
    TypeOrmModule.forRoot(databaseConfig()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
