const { initDatabase } = require('./database');

async function initializeDatabase() {
  try {
    console.log('Initializing database...');
    await initDatabase();
    console.log('Database initialized successfully!');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  initializeDatabase();
}

module.exports = { initializeDatabase };
