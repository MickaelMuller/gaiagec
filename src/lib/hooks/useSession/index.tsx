'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { deleteCookie, getCookie } from 'cookies-next';
import jwtDecode from 'jwt-decode';

import { Session } from '@/types/session';
import { COOKIES } from '@/lib/utils/constants/cookies';
import URLS from '@/lib/utils/constants/urls';

type UseSessionProps = {
  session: Session;
  logout: () => void;
};

const useSession = (): UseSessionProps => {
  const token = getCookie(COOKIES.GAIAGEC_TOKEN);
  const [session, setSession] = useState<Session>({});

  const { push } = useRouter();

  useEffect(() => {
    if (token) {
      const decodedToken: Session = jwtDecode(token as string);

      setSession(decodedToken);
    }
  }, [token]);

  const logout = () => {
    deleteCookie(COOKIES.GAIAGEC_TOKEN);
    deleteCookie(COOKIES.GAIAGEC_REFRESH_TOKEN);
    push(URLS.LOGIN);
  };

  return { session, logout };
};

export default useSession;
