import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;
  return (
    <div className="error-box" role="alert">
      <AlertCircle size={18} style={{ flexShrink: 0 }} />
      <span>{message}</span>
    </div>
  );
};
