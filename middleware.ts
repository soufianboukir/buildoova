import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './auth';

const publicPaths = ['/', '/login'];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isPublic = publicPaths.includes(pathname);

    const session = await auth();

    if (isPublic) {
        return NextResponse.next();
    }

    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
