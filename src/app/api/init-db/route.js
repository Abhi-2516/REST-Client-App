import { initializeDatabase } from '../init-db';

export async function POST() {
  try {
    await initializeDatabase();
    return Response.json({ success: true, message: 'Database initialized successfully' });
  } catch (error) {
    console.error('Database initialization error:', error);
    return Response.json(
      { success: false, error: 'Failed to initialize database' },
      { status: 500 }
    );
  }
}
