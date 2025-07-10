'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import Notification, { NotificationType } from '@/components/Notification/Notification';

interface NotificationContextType {
  showNotification: (type: NotificationType, message: string, duration?: number) => void;
  hideNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notification, setNotification] = useState<{
    type: NotificationType;
    message: string;
    isVisible: boolean;
    duration: number;
  }>({
    type: 'info',
    message: '',
    isVisible: false,
    duration: 5000,
  });

  const showNotification = (type: NotificationType, message: string, duration: number = 5000) => {
    setNotification({
      type,
      message,
      isVisible: true,
      duration,
    });
  };

  const hideNotification = () => {
    setNotification(prev => ({
      ...prev,
      isVisible: false,
    }));
  };

  const value: NotificationContextType = {
    showNotification,
    hideNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Notification
        type={notification.type}
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={hideNotification}
        duration={notification.duration}
      />
    </NotificationContext.Provider>
  );
}; 