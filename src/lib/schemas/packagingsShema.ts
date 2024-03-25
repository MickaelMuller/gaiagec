import * as z from 'zod';

export const packagingType = ['other', 'eCommerce', 'shop'] as const;

export const packagingVeryHighConcernSubstanceStatus = ['none', 'presence', 'scan'] as const;

export const packagingRecyclability = ['mostly', 'fully', 'sameNature', 'reusable'] as const;

export const packagingInputs = [
  {
    name: 'reference',
    label: 'form.reference',
    type: 'text',
    placeholder: 'form.reference',
  },
  {
    name: 'name',
    label: 'form.name',
    type: 'text',
    placeholder: 'form.name',
  },
  {
    name: 'additionalInformations',
    label: 'form.additional_information',
    type: 'text',
    placeholder: 'form.additional_information',
  },
  {
    name: 'description',
    label: 'form.description',
    type: 'text',
    placeholder: 'form.description',
  },
  {
    name: 'type',
    label: 'form.type',
    type: 'select',
    options: packagingType,
    placeholder: 'form.type',
  },
  {
    name: 'recyclability',
    label: 'form.recyclability',
    type: 'select',
    options: packagingRecyclability,
    placeholder: 'form.recyclability',
  },
  {
    name: 'recycledMaterialRatio',
    label: 'form.recycledMaterialRatio',
    type: 'number',
    placeholder: 22.22,
  },
  {
    name: 'veryHighConcernSubstanceNames',
    label: 'form.veryHighConcernSubstanceNames',
    type: 'text',
    placeholder: 'form.names',
  },
  {
    name: 'veryHighConcernSubstanceStatus',
    label: 'form.veryHighConcernSubstanceStatus',
    type: 'select',
    options: packagingVeryHighConcernSubstanceStatus,
    placeholder: 'form.status',
  },
];

export default z.object({
  reference: z.string().min(1).max(255),
  name: z.string().min(1).max(255),
  additionalInformations: z.string().optional(),
  description: z.string().optional(),
  type: z.enum(packagingType),
  recyclability: z.enum(packagingRecyclability),
  recycledMaterialRatio: z.coerce.number().min(0).max(100),
  veryHighConcernSubstanceNames: z.string().min(1).max(255),
  veryHighConcernSubstanceStatus: z.enum(packagingVeryHighConcernSubstanceStatus),
});
