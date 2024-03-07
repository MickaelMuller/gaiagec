export type CertificatesDistribution = {
  total: number;
  distribution: Distribution[];
};

export type CertificatesCollection = {
  total: number;
  certificates: Certificate[];
};

export type Certificate = {
  brandId: string;
  fileContentType: string;
  fileLength: number;
  fileName: string;
  fileUri: string;
  name: string;
  reference: string;
  status: string;
  supplierId: string;
  supplierName: string;
  tenantId: string;
  validFrom: string;
  validTo: string;
  visibility: string;
};

export type CertificatesStatus = 'expired' | 'expireSoon' | 'valid';

type Distribution = {
  status: CertificatesStatus;
  quantity: number;
  percentage: number;
};
