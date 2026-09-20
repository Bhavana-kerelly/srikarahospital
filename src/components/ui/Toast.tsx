import React from 'react';
import { Alert, AlertType } from './Alert';

export interface ToastProps {
  id: string;
  type?: AlertType;
  title?: string;
  message: string;
  onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ id, type = 'info', title, message, onClose }) => {
  return (
    <div className="shadow-lg max-w-sm w-full animate-in slide-in-from-top-2 fade-in duration-200">
      <Alert type={type} title={title} onDismiss={() => onClose(id)}>
        {message}
      </Alert>
    </div>
  );
};
