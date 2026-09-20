/**
 * Hospital and Branch Types
 * Central Backend is the single source of truth.
 */

export interface HospitalAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  landmark?: string;
}

export interface HospitalContact {
  phone: string;
  emergencyPhone?: string;
  email?: string;
}

export interface Hospital {
  id: string;
  name: string;
  code: string;
  address: HospitalAddress;
  contact: HospitalContact;
  isActive: boolean;
  totalDialysisBeds?: number;
  latitude?: number;
  longitude?: number;
  branch?: string;
  distance?: string | number;
}

export interface Branch {
  id: string;
  hospitalId: string;
  branchName: string;
  location: string;
  city: string;
  isActive: boolean;
}
