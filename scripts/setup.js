const { initializeDatabase } = require('../src/lib/init-db');

async function setup() {
  console.log('🚀 Setting up REST Client Application...');
  
  try {
    // Initialize database
    await initializeDatabase();
    console.log('✅ Database initialized successfully!');
    
    console.log('\n📋 Next steps:');
    console.log('1. Run: npm run dev');
    console.log('2. Open: http://localhost:3000');
    console.log('3. Start testing HTTP APIs!');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

setup();
