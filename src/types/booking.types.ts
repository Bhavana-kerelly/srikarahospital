/**
 * Booking and Patient Types
 * Central Backend is the single source of truth.
 */

export type BookingStatus =
  | 'PENDING'
  | 'REQUESTED'
  | 'CONFIRMED'
  | 'CHECKED_IN'
  | 'IN_TREATMENT'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'REJECTED'
  | 'CANCELLED';

export interface Patient {
  id?: string;
  fullName: string;
  phone: string;
  age?: number;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  medicalRecordNumber?: string;
  emergencyContact?: string;
}

export interface Booking {
  id: string;
  bookingReference: string;
  status: BookingStatus;
  slotId: string;
  hospitalId: string;
  hospitalName: string;
  date: string;
  startTime: string;
  endTime: string;
  patient: Patient;
  createdAt: string;
  notes?: string;
}

export interface CreateBookingPayload {
  slotId: string;
  hospitalId: string;
  date: string;
  patient: {
    fullName: string;
    phone: string;
    age?: number;
    gender?: 'MALE' | 'FEMALE' | 'OTHER';
    medicalRecordNumber?: string;
  };
  notes?: string;
}
