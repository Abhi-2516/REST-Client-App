import { NextResponse } from 'next/server';
import { getEntityManager, RequestHistory } from '../../../lib/database';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 20;
    const offset = (page - 1) * limit;

    const em = await getEntityManager();

    // Get total count for pagination
    const totalCount = await em.count(RequestHistory);

    // Get paginated results with optimized query
    const history = await em.find(RequestHistory, {}, {
      orderBy: { createdAt: 'DESC' },
      limit,
      offset,
      fields: ['id', 'method', 'url', 'status', 'responseTime', 'createdAt'], // Only fetch necessary fields for list view
    });

    return NextResponse.json({
      data: history,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
        hasNext: page < Math.ceil(totalCount / limit),
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error('History fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch history' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

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

    await em.removeAndFlush(requestHistory);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete request' },
      { status: 500 }
    );
  }
}
