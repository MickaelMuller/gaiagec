import axios from 'axios';

type RefreshTokenProps = {
  refreshToken: string | undefined;
  token: string | undefined;
};

type RefreshTokenResponse = {
  newToken: string;
  newRefreshToken: string;
};

type RefreshTokenError = any;

type RefreshTokenResult = RefreshTokenError | RefreshTokenResponse;

const refreshTokenRequest = async ({
  refreshToken,
  token,
}: RefreshTokenProps): Promise<RefreshTokenResult> => {
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
    return error;
  }
};

export default refreshTokenRequest;
