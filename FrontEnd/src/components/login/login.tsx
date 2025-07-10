'use client';
import React, { useState } from 'react';
import styles from './login.module.css';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/contexts/AuthContext';
import { useNotification } from '@/contexts/NotificationContext';

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  switchToRegister: () => void;
};

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, switchToRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { showNotification } = useNotification();

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      showNotification('error', 'Please enter both email and password');
      return;
    }

    setIsLoading(true);
    try {
      await login(email, password);
      showNotification('success', 'Login successful! Welcome back!');
      onClose();
      // Clear form
      setEmail('');
      setPassword('');
    } catch (error: any) {
      // Handle different types of login errors
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.message) {
        if (error.message.includes('Invalid credentials') || 
            error.message.includes('Invalid email or password')) {
          errorMessage = 'Incorrect email or password. Please try again.';
        } else if (error.message.includes('User not found')) {
          errorMessage = 'No account found with this email address.';
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          errorMessage = 'Network error. Please check your connection and try again.';
        } else {
          errorMessage = error.message;
        }
      }
      
      showNotification('error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.modalClose} onClick={onClose}>
          &times;
        </button>

        <div className={clsx(styles.containerFluid, styles.body)}>
          <div className={styles.container}>
            <div className={styles.groupForm}>
              <p className={styles.welcome}>Welcome Back</p>
              <p className={styles.account}>Sign in to your SHOP.CO account</p>
              <form onSubmit={handleLogin}>
                <p className={styles.email}>Email</p>
                <div className={styles.groupEmail}>
                  <input
                    type="text"
                    name="email"
                    placeholder="Enter your email"
                    className={styles.ipEmail}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                  <FontAwesomeIcon icon={faUser} className={styles.iconEmail} />
                </div>
                <p className={styles.password}>Password</p>
                <div className={styles.groupPass}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter your password"
                    className={styles.ipPassword}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    className={styles.iconPassword}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>
                <div className={styles.rememberForgot}>
                  <label className={styles.remember}>
                    <input type="checkbox" className={styles.cbRemember} />
                    <p className={styles.textRemember}>Remember me</p>
                  </label>
                  <div className={styles.forgot}>
                    <p className={styles.textForgot}>Forgot password?</p>
                  </div>
                </div>
                <button type="submit" className={styles.btnLogin} disabled={isLoading}>
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </button>
              </form>
              <p className={styles.continue}>Or continue with</p>
              <div className={styles.logo}>
                <div className={styles.borderIcon}>
                  <img src="/images/Google.png" alt="Google" />
                </div>
                <div className={styles.borderIcon}>
                  <img src="/images/Facebook.png" alt="Facebook" />
                </div>
              </div>
              <div className={styles.createAccount}>
                <p className={styles.noAccount}>Don't have an account?</p>
                <p
                  className={styles.signupLink}
                  onClick={switchToRegister}
                  style={{ cursor: 'pointer' }}
                >
                  Sign up
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
