// https://stackoverflow.com/a/76776080/132319
import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs('database', (): TypeOrmModuleOptions => {
  const dbPath = __dirname + '/' + process.env.DATABASE_FILE;
  console.log(`Reading database from ${dbPath}`);

  return {
    type: 'sqlite',
    database: dbPath,
    autoLoadEntities: true,
  };
});
