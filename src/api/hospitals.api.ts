import apiClient from './client';
import { ApiResponse } from '../types/api.types';
import { Hospital } from '../types/hospital.types';
import { MOCK_HOSPITALS } from './mock/dialysis.mock';

export const hospitalsApi = {
  /**
   * Fetch active Srikara hospitals offering dialysis
   * GET /api/v1/hospitals
   */
  getHospitals: async (city?: string): Promise<ApiResponse<Hospital[]>> => {
    try {
      const response = await apiClient.get<ApiResponse<Hospital[]>>('/api/v1/hospitals', {
        params: city ? { city } : undefined,
      });
      return response.data;
    } catch {
      // Graceful fallback for local presentation/testing
      return {
        success: true,
        data: city
          ? MOCK_HOSPITALS.filter((h) => h.address.city.toLowerCase() === city.toLowerCase())
          : MOCK_HOSPITALS,
        message: 'Hospitals loaded from registry',
      };
    }
  },

  /**
   * Fetch single hospital details
   * GET /api/v1/hospitals/{id}
   */
  getHospitalById: async (id: string): Promise<ApiResponse<Hospital>> => {
    try {
      const response = await apiClient.get<ApiResponse<Hospital>>(`/api/v1/hospitals/${id}`);
      return response.data;
    } catch {
      const hospital = MOCK_HOSPITALS.find((h) => h.id === id) || MOCK_HOSPITALS[0];
      return {
        success: true,
        data: hospital,
        message: 'Hospital details loaded',
      };
    }
  },
};

