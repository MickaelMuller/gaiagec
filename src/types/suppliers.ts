export type Supplier = {
  id: string;
  tenantId: string;
  name: string;
  contactEmail: string | null;
  contactFirstName: string | null;
  contactLastName: string | null;
  contactPhone: string | null;
  address: string | null;
  zipCode: string | null;
  city: string | null;
  countryCode: string;
};
