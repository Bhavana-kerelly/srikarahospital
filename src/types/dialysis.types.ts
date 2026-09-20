/**
 * Dialysis Availability and Slot Types
 * Central Backend is the single source of truth.
 */

export type SlotShift = 'MORNING' | 'AFTERNOON' | 'EVENING' | 'ANY';

export type SlotAvailabilityStatus =
  | 'AVAILABLE'
  | 'LIMITED'
  | 'FEW_LEFT'
  | 'FULL'
  | 'WAITLIST'
  | 'HELD'
  | 'EXPIRED'
  | 'UNAVAILABLE';

export interface DialysisSlot {
  id: string;
  hospitalId: string;
  hospitalName: string;
  date: string; // ISO format: YYYY-MM-DD
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  shift: SlotShift;
  status: SlotAvailabilityStatus;
  availableCount: number;
  totalCount: number;
}

/**
 * SlotLock — temporary hold returned by the backend.
 * Only store what the backend provides.
 * Assumption: POST /api/v1/dialysis/slots/{slotId}/lock
 */
export interface SlotLock {
  lockId: string;
  slotId: string;
  expiresAt: string; // ISO 8601 datetime string from backend
  status: 'HELD' | 'EXPIRED' | 'RELEASED';
}

export interface SlotLockRequest {
  slotId: string;
  hospitalId: string;
  date: string;
}

export interface SlotLockResponse {
  lockId: string;
  slotId: string;
  expiresAt: string;
  status: 'HELD' | 'EXPIRED' | 'RELEASED';
}

export interface AvailabilitySummary {
  hospitalId: string;
  hospitalName: string;
  branch?: string;
  city: string;
  address?: string;
  distance?: string | number;
  date: string;
  totalAvailableSlots: number;
  status?: SlotAvailabilityStatus;
  earliestSlot?: string;
  shifts?: {
    morningAvailable: boolean;
    afternoonAvailable: boolean;
    eveningAvailable: boolean;
  };
}

export interface SearchAvailabilityParams {
  location?: string;
  hospitalId?: string;
  date?: string;
  shift?: SlotShift;
}
