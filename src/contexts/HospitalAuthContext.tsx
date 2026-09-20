import React, { createContext, useContext, useState, ReactNode } from 'react';
import { branches } from '../data/branches';

interface HospitalAuthContextType {
  currentBranch: any | null;
  user: any | null;
  isAuthenticated: boolean;
  login: (email: string) => boolean;
  logout: () => void;
}

const HospitalAuthContext = createContext<HospitalAuthContextType | undefined>(undefined);

export const HospitalAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentBranch, setCurrentBranch] = useState<any | null>(null);
  const [user, setUser] = useState<any | null>(null);

  const isAuthenticated = !!currentBranch && !!user;

  const login = (email: string) => {
    // Expected email format: slug@srikara.com
    const slug = email.split('@')[0];
    const branch = branches.find(b => b.slug === slug || b.id === slug || (b.title && email.includes(b.title.split(' ')[0].toLowerCase())));
    
    // Default to the first branch if not found to make testing easier
    const selectedBranch = branch || branches[0];
    
    setCurrentBranch({ ...selectedBranch, name: selectedBranch.title || 'Srikara Branch' });
    setUser({
      name: 'Anil Kumar',
      email: email,
      role: 'Hospital Staff'
    });
    
    return true;
  };

  const logout = () => {
    setCurrentBranch(null);
    setUser(null);
  };

  return (
    <HospitalAuthContext.Provider value={{ currentBranch, user, isAuthenticated, login, logout }}>
      {children}
    </HospitalAuthContext.Provider>
  );
};

export const useHospitalAuth = () => {
  const context = useContext(HospitalAuthContext);
  if (context === undefined) {
    throw new Error('useHospitalAuth must be used within a HospitalAuthProvider');
  }
  return context;
};
