import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingsApi } from '../api/bookings.api';
import { queryKeys } from './queryKeys';
import { Booking } from '../types/booking.types';
import { ApiError, ApiResponse } from '../types/api.types';

export function useBookings(phone?: string, options?: { enabled?: boolean }) {
  const isEnabled = options?.enabled !== undefined ? options.enabled : Boolean(phone);

  return useQuery<Booking[], ApiError>({
    queryKey: queryKeys.bookings.list(phone),
    queryFn: async () => {
      const response = await bookingsApi.getBookings(phone);
      return response.data;
    },
    staleTime: 1000 * 60 * 3, // 3 minutes
    retry: 1,
    enabled: isEnabled,
  });
}

export function useBooking(id: string, options?: { enabled?: boolean }) {
  const isEnabled = options?.enabled !== undefined ? options.enabled : Boolean(id);

  return useQuery<Booking, ApiError>({
    queryKey: queryKeys.bookings.detail(id),
    queryFn: async () => {
      const response = await bookingsApi.getBookingById(id);
      return response.data;
    },
    staleTime: 1000 * 60 * 3,
    retry: 1,
    enabled: isEnabled,
  });
}

export function useCancelBooking() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<{ cancelled: boolean; id: string }>, ApiError, { id: string; reason?: string }>({
    mutationFn: ({ id, reason }) => bookingsApi.cancelBooking(id, reason),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.bookings.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.bookings.detail(variables.id),
      });
    },
  });
}
