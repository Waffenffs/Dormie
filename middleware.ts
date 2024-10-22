import { type NextRequest } from 'next/server'
import { type FILTERS } from './app/lib/constants';

import { NextResponse } from 'next/server';
import { updateSession } from '@/supabase/middleware'

export async function middleware(request: NextRequest) {
  const requestPathname = request.nextUrl.pathname;

  if (requestPathname.startsWith('/listings/explore')) {
    await updateSession(request);

    const searchParams = request.nextUrl.searchParams;

    const filters: FILTERS = {
      dorm_type: searchParams.get('dorm_type'),
      gender_pref: searchParams.get('gender_pref'),
      amenities: searchParams.get('amenities'),
      pricing: searchParams.get('pricing'),
      rooms: searchParams.get('rooms')
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('filters', JSON.stringify(filters));

    return NextResponse.next({
      request: { headers: requestHeaders }
    });
  }

  return await updateSession(request);
}

// Modify matcher for routes that don't access supabase
// When protecting pages, always make sure to check using: 
// supabase.auth.getUser() NOT supabase.auth.getSession()
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}