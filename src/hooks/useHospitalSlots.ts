import { useQuery } from '@tanstack/react-query';
import { availabilityApi } from '../api/availability.api';
import { queryKeys } from './queryKeys';
import { DialysisSlot } from '../types/dialysis.types';
import { ApiError } from '../types/api.types';

export function useHospitalSlots(
  hospitalId: string,
  date: string,
  shift?: string,
  options?: { enabled?: boolean }
) {
  const isEnabled = options?.enabled !== undefined ? options.enabled : Boolean(hospitalId && date);

  return useQuery<DialysisSlot[], ApiError>({
    queryKey: queryKeys.availability.slots(hospitalId, date, shift),
    queryFn: async () => {
      const response = await availabilityApi.getHospitalSlots(hospitalId, date, shift);
      return response.data;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
    retry: 1,
    enabled: isEnabled,
  });
}
