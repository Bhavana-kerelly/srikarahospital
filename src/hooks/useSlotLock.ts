import { useMutation, useQueryClient } from '@tanstack/react-query';
import { availabilityApi } from '../api/availability.api';
import { queryKeys } from './queryKeys';
import { SlotLockRequest, SlotLockResponse } from '../types/dialysis.types';
import { ApiError, ApiResponse } from '../types/api.types';

/**
 * useSlotLock — TanStack Mutation for requesting a temporary backend hold on a dialysis slot.
 *
 * Calls: POST /api/v1/dialysis/slots/{slotId}/lock
 * Returns: { lockId, slotId, expiresAt, status }
 *
 * Assumptions (to be validated against Developer 2's API contract):
 *   1. Backend returns lockId + expiresAt (ISO 8601) on success.
 *   2. On conflict (slot taken by another patient), backend returns 409.
 *   3. Slot list is invalidated on a successful lock to reflect updated slot status.
 */
export function useSlotLock(hospitalId: string, date: string) {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<SlotLockResponse>, ApiError, { slotId: string; payload: SlotLockRequest }>({
    mutationFn: ({ slotId, payload }) => availabilityApi.lockSlot(slotId, payload),
    onSuccess: () => {
      // Invalidate slot list so the grid reflects the newly held status from backend
      queryClient.invalidateQueries({
        queryKey: queryKeys.availability.slots(hospitalId, date),
      });
    },
  });
}

/**
 * useSlotRelease — TanStack Mutation to release a held lock before expiry.
 *
 * Calls: DELETE /api/v1/dialysis/slots/{slotId}/lock/{lockId}
 */
export function useSlotRelease(hospitalId: string, date: string) {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<{ released: boolean }>, ApiError, { slotId: string; lockId: string }>({
    mutationFn: ({ slotId, lockId }) => availabilityApi.releaseLock(slotId, lockId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.availability.slots(hospitalId, date),
      });
    },
  });
}
