import { NextResponse } from 'next/server';
import axios from 'axios';
import { getEntityManager, RequestHistory } from '../../../lib/database';

export async function POST(request) {
  try {
    const body = await request.json();
    const { method, url, headers = {}, body: requestBody } = body;

    if (!method || !url) {
      return NextResponse.json(
        { error: 'Method and URL are required' },
        { status: 400 }
      );
    }

    const startTime = Date.now();
    let response;
    let responseData;
    let responseHeaders = {};
    let status = 500;

    try {
      const axiosConfig = {
        method: method.toLowerCase(),
        url,
        headers,
        timeout: 30000, // 30 seconds timeout
        validateStatus: () => true, // Don't throw on any status code
      };

      if (requestBody && ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
        axiosConfig.data = requestBody;
      }

      response = await axios(axiosConfig);
      status = response.status;
      responseData = response.data;
      responseHeaders = response.headers;
    } catch (error) {
      if (error.response) {
        status = error.response.status;
        responseData = error.response.data;
        responseHeaders = error.response.headers;
      } else if (error.code === 'ECONNABORTED') {
        status = 408;
        responseData = { error: 'Request timeout' };
      } else {
        status = 500;
        responseData = { error: error.message };
      }
    }

    const responseTime = Date.now() - startTime;

    // Save to database
    const em = await getEntityManager();
    const requestHistory = new RequestHistory({
      method: method.toUpperCase(),
      url,
      headers,
      body: requestBody,
      status,
      responseHeaders,
      responseBody: typeof responseData === 'string' ? responseData : JSON.stringify(responseData),
      responseTime,
    });

    await em.persistAndFlush(requestHistory);

    return NextResponse.json({
      status,
      headers: responseHeaders,
      data: responseData,
      responseTime,
      id: requestHistory.id,
    });
  } catch (error) {
    console.error('Request error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
