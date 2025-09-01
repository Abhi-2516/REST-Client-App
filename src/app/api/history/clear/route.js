import { NextResponse } from 'next/server';
import { getEntityManager, RequestHistory } from '../../../../lib/database';

export async function DELETE() {
  try {
    const em = await getEntityManager();
    
    // Clear all history
    await em.nativeDelete(RequestHistory, {});

    return NextResponse.json({ success: true, message: 'All history cleared' });
  } catch (error) {
    console.error('Clear history error:', error);
    return NextResponse.json(
      { error: 'Failed to clear history' },
      { status: 500 }
    );
  }
}
