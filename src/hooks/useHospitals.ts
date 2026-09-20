import { useQuery } from '@tanstack/react-query';
import { hospitalsApi } from '../api/hospitals.api';
import { queryKeys } from './queryKeys';
import { Hospital } from '../types/hospital.types';
import { ApiError } from '../types/api.types';

export function useHospitals(city?: string) {
  return useQuery<Hospital[], ApiError>({
    queryKey: queryKeys.hospitals.list(city),
    queryFn: async () => {
      const response = await hospitalsApi.getHospitals(city);
      return response.data;
    },
    staleTime: 1000 * 60 * 15, // 15 minutes
    retry: 1,
    enabled: true,
  });
}
