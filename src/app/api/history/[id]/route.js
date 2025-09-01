import { NextResponse } from 'next/server';
import { getEntityManager, RequestHistory } from '../../../../lib/database';

export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    const em = await getEntityManager();
    const requestHistory = await em.findOne(RequestHistory, { id: parseInt(id) });

    if (!requestHistory) {
      return NextResponse.json(
        { error: 'Request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(requestHistory);
  } catch (error) {
    console.error('Fetch request error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch request' },
      { status: 500 }
    );
  }
}
