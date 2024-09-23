import { type NextRequest } from 'next/server'
import { updateSession } from '@/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
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