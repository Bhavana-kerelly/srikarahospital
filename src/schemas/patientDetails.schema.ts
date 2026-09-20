import { z } from 'zod';

export const patientDetailsSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Please enter your full name (minimum 2 characters).')
    .max(100, 'Full name cannot exceed 100 characters.')
    .regex(/^[a-zA-Z\s.'-]+$/, 'Name can only contain alphabetic letters and spaces.'),
  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number.'),
  email: z
    .string()
    .email('Please enter a valid email address.')
    .or(z.literal(''))
    .optional(),
  age: z
    .number()
    .int('Age must be a whole number.')
    .min(1, 'Age must be at least 1 year.')
    .max(120, 'Please enter a valid age.')
    .optional(),
  gender: z
    .enum(['MALE', 'FEMALE', 'OTHER'] as const)
    .optional(),
  emergencyContact: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit emergency contact number.')
    .or(z.literal(''))
    .optional(),
  medicalRecordNumber: z
    .string()
    .max(50, 'Medical record number cannot exceed 50 characters.')
    .optional(),
  notes: z
    .string()
    .max(500, 'Notes cannot exceed 500 characters.')
    .optional(),
});

export type PatientDetailsFormValues = z.infer<typeof patientDetailsSchema>;
