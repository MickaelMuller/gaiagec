import * as z from 'zod';

export const certificateType = [
  'oekotex',
  'gots',
  'ecocert',
  'bluesign',
  'fairetrade',
  'ecolabelEuropeen',
  'demeter',
  'biore',
] as const;

export default z.object({
  reference: z.string().min(1, { message: 'Reference required' }),
  certificateType: z.enum(certificateType),
  supplierId: z.string(),
  validFrom: z.date(),
  validTo: z.date(),
  file:
    typeof window === 'undefined'
      ? z.any()
      : z.instanceof(FileList).refine((file) => file?.length === 1, 'File is required.'),
});
