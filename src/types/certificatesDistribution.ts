export type CertificatesDistribution = {
  total: number;
  distribution: Distribution[];
};

type Distribution = {
  status: CertificatStatus;
  quantity: number;
  percentage: number;
};

export type CertificatStatus = 'valid' | 'expired' | 'expireSoon';
