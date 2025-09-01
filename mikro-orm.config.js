const { defineConfig } = require('@mikro-orm/core');
const { SqliteDriver } = require('@mikro-orm/sqlite');
const { RequestHistorySchema } = require('./src/entities/RequestHistory');

module.exports = defineConfig({
  driver: SqliteDriver,
  dbName: 'rest-client.db',
  entities: [RequestHistorySchema],
  migrations: {
    path: './src/migrations',
    pattern: /^[\w-]+\d+\.(ts|js)$/,
  },
  cache: {
    enabled: false,
  },
  debug: false,
  seeder: {
    path: './src/seeders',
    defaultSeeder: 'DatabaseSeeder',
  },
});
