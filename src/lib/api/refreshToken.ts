import axios from 'axios';

import { RefreshTokenParams, RefreshTokenResponse } from '../../types/api/refreshToken';

const refreshToken = async ({
  refreshToken,
  token,
}: RefreshTokenParams): Promise<RefreshTokenResponse> => {
  const response = await axios({
    method: 'POST',
    url: `${process.env.NEXT_PUBLIC_API_URL}/authentication/refresh`,
    data: {
      refreshToken,
      token,
    },
  });

  if (response?.data?.token && response?.data?.refreshToken) {
    return { newToken: response?.data?.token, newRefreshToken: response?.data?.refreshToken };
  }

  throw new Error('Invalid response from refresh token request');
};

export default refreshToken;
