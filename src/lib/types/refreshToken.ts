export type RefreshTokenProps = {
  refreshToken: string;
  token: string;
};

export type RefreshTokenResponse = {
  newToken: string;
  newRefreshToken: string;
};
