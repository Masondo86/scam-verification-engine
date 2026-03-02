import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function isAuthorized(req: NextRequest, scope: 'admin' | 'medical') {
  const urlToken = req.nextUrl.searchParams.get('token');
  const cookieToken = req.cookies.get(`${scope}_portal_token`)?.value;
  const bearer = req.headers.get('authorization')?.replace('Bearer ', '');
  const expected =
    scope === 'admin'
      ? process.env.ADMIN_PORTAL_TOKEN
      : process.env.MEDICAL_PORTAL_TOKEN;

  if (!expected) return true;

  return [urlToken, cookieToken, bearer].includes(expected);
}

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/admin-portal')) {
    if (!isAuthorized(req, 'admin')) {
      return NextResponse.redirect(new URL('/scan', req.url));
    }
  }

  if (req.nextUrl.pathname.startsWith('/medical-portal')) {
    if (!isAuthorized(req, 'medical')) {
      return NextResponse.redirect(new URL('/scan', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin-portal/:path*', '/medical-portal/:path*'],
};
