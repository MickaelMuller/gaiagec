'use client';

import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import jwtDecode from 'jwt-decode';

import { COOKIES } from '@/lib/utils/constants/cookies';

type Session = {
  sub?: string;
  jti?: string;
  iat?: number;
  exp?: number;
  userId?: string;
  userName?: string;
  email?: string;
  tenantId?: string;
  tenantName?: string;
  firstName?: string;
  lastName?: string;
  iss?: string;
  aud?: string;
};

const useSession = (): Session | undefined => {
  const token = getCookie(COOKIES.GAIAGEC_TOKEN);
  const [session, setSession] = useState<Session>({});

  useEffect(() => {
    if (token) {
      const decodedToken: Session = jwtDecode(token as string);

      setSession(decodedToken);
    }
  }, [token]);

  return session;
};

export default useSession;
