import countries from 'i18n-iso-countries';
import * as z from 'zod';

export const supplierType = ['agent', 'weaver', 'dyer'] as const;

export const supplierInputs = [
  {
    name: 'name',
    label: 'form.name',
    type: 'text',
    placeholder: 'form.name',
  },
  {
    name: 'contactEmail',
    label: 'form.contact_email',
    type: 'text',
    placeholder: 'form.placeholder.email',
  },
  {
    name: 'contactFirstName',
    label: 'form.contact_first_name',
    type: 'text',
    placeholder: 'form.placeholder.first_name',
  },
  {
    name: 'contactLastName',
    label: 'form.contact_last_name',
    type: 'text',
    placeholder: 'form.placeholder.last_name',
  },

  {
    name: 'contactPhone',
    label: 'form.contact_phone',
    type: 'text',
    placeholder: 'form.placeholder.phone',
  },
  {
    name: 'address',
    label: 'form.address',
    type: 'text',
    placeholder: 'form.placeholder.address',
  },
  {
    name: 'zipCode',
    label: 'form.zip_code',
    type: 'text',
    placeholder: 'form.placeholder.zip_code',
  },
  {
    name: 'city',
    label: 'form.city',
    type: 'text',
    placeholder: 'form.placeholder.city',
  },
  {
    name: 'countryCode',
    label: 'form.country',
    type: 'countries',
    options: Object.keys(countries.getAlpha2Codes()),
    placeholder: 'form.placeholder.country',
  },
  {
    name: 'type',
    label: 'form.type',
    type: 'select',
    options: supplierType,
    placeholder: 'form.type',
  },
];

export default z.object({
  name: z.string().min(1).max(255),
  contactEmail: z.string(),
  contactFirstName: z.string(),
  contactLastName: z.string(),
  contactPhone: z.string(),
  address: z.string(),
  zipCode: z.string(),
  city: z.string(),
  countryCode: z.string(),
  type: z.enum(supplierType),
});
