import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { X } from 'lucide-react';

interface ToastProps {
    message: string;
    type?: 'error' | 'warning' | 'info';
    onClose: () => void;
    autoClose?: boolean;
    duration?: number;
}

const Toast: React.FC<ToastProps> = ({ 
    message, 
    type = 'error', 
    onClose, 
    autoClose = true,
    duration = 5000 
}) => {
    useEffect(() => {
        if (autoClose) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [autoClose, duration, onClose]);

    const getIcon = () => {
        switch (type) {
            case 'error':
                return '⚠️';
            case 'warning':
                return '⚠️';
            case 'info':
                return 'ℹ️';
            default:
                return '⚠️';
        }
    };

    const getColor = () => {
        switch (type) {
            case 'error':
                return 'rgba(239, 68, 68, 0.15)';
            case 'warning':
                return 'rgba(251, 191, 36, 0.15)';
            case 'info':
                return 'rgba(59, 130, 246, 0.15)';
            default:
                return 'rgba(239, 68, 68, 0.15)';
        }
    };

    const getBorderColor = () => {
        switch (type) {
            case 'error':
                return 'rgba(239, 68, 68, 0.3)';
            case 'warning':
                return 'rgba(251, 191, 36, 0.3)';
            case 'info':
                return 'rgba(59, 130, 246, 0.3)';
            default:
                return 'rgba(239, 68, 68, 0.3)';
        }
    };

    return (
        <ToastContainer $bgColor={getColor()} $borderColor={getBorderColor()}>
            <ToastIcon>{getIcon()}</ToastIcon>
            <ToastMessage>{message}</ToastMessage>
            <CloseButton onClick={onClose} aria-label="Close">
                <X size={18} />
            </CloseButton>
        </ToastContainer>
    );
};

const slideDown = keyframes`
    from {
        opacity: 0;
        transform: translate(-50%, -100%);
    }
    to {
        opacity: 1;
        transform: translate(-50%, 0);
    }
`;

const ToastContainer = styled.div<{ $bgColor: string; $borderColor: string }>`
    position: fixed;
    top: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    padding: 1rem 1.5rem;
    background: ${({ $bgColor }) => $bgColor};
    backdrop-filter: blur(20px);
    border: 1px solid ${({ $borderColor }) => $borderColor};
    border-radius: 16px;
    color: rgba(255, 255, 255, 0.95);
    font-size: 0.9rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    animation: ${slideDown} 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.1);
    max-width: 90vw;
    width: auto;
    min-width: 300px;

    @media (max-width: 768px) {
        top: 1rem;
        min-width: 280px;
        padding: 0.875rem 1.25rem;
        font-size: 0.875rem;
    }
`;

const ToastIcon = styled.span`
    font-size: 1.125rem;
    flex-shrink: 0;
`;

const ToastMessage = styled.span`
    flex: 1;
`;

const CloseButton = styled.button`
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    padding: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: all 0.2s ease;
    flex-shrink: 0;

    &:hover {
        
        color: rgba(255, 255, 255, 0.95);
    }

    &:active {
        transform: scale(0.9);
    }
`;

export default Toast;
