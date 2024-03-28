export type Supplier = {
  id: string;
  tenantId: string;
  name: string;
  contactEmail: string;
  contactFirstName: string;
  contactLastName: string;
  contactPhone: string;
  address: string;
  zipCode: string;
  city: string;
  countryCode: string;
  brandIds: string[];
  lastUploadDateUTC: string;
  type: 'agent' | 'weaver' | 'dyer';
};
