import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicPaths = ['/', '/login'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isPublic = publicPaths.includes(pathname);

    const token = request.cookies.get('next-auth.session-token') || request.cookies.get('__Secure-next-auth.session-token');

    if (isPublic || token) {
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
    matcher: ['/((?!_next|api|favicon.ico|images|static|.*\\..*).*)'],
};
