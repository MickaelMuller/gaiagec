export type CertificatesDistribution = {
  total: number;
  distribution: Distribution[];
};

export type CertificatesCollection = {
  total: number;
  certificates: Certificate[];
};

type Certificate = {
  tenantId: string;
  brandId: string;
  name: string;
  supplierId: string;
  supplierName: string;
  status: string;
  visibility: string;
  validFrom: string;
  validTo: string;
  url: string;
};

export type CertificatesStatus = 'expired' | 'expireSoon' | 'valid';

type Distribution = {
  status: CertificatesStatus;
  quantity: number;
  percentage: number;
};
