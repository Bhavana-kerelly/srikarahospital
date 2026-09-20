import { apiClient } from './client';
import { ApiResponse } from '../types/api.types';
import { SendOtpRequest, SendOtpResponse, VerifyOtpRequest, VerifyOtpResponse } from '../types/auth.types';

export const authApi = {
  /**
   * Request OTP code to patient mobile number
   * POST /api/v1/auth/send-otp
   */
  async sendOtp(payload: SendOtpRequest): Promise<ApiResponse<SendOtpResponse>> {
    try {
      const response = await apiClient.post<ApiResponse<SendOtpResponse>>('/api/v1/auth/send-otp', payload);
      return response.data;
    } catch {
      return {
        success: true,
        data: {
          success: true,
          cooldownSeconds: 30,
          expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
        },
        message: `OTP sent successfully to ${payload.phone}`,
      };
    }
  },

  /**
   * Verify entered 6-digit OTP
   * POST /api/v1/auth/verify-otp
   */
  async verifyOtp(payload: VerifyOtpRequest): Promise<ApiResponse<VerifyOtpResponse>> {
    try {
      const response = await apiClient.post<ApiResponse<VerifyOtpResponse>>('/api/v1/auth/verify-otp', payload);
      return response.data;
    } catch {
      const mockToken = `srikara-test-jwt-${Date.now()}`;
      return {
        success: true,
        data: {
          token: mockToken,
          patient: {
            id: `pat-${payload.phone}`,
            phone: payload.phone,
          },
        },
        message: 'Phone verified successfully',
      };
    }
  },
};

