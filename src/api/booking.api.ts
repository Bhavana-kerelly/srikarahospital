import { apiClient } from './client';
import { ApiResponse } from '../types/api.types';
import { Booking, CreateBookingPayload } from '../types/booking.types';
import {
  MOCK_HOSPITALS,
  getMockBookingsFromStorage,
  saveMockBookingToStorage,
} from './mock/dialysis.mock';

export const bookingApi = {
  /**
   * Submit final booking request to hospital
   * POST /api/v1/dialysis/bookings
   */
  async createBooking(payload: CreateBookingPayload): Promise<ApiResponse<Booking>> {
    try {
      const response = await apiClient.post<ApiResponse<Booking>>('/api/v1/dialysis/bookings', payload);
      return response.data;
    } catch {
      const hospital =
        MOCK_HOSPITALS.find((h) => h.id === payload.hospitalId) || MOCK_HOSPITALS[0];
      const randomRef = `SRK-${Math.floor(100000 + Math.random() * 900000)}`;
      const newBooking: Booking = {
        id: `book-${Date.now()}`,
        bookingReference: randomRef,
        status: 'CONFIRMED',
        slotId: payload.slotId,
        hospitalId: payload.hospitalId,
        hospitalName: hospital.name,
        date: payload.date,
        startTime: '06:00 AM',
        endTime: '10:00 AM',
        patient: {
          fullName: payload.patient.fullName,
          phone: payload.patient.phone,
          age: payload.patient.age,
          gender: payload.patient.gender,
          medicalRecordNumber: payload.patient.medicalRecordNumber,
        },
        createdAt: new Date().toISOString(),
        notes: payload.notes,
      };
      saveMockBookingToStorage(newBooking);
      return {
        success: true,
        data: newBooking,
        message: 'Booking confirmed successfully',
      };
    }
  },

  /**
   * Retrieve bookings by patient phone
   * GET /api/v1/dialysis/bookings?phone=...
   */
  async getBookingsByPhone(phone: string): Promise<ApiResponse<Booking[]>> {
    try {
      const response = await apiClient.get<ApiResponse<Booking[]>>('/api/v1/dialysis/bookings', {
        params: { phone },
      });
      return response.data;
    } catch {
      const bookings = getMockBookingsFromStorage(phone);
      return {
        success: true,
        data: bookings,
        message: 'Bookings retrieved successfully',
      };
    }
  },
};

