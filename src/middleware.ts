import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { COOKIES } from './lib/utils/constants/cookies';
import URLS, { AUTHENTICATED_ROUTES } from './lib/utils/constants/urls';

// TODO: Add a check on each prop from decoded token
export async function middleware(req: NextRequest) {
  const { pathname: nextUrl } = req.nextUrl;

  const hasUserTokens =
    !!req.cookies.get(COOKIES.GAIAGEC_TOKEN) && !!req.cookies.get(COOKIES.GAIAGEC_REFRESH_TOKEN);

  const isAuthenticatedRoute = AUTHENTICATED_ROUTES?.some((route) => nextUrl.startsWith(route));

  if (isAuthenticatedRoute && !hasUserTokens) {
    return NextResponse.redirect(new URL(URLS.LOGIN, req.url));
  }

  if ((nextUrl === URLS.LOGIN || nextUrl === URLS.REGISTER) && hasUserTokens) {
    return NextResponse.redirect(new URL(URLS.DASHBOARD, req.url));
  }

  return NextResponse.next();
}
