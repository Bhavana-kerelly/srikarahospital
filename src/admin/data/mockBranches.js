import { branches } from '../../data/branches'

// Create an extended branch object suitable for the admin portal, 
// using the existing branches as the base data.
export const mockBranches = branches.map((branch, index) => ({
  id: branch.id || `branch-0${index + 1}`,
  slug: branch.slug,
  name: branch.title || branch.name,
  address: branch.address || `${branch.title || branch.name} Location, Hyderabad`,
  city: 'Hyderabad',
  phone: branch.phone || '+91 99999 99999',
  email: `info.${branch.slug || 'branch'}@srikarahospitals.com`,
  status: index === 4 ? 'Offline' : 'Connected', // Just some mock status variations
  units: Math.floor(Math.random() * 2) + 1, // 1 to 2 units per branch
  capacity: Math.floor(Math.random() * 20) + 10, // Random capacity between 10-30
  operationalStatus: index === 3 ? 'Limited' : 'Available',
}));

export const getAdminBranchById = (id) => mockBranches.find(b => b.id === id);
