import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Matcher to match all pages except static files
  matcher: ['/', '/(bn|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};