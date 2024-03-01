export type RefreshTokenResponse = {
  newToken: string;
  newRefreshToken: string;
};

export type RefreshTokenParams = {
  refreshToken: string;
  token: string;
};

export type RefreshTokenResult = RefreshTokenResponse | undefined;
