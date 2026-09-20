import { z } from 'zod';

export const dialysisSearchSchema = z.object({
  location: z.string().min(1, 'Please select a location.'),
  date: z.string().min(1, 'Please select a date.'),
  shift: z.enum(['ANY', 'MORNING', 'AFTERNOON', 'EVENING'] as const),
});

export type DialysisSearchFormData = z.infer<typeof dialysisSearchSchema>;
