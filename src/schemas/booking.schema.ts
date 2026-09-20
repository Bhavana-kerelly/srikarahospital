import { z } from 'zod';

export const patientBookingSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name cannot exceed 100 characters'),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit mobile number'),
  age: z
    .number({ message: 'Age must be a number' })
    .min(1, 'Please enter a valid age')
    .max(120, 'Please enter a valid age')
    .optional(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
  medicalRecordNumber: z.string().optional(),
  notes: z.string().max(500, 'Notes cannot exceed 500 characters').optional(),
});

export type PatientBookingFormData = z.infer<typeof patientBookingSchema>;
