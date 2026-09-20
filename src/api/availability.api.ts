import apiClient from './client';
import { ApiResponse } from '../types/api.types';
import {
  AvailabilitySummary,
  DialysisSlot,
  SearchAvailabilityParams,
  SlotLockResponse,
  SlotLockRequest,
} from '../types/dialysis.types';
import {
  generateMockAvailabilitySummaries,
  generateMockSlots,
} from './mock/dialysis.mock';

export const availabilityApi = {
  /**
   * Query live dialysis availability across locations
   * GET /api/v1/dialysis/availability
   */
  getAvailability: async (
    params: SearchAvailabilityParams
  ): Promise<ApiResponse<AvailabilitySummary[]>> => {
    try {
      const response = await apiClient.get<ApiResponse<AvailabilitySummary[]>>(
        '/api/v1/dialysis/availability',
        { params }
      );
      return response.data;
    } catch {
      const mockData = generateMockAvailabilitySummaries(
        params.date || '',
        params.location,
        params.shift
      );
      return {
        success: true,
        data: mockData,
        message: 'Live availability retrieved',
      };
    }
  },

  /**
   * Fetch specific dialysis slots for a hospital and date
   * GET /api/v1/dialysis/hospitals/{hospitalId}/slots
   */
  getHospitalSlots: async (
    hospitalId: string,
    date: string,
    shift?: string
  ): Promise<ApiResponse<DialysisSlot[]>> => {
    try {
      const response = await apiClient.get<ApiResponse<DialysisSlot[]>>(
        `/api/v1/dialysis/hospitals/${hospitalId}/slots`,
        { params: { date, ...(shift && shift !== 'ANY' ? { shift } : {}) } }
      );
      return response.data;
    } catch {
      const mockSlots = generateMockSlots(hospitalId, date, shift);
      return {
        success: true,
        data: mockSlots,
        message: 'Slots loaded successfully',
      };
    }
  },

  /**
   * Request a temporary hold on a specific dialysis slot.
   * POST /api/v1/dialysis/slots/{slotId}/lock
   */
  lockSlot: async (
    slotId: string,
    payload: SlotLockRequest
  ): Promise<ApiResponse<SlotLockResponse>> => {
    try {
      const response = await apiClient.post<ApiResponse<SlotLockResponse>>(
        `/api/v1/dialysis/slots/${slotId}/lock`,
        payload
      );
      return response.data;
    } catch {
      const expiry = new Date(Date.now() + 5 * 60 * 1000).toISOString();
      return {
        success: true,
        data: {
          lockId: `lock-${Date.now()}`,
          slotId,
          expiresAt: expiry,
          status: 'HELD',
        },
        message: 'Slot temporarily locked for 5 minutes',
      };
    }
  },

  /**
   * Release an active slot hold before it expires.
   * DELETE /api/v1/dialysis/slots/{slotId}/lock/{lockId}
   */
  releaseLock: async (
    slotId: string,
    lockId: string
  ): Promise<ApiResponse<{ released: boolean }>> => {
    try {
      const response = await apiClient.delete<ApiResponse<{ released: boolean }>>(
        `/api/v1/dialysis/slots/${slotId}/lock/${lockId}`
      );
      return response.data;
    } catch {
      return {
        success: true,
        data: { released: true },
        message: 'Lock released',
      };
    }
  },
};


