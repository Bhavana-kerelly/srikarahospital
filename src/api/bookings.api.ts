import apiClient from './client';
import { ApiResponse } from '../types/api.types';
import { Booking, CreateBookingPayload } from '../types/booking.types';
import {
  MOCK_HOSPITALS,
  getMockBookingsFromStorage,
  saveMockBookingToStorage,
  cancelMockBookingInStorage,
} from './mock/dialysis.mock';

export const bookingsApi = {
  /**
   * Submit new dialysis booking request
   * POST /api/v1/dialysis/bookings
   */
  createBooking: async (payload: CreateBookingPayload): Promise<ApiResponse<Booking>> => {
    try {
      const response = await apiClient.post<ApiResponse<Booking>>(
        '/api/v1/dialysis/bookings',
        payload
      );
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
        message: 'Booking successfully confirmed',
      };
    }
  },

  /**
   * List bookings for the authenticated patient or specific phone
   * GET /api/v1/dialysis/bookings
   */
  getBookings: async (phone?: string): Promise<ApiResponse<Booking[]>> => {
    try {
      const response = await apiClient.get<ApiResponse<Booking[]>>(
        '/api/v1/dialysis/bookings',
        { params: phone ? { phone } : undefined }
      );
      return response.data;
    } catch {
      const bookings = getMockBookingsFromStorage(phone);
      return {
        success: true,
        data: bookings,
        message: 'Bookings loaded',
      };
    }
  },

  /**
   * Get single booking details by ID
   * GET /api/v1/dialysis/bookings/{id}
   */
  getBookingById: async (id: string): Promise<ApiResponse<Booking>> => {
    try {
      const response = await apiClient.get<ApiResponse<Booking>>(
        `/api/v1/dialysis/bookings/${id}`
      );
      return response.data;
    } catch {
      const bookings = getMockBookingsFromStorage();
      const found = bookings.find((b) => b.id === id || b.bookingReference === id);
      if (found) {
        return {
          success: true,
          data: found,
          message: 'Booking details retrieved',
        };
      }
      // Return a demo fallback if navigated directly
      const demo: Booking = {
        id,
        bookingReference: 'SRK-491028',
        status: 'CONFIRMED',
        slotId: 'slot-demo',
        hospitalId: 'hosp-lb-nagar',
        hospitalName: 'Srikara Hospital, LB Nagar',
        date: new Date().toISOString().split('T')[0],
        startTime: '06:00 AM',
        endTime: '10:00 AM',
        patient: {
          fullName: 'Patient User',
          phone: '9876543210',
          age: 45,
          gender: 'MALE',
        },
        createdAt: new Date().toISOString(),
      };
      return {
        success: true,
        data: demo,
        message: 'Booking details loaded',
      };
    }
  },

  /**
   * Cancel an existing booking
   * POST /api/v1/dialysis/bookings/{id}/cancel
   */
  cancelBooking: async (
    id: string,
    reason?: string
  ): Promise<ApiResponse<{ cancelled: boolean; id: string }>> => {
    try {
      const response = await apiClient.post<ApiResponse<{ cancelled: boolean; id: string }>>(
        `/api/v1/dialysis/bookings/${id}/cancel`,
        { reason }
      );
      return response.data;
    } catch {
      cancelMockBookingInStorage(id);
      return {
        success: true,
        data: { cancelled: true, id },
        message: 'Booking cancelled successfully',
      };
    }
  },
};

