'use client';
import React, { useEffect } from 'react';
import styles from './Notification.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheckCircle, 
  faExclamationTriangle, 
  faInfoCircle, 
  faTimes,
  faTimesCircle 
} from '@fortawesome/free-solid-svg-icons';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationProps {
  type: NotificationType;
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number; // Auto-close duration in milliseconds
}

const Notification: React.FC<NotificationProps> = ({
  type,
  message,
  isVisible,
  onClose,
  duration = 5000
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return faCheckCircle;
      case 'error':
        return faTimesCircle;
      case 'warning':
        return faExclamationTriangle;
      case 'info':
        return faInfoCircle;
      default:
        return faInfoCircle;
    }
  };

  const getTypeClass = () => {
    switch (type) {
      case 'success':
        return styles.success;
      case 'error':
        return styles.error;
      case 'warning':
        return styles.warning;
      case 'info':
        return styles.info;
      default:
        return styles.info;
    }
  };

  return (
    <div className={`${styles.notification} ${getTypeClass()} ${styles.slideIn}`}>
      <div className={styles.iconContainer}>
        <FontAwesomeIcon icon={getIcon()} className={styles.icon} />
      </div>
      <div className={styles.content}>
        <p className={styles.message}>{message}</p>
      </div>
      <button className={styles.closeButton} onClick={onClose}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
};

export default Notification; 