import { useQuery } from '@tanstack/react-query';
import { availabilityApi } from '../api/availability.api';
import { queryKeys } from './queryKeys';
import { AvailabilitySummary, SearchAvailabilityParams } from '../types/dialysis.types';
import { ApiError } from '../types/api.types';

export function useAvailability(
  params: SearchAvailabilityParams,
  options?: { enabled?: boolean }
) {
  const cleanParams: SearchAvailabilityParams = {
    location: params.location,
    date: params.date,
    ...(params.hospitalId ? { hospitalId: params.hospitalId } : {}),
    ...(params.shift && params.shift !== 'ANY' ? { shift: params.shift } : {}),
  };

  const isEnabled =
    options?.enabled !== undefined
      ? options.enabled && Boolean(cleanParams.location && cleanParams.date)
      : false; // Only trigger availability search when explicitly requested

  return useQuery<AvailabilitySummary[], ApiError>({
    queryKey: queryKeys.availability.search(cleanParams as Record<string, unknown>),
    queryFn: async () => {
      const response = await availabilityApi.getAvailability(cleanParams);
      return response.data;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes (availability updates dynamically)
    retry: 1,
    enabled: isEnabled,
  });
}
