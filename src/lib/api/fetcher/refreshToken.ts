import axios from 'axios';

import { RefreshTokenParams, RefreshTokenResult } from '@/types/api/refreshToken';

const refreshTokenRequest = async ({
  refreshToken,
  token,
}: RefreshTokenParams): Promise<RefreshTokenResult> => {
  try {
    const response = await axios({
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_API_URL}/authentication/refresh`,
      data: {
        refreshToken,
        token,
      },
    });

    const newToken = response.data.token;
    const newRefreshToken = response.data.refreshToken;

    return { newToken, newRefreshToken };
  } catch (error) {
    return undefined;
  }
};

export default refreshTokenRequest;
