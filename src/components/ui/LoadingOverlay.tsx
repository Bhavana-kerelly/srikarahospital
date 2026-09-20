import React from 'react';
import { Spinner } from './Spinner';

export interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
  fullScreen?: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  message = 'Loading availability from Srikara Central Network...',
  fullScreen = false,
}) => {
  if (!isLoading) return null;

  const containerStyles = fullScreen
    ? 'fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm'
    : 'absolute inset-0 z-20 bg-white/80 backdrop-blur-xs rounded-card';

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center p-6 transition-all duration-200 ${containerStyles}`}
    >
      <Spinner size="lg" className="text-[#2563EB] mb-3" />
      <p className="text-sm font-medium text-[#0F2444]">{message}</p>
    </div>
  );
};
