import { Hospital } from '../types/hospital.types';
import { AvailabilitySummary, DialysisSlot } from '../types/dialysis.types';
import { Booking } from '../types/booking.types';

export const MOCK_HOSPITALS: Hospital[] = [
  {
    id: 'hosp-lb-nagar',
    name: 'Srikara Hospital, LB Nagar',
    code: 'SRK-LBN',
    branch: 'LB Nagar',
    address: {
      line1: 'Near Metro Station, Ring Road, LB Nagar',
      city: 'Hyderabad',
      state: 'Telangana',
      postalCode: '500074',
    },
    contact: {
      phone: '+91 92479 58308',
      emergencyPhone: '040-45678901',
    },
    isActive: true,
    totalDialysisBeds: 16,
    distance: '3.2 km',
  },
  {
    id: 'hosp-ecil',
    name: 'Srikara Hospital, ECIL',
    code: 'SRK-ECIL',
    branch: 'ECIL',
    address: {
      line1: 'Main Road, Moula Ali, ECIL Cross Roads',
      city: 'Hyderabad',
      state: 'Telangana',
      postalCode: '500062',
    },
    contact: {
      phone: '+91 92479 58308',
      emergencyPhone: '040-45678902',
    },
    isActive: true,
    totalDialysisBeds: 12,
    distance: '7.8 km',
  },
  {
    id: 'hosp-kompally',
    name: 'Srikara Hospital, Kompally',
    code: 'SRK-KMP',
    branch: 'Kompally',
    address: {
      line1: 'Near Cineplanet, Medchal Highway, Kompally',
      city: 'Secunderabad',
      state: 'Telangana',
      postalCode: '500100',
    },
    contact: {
      phone: '+91 92479 58308',
      emergencyPhone: '040-45678903',
    },
    isActive: true,
    totalDialysisBeds: 14,
    distance: '12.4 km',
  },
  {
    id: 'hosp-miyapur',
    name: 'Srikara Hospital, Miyapur',
    code: 'SRK-MYP',
    branch: 'Miyapur',
    address: {
      line1: 'Opposite Metro Pillar 580, Miyapur X Roads',
      city: 'Hyderabad',
      state: 'Telangana',
      postalCode: '500049',
    },
    contact: {
      phone: '+91 92479 58308',
      emergencyPhone: '040-45678904',
    },
    isActive: true,
    totalDialysisBeds: 10,
    distance: '15.1 km',
  },
  {
    id: 'hosp-peerzadiguda',
    name: 'Srikara Hospital, Peerzadiguda',
    code: 'SRK-PZG',
    branch: 'Peerzadiguda',
    address: {
      line1: 'Near Uppal Bus Depot, Boduppal Road, Peerzadiguda',
      city: 'Hyderabad',
      state: 'Telangana',
      postalCode: '500039',
    },
    contact: {
      phone: '+91 92479 58308',
      emergencyPhone: '040-45678905',
    },
    isActive: true,
    totalDialysisBeds: 12,
    distance: '5.6 km',
  },
  {
    id: 'hosp-lakdikapul',
    name: 'Srikara Hospital, Lakdikapul',
    code: 'SRK-LKP',
    branch: 'Lakdikapul',
    address: {
      line1: 'Niloufer Hospital Road, Lakdikapul',
      city: 'Hyderabad',
      state: 'Telangana',
      postalCode: '500004',
    },
    contact: {
      phone: '+91 92479 58308',
      emergencyPhone: '040-45678906',
    },
    isActive: true,
    totalDialysisBeds: 14,
    distance: '6.5 km',
  },
  {
    id: 'hosp-secunderabad',
    name: 'Srikara Hospital, Secunderabad',
    code: 'SRK-SCB',
    branch: 'Secunderabad',
    address: {
      line1: 'Opposite Railway Station, Station Road, Secunderabad',
      city: 'Secunderabad',
      state: 'Telangana',
      postalCode: '500003',
    },
    contact: {
      phone: '+91 92479 58308',
      emergencyPhone: '040-45678907',
    },
    isActive: true,
    totalDialysisBeds: 16,
    distance: '8.2 km',
  },
  {
    id: 'hosp-rtc-x-roads',
    name: 'Srikara Hospital, RTC X Roads',
    code: 'SRK-RTC',
    branch: 'RTC X Roads',
    address: {
      line1: 'Near RTC Cross Roads, Chikkadpally, Hyderabad',
      city: 'Hyderabad',
      state: 'Telangana',
      postalCode: '500020',
    },
    contact: {
      phone: '+91 92479 58308',
      emergencyPhone: '040-45678908',
    },
    isActive: true,
    totalDialysisBeds: 10,
    distance: '4.8 km',
  },
  {
    id: 'hosp-vijayawada',
    name: 'Srikara Hospital, Vijayawada',
    code: 'SRK-VJA',
    branch: 'Vijayawada',
    address: {
      line1: 'MG Road, Near Benz Circle, Vijayawada',
      city: 'Vijayawada',
      state: 'Andhra Pradesh',
      postalCode: '520010',
    },
    contact: {
      phone: '+91 92479 58308',
      emergencyPhone: '0866-4567890',
    },
    isActive: true,
    totalDialysisBeds: 18,
    distance: '275 km',
  },
  {
    id: 'hosp-rajahmundry',
    name: 'Srikara Hospital, Rajahmundry',
    code: 'SRK-RJY',
    branch: 'Rajahmundry',
    address: {
      line1: 'Danavaipeta, Near Devi Chowk, Rajahmundry',
      city: 'Rajahmundry',
      state: 'Andhra Pradesh',
      postalCode: '533103',
    },
    contact: {
      phone: '+91 92479 58308',
      emergencyPhone: '0883-4567890',
    },
    isActive: true,
    totalDialysisBeds: 12,
    distance: '420 km',
  },
];

export const generateMockAvailabilitySummaries = (
  date: string,
  location?: string,
  shift?: string
): AvailabilitySummary[] => {
  return MOCK_HOSPITALS.map((h) => ({
    hospitalId: h.id,
    hospitalName: h.name,
    branch: h.branch,
    city: h.address.city,
    address: h.address.line1,
    distance: h.distance,
    date: date || new Date().toISOString().split('T')[0],
    totalAvailableSlots: 8,
    status: 'AVAILABLE' as const,
    earliestSlot: '06:00 AM',
    shifts: {
      morningAvailable: true,
      afternoonAvailable: true,
      eveningAvailable: true,
    },
  })).filter((summary) => {
    if (!location || location === 'ALL' || location.toLowerCase().includes('all')) return true;
    const locLower = location.toLowerCase();
    return (
      (summary.branch && summary.branch.toLowerCase().includes(locLower)) ||
      summary.hospitalName.toLowerCase().includes(locLower) ||
      summary.city.toLowerCase().includes(locLower)
    );
  });
};

export const generateMockSlots = (
  hospitalId: string,
  date: string,
  shift?: string
): DialysisSlot[] => {
  const hospital = MOCK_HOSPITALS.find((h) => h.id === hospitalId) || MOCK_HOSPITALS[0];
  const targetDate = date || new Date().toISOString().split('T')[0];

  const allSlots: DialysisSlot[] = [
    // Morning shift
    {
      id: `${hospital.id}-${targetDate}-M1`,
      hospitalId: hospital.id,
      hospitalName: hospital.name,
      date: targetDate,
      startTime: '06:00 AM',
      endTime: '10:00 AM',
      shift: 'MORNING',
      status: 'AVAILABLE',
      availableCount: 4,
      totalCount: 6,
    },
    {
      id: `${hospital.id}-${targetDate}-M2`,
      hospitalId: hospital.id,
      hospitalName: hospital.name,
      date: targetDate,
      startTime: '07:30 AM',
      endTime: '11:30 AM',
      shift: 'MORNING',
      status: 'LIMITED',
      availableCount: 1,
      totalCount: 6,
    },
    // Afternoon shift
    {
      id: `${hospital.id}-${targetDate}-A1`,
      hospitalId: hospital.id,
      hospitalName: hospital.name,
      date: targetDate,
      startTime: '11:00 AM',
      endTime: '03:00 PM',
      shift: 'AFTERNOON',
      status: 'AVAILABLE',
      availableCount: 5,
      totalCount: 6,
    },
    {
      id: `${hospital.id}-${targetDate}-A2`,
      hospitalId: hospital.id,
      hospitalName: hospital.name,
      date: targetDate,
      startTime: '12:30 PM',
      endTime: '04:30 PM',
      shift: 'AFTERNOON',
      status: 'AVAILABLE',
      availableCount: 3,
      totalCount: 6,
    },
    // Evening shift
    {
      id: `${hospital.id}-${targetDate}-E1`,
      hospitalId: hospital.id,
      hospitalName: hospital.name,
      date: targetDate,
      startTime: '04:00 PM',
      endTime: '08:00 PM',
      shift: 'EVENING',
      status: 'AVAILABLE',
      availableCount: 3,
      totalCount: 6,
    },
    {
      id: `${hospital.id}-${targetDate}-E2`,
      hospitalId: hospital.id,
      hospitalName: hospital.name,
      date: targetDate,
      startTime: '05:30 PM',
      endTime: '09:30 PM',
      shift: 'EVENING',
      status: 'LIMITED',
      availableCount: 2,
      totalCount: 6,
    },
  ];

  if (shift && shift !== 'ANY') {
    return allSlots.filter((s) => s.shift === shift);
  }
  return allSlots;
};

// In-memory bookings store for the session
const STORAGE_KEY = 'srikara_mock_bookings';

export const getMockBookingsFromStorage = (phone?: string): Booking[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const bookings: Booking[] = raw ? JSON.parse(raw) : [];
    if (!phone) return bookings;
    return bookings.filter((b) => b.patient.phone.includes(phone) || phone.includes(b.patient.phone));
  } catch {
    return [];
  }
};

export const saveMockBookingToStorage = (booking: Booking): void => {
  try {
    const existing = getMockBookingsFromStorage();
    const updated = [booking, ...existing.filter((b) => b.id !== booking.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save mock booking to storage', e);
  }
};

export const cancelMockBookingInStorage = (id: string): boolean => {
  try {
    const existing = getMockBookingsFromStorage();
    const updated = existing.map((b) =>
      b.id === id ? { ...b, status: 'CANCELLED' as const } : b
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch {
    return false;
  }
};
