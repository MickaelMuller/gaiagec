export type Session = {
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
