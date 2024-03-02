export type CertificatesDistribution = {
  total: number;
  distribution: Distribution[];
};

type Distribution = {
  status: string;
  quantity: number;
  percentage: number;
};
