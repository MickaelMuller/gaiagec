import dayjs from 'dayjs';

export const COOKIES = {
  GAIAGEC_TOKEN: 'gaia-token',
  GAIAGEC_REFRESH_TOKEN: 'gaia-refresh-token',
};

export const expires = dayjs(new Date()).add(6, 'day').toDate();
