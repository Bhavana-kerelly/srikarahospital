export const queryKeys = {
  hospitals: {
    all: ['hospitals'] as const,
    list: (city?: string) => [...queryKeys.hospitals.all, { city }] as const,
    detail: (id: string) => [...queryKeys.hospitals.all, 'detail', id] as const,
  },
  availability: {
    all: ['dialysis-availability'] as const,
    search: (params: Record<string, unknown>) => [...queryKeys.availability.all, params] as const,
    slots: (hospitalId: string, date: string, shift?: string) =>
      [...queryKeys.availability.all, 'slots', hospitalId, date, shift] as const,
  },
  bookings: {
    all: ['dialysis-bookings'] as const,
    list: (phone?: string) => [...queryKeys.bookings.all, { phone }] as const,
    detail: (id: string) => [...queryKeys.bookings.all, 'detail', id] as const,
  },
};
