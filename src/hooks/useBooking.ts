import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingApi } from '../api/booking.api';
import { queryKeys } from './queryKeys';
import { CreateBookingPayload, Booking } from '../types/booking.types';
import { ApiError, ApiResponse } from '../types/api.types';

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Booking>, ApiError, CreateBookingPayload>({
    mutationFn: (payload: CreateBookingPayload) => bookingApi.createBooking(payload),
    onSuccess: (res) => {
      // Invalidate both booking list and slots to reflect updated inventory
      queryClient.invalidateQueries({
        queryKey: queryKeys.bookings.all,
      });
      if (res.data?.hospitalId && res.data?.date) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.availability.slots(res.data.hospitalId, res.data.date),
        });
      }
    },
  });
}
