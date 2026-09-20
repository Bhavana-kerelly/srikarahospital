/**
 * Auth & OTP Types for Srikara Patient Portal
 * Backend is the single source of truth.
 */

export interface SendOtpRequest {
  phone: string;
}

export interface SendOtpResponse {
  success: boolean;
  message?: string;
  expiresAt?: string; // ISO 8601
  cooldownSeconds?: number;
}

export interface VerifyOtpRequest {
  phone: string;
  otp: string;
}

export interface VerifyOtpResponse {
  token: string;
  patient?: {
    id: string;
    fullName?: string;
    phone: string;
    email?: string;
  };
}
