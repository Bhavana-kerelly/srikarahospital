import { branches } from './branches';

// Helper to generate deterministic but seemingly random data based on string
const hashString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

export const getBranchData = (branchId: string) => {
  const branch = branches.find(b => b.slug === branchId) || branches[0];
  const seed = hashString(branch.slug);
  
  // Base configuration using deterministic seed
  const totalCapacity = 24 + (seed % 20); // 24 to 43
  const availableSlots = 2 + (seed % 8); // 2 to 9
  const bookedSlots = totalCapacity - availableSlots - (seed % 3); // Rest booked minus some pending/maintenance
  const pendingRequests = seed % 5;
  const checkedIn = Math.floor(bookedSlots * 0.6);
  const completedSessions = Math.floor(bookedSlots * 0.3);
  
  // Generating a deterministic schedule
  const generateSchedule = () => {
    const times = ['06:00 AM', '08:00 AM', '10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM', '06:00 PM', '08:00 PM'];
    const statuses = ['Confirmed', 'Pending', 'Available', 'Blocked'];
    const schedule = [];
    
    for(let i=0; i<times.length; i++) {
      const idx = (seed + i) % statuses.length;
      schedule.push({
        id: `sch-${branch.slug}-${i}`,
        branchId: branch.slug,
        time: times[i],
        patient: idx < 2 ? `Patient ${String.fromCharCode(65 + i)}` : '—',
        status: statuses[idx],
        type: idx === 0 ? 'Recurring' : 'One-time'
      });
    }
    return schedule;
  };

  const schedule = generateSchedule();

  return {
    branch,
    kpi: {
      totalCapacity,
      booked: bookedSlots,
      available: availableSlots,
      pending: pendingRequests,
      checkedIn,
      completed: completedSessions
    },
    schedule
  };
};

export const mockBookings = [
  // Keeping this for legacy compatibility until fully replaced
  {
    id: "SKR-1024",
    patientName: "Rajesh Kumar",
    patientId: "PID-8472",
    date: "2026-09-17",
    shift: "Morning",
    time: "10:00 AM",
    station: "Station 04",
    status: "Confirmed",
    bookingType: "One-time",
    created: "2 hrs ago",
    contact: "+91 98765 43210",
    branchId: "ecil",
    unit: "Dialysis Unit 1"
  }
];

export const generateBookingsForBranch = (branchId: string) => {
  const seed = hashString(branchId);
  const statuses = ['Pending', 'Confirmed', 'Cancelled', 'Completed', 'No-show'];
  const bookings = [];
  
  for(let i=0; i<15; i++) {
    const statIdx = (seed + i) % statuses.length;
    bookings.push({
      id: `BKG-${branchId.substring(0,3).toUpperCase()}-${1000 + i}`,
      branchId,
      patientName: `Patient ${String.fromCharCode(65 + (i%26))}${i}`,
      patientId: `PID-${8000 + i}`,
      date: "2026-09-17",
      shift: i < 5 ? "Morning" : i < 10 ? "Afternoon" : "Evening",
      time: i % 2 === 0 ? "10:00 AM" : "02:00 PM",
      station: `Station ${String(1 + (i % 10)).padStart(2, '0')}`,
      status: statuses[statIdx],
      bookingType: i % 3 === 0 ? "One-time" : "Recurring",
      created: `${1 + (i%5)} hrs ago`,
      contact: "+91 90000 00000",
      unit: "Dialysis Unit 1",
      hospital: branchId
    });
  }
  return bookings;
};

export const generateWaitlistForBranch = (branchId: string) => {
  const seed = hashString(branchId);
  const waitlist = [];
  for(let i=0; i < 3 + (seed % 4); i++) {
    waitlist.push({
      id: `WL-${branchId}-${i}`,
      branchId,
      patientName: `Waiting Patient ${i}`,
      date: "2026-09-17",
      preferredTime: i % 2 === 0 ? "10:00 AM" : "Any time",
      priority: i === 0 ? "High" : "Normal",
      queuePosition: i + 1
    });
  }
  return waitlist;
};

export const mockStations = Array.from({ length: 12 }, (_, i) => ({
  id: `ST-${(i + 1).toString().padStart(2, '0')}`,
  number: `Station ${(i + 1).toString().padStart(2, '0')}`,
  status: ['Available', 'Booked', 'Occupied', 'Maintenance', 'Available', 'Booked'][i % 6],
  shift: i < 4 ? 'Morning' : i < 8 ? 'Afternoon' : 'Evening',
  patient: i % 2 !== 0 ? `Patient ${i}` : null,
  branchId: 'ecil'
}));

export const mockPatients = [
  {
    id: "PID-8472",
    name: "Rajesh Kumar",
    contact: "+91 98765 43210",
    lastBooking: "2026-09-14",
    upcomingSession: "2026-09-17",
    status: "Active",
    branchId: "ecil"
  }
];

export const generateCheckinsForBranch = (branchId: string) => {
  const seed = hashString(branchId);
  const statuses = ['Scheduled', 'Checked In', 'Treatment Started', 'Completed', 'No-show'];
  const checkins = [];
  for(let i=0; i<8; i++) {
    const statIdx = (seed + i) % statuses.length;
    checkins.push({
      id: `CHK-${i}`,
      branchId,
      patientName: `Patient ${i}`,
      bookingId: `BKG-${1000 + i}`,
      shift: "Morning",
      station: `Station 0${i+1}`,
      arrival: statIdx > 0 && statIdx !== 4 ? "09:45 AM" : "—",
      status: statuses[statIdx]
    });
  }
  return checkins;
};
