// https://stackoverflow.com/a/61301891/132319
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

export const TypeOrmSqliteTestingModule = (entities: EntityClassOrSchema[]) => [
  TypeOrmModule.forRoot({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: true,
    entities,
    synchronize: true,
  }),
  TypeOrmModule.forFeature(entities),
];
