export type CertificatesDistribution = {
  total: number;
  distribution: Distribution[];
};

export type Certificate = {
  brandId: string;
  reference: string;
  status: string;
  supplierId: string;
  supplierName: string;
  tenantId: string;
  validFrom: string;
  validTo: string;
  visibility: string;
  file: {
    contentType: string;
    length: number;
    name: string;
    uri: string;
  };
};

export type CertificatesStatus = 'expired' | 'expireSoon' | 'valid';

type Distribution = {
  status: CertificatesStatus;
  quantity: number;
  percentage: number;
};
