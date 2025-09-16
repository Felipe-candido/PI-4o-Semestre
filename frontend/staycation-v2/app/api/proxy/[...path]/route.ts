import { NextResponse } from 'next/server'

const BACKEND_URL = 'http://127.0.0.1:8000'
const NGROK_DOMAIN = '9b63e1766156.ngrok-free.app'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Max-Age': '86400'
}

async function handleRequest(request: Request, params: { path: string[] }) {
  const path = Array.isArray(params.path) ? params.path.join('/') : params.path
  const pathWithSlash = path.endsWith('/') ? path : `${path}/`

  // Get cookies from request
  const cookie = request.headers.get('cookie') || '';
  const token = cookie.split(';').find(c => c.trim().startsWith('access_token='));

  const headers = new Headers({
    'Content-Type': 'application/json',
    'X-Forwarded-Host': NGROK_DOMAIN,
    'X-Forwarded-Proto': 'https',
    'Host': NGROK_DOMAIN,
  });

  // Add Authorization header if token exists
  if (token) {
    const tokenValue = token.split('=')[1];
    headers.set('Authorization', `Bearer ${tokenValue}`);
  }
  
  try {
    const response = await fetch(`${BACKEND_URL}/api/${pathWithSlash}`, {
      method: request.method,
      headers,
      credentials: 'include',
      body: request.method !== 'GET' ? await request.text() : undefined,
    });

    const data = await response.json();

    const responseHeaders = new Headers(corsHeaders);
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() === 'set-cookie') {
        responseHeaders.append(key, value);
      }
    });

    return NextResponse.json(data, {
      status: response.status,
      headers: corsHeaders
    })
  } catch (error) {
    console.error('Proxy error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500, headers: corsHeaders }
    )
  }
}

export async function GET(
  request: Request,
  { params }: { params: { path: string[] } }
) {
  const pathParams = await Promise.resolve(params)
  return handleRequest(request, pathParams)
}

export async function POST(
  request: Request,
  { params }: { params: { path: string[] } }
) {
  const pathParams = await Promise.resolve(params)
  return handleRequest(request, pathParams)
}

export async function PUT(
  request: Request,
  { params }: { params: { path: string[] } }
) {
  const pathParams = await Promise.resolve(params)
  return handleRequest(request, pathParams)
}

export async function DELETE(
  request: Request,
  { params }: { params: { path: string[] } }
) {
  const pathParams = await Promise.resolve(params)
  return handleRequest(request, pathParams)
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders
  })
}