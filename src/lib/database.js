const { MikroORM } = require('@mikro-orm/core');
const { SqliteDriver } = require('@mikro-orm/sqlite');
const { RequestHistory, RequestHistorySchema } = require('../entities/RequestHistory');

let orm;

async function initDatabase() {
  if (!orm) {
    orm = await MikroORM.init({
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
    });
    
    // Create schema if it doesn't exist
    try {
      const generator = orm.getSchemaGenerator();
      await generator.createSchema();
    } catch (error) {
      // If table already exists, that's fine - just continue
      if (error.message && error.message.includes('already exists')) {
        console.log('Database schema already exists, continuing...');
      } else {
        throw error;
      }
    }
  }
  return orm;
}

async function getEntityManager() {
  const orm = await initDatabase();
  return orm.em.fork();
}

module.exports = { initDatabase, getEntityManager, RequestHistory };
