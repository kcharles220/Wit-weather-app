import React from 'react';
import Toast from './Toast';

interface ErrorMessageProps {
  message: string;
  onClose: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }) => {
  return (
    <Toast 
      message={message}
      type="error"
      onClose={onClose}
      autoClose={true}
      duration={6000}
    />
  );
};

export default ErrorMessage;
