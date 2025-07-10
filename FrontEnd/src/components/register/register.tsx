'use client';
import React, { useState } from 'react';
import styles from './register.module.css';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNotification } from '@/contexts/NotificationContext';

type RegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  switchToLogin: () => void;
};

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, switchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const { showNotification } = useNotification();

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    if (!formData.first_name.trim()) {
      showNotification('error', 'Please enter your first name');
      return false;
    }
    if (!formData.last_name.trim()) {
      showNotification('error', 'Please enter your last name');
      return false;
    }
    if (!formData.email.trim()) {
      showNotification('error', 'Please enter your email address');
      return false;
    }
    if (!formData.password) {
      showNotification('error', 'Please enter a password');
      return false;
    }
    if (formData.password.length < 8) {
      showNotification('error', 'Password must be at least 8 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      showNotification('error', 'Passwords do not match');
      return false;
    }
    if (!formData.agreeToTerms) {
      showNotification('error', 'Please agree to the Terms of Service and Privacy Policy');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const API_BASE_URL = 'http://localhost:8000';
      const response = await fetch(`${API_BASE_URL}/users/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.email,
          email: formData.email,
          password: formData.password,
          first_name: formData.first_name,
          last_name: formData.last_name,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || JSON.stringify(data));
      }

      showNotification('success', 'Account created successfully! Please sign in.');
      onClose();
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
      });
    } catch (error: any) {
      let errorMessage = 'Registration failed. Please try again.';
      if (error.message) {
        if (error.message.includes('email')) {
          errorMessage = 'This email address is already registered.';
        } else if (error.message.includes('username')) {
          errorMessage = 'This username is already taken.';
        } else if (error.message.includes('password')) {
          errorMessage = 'Password is invalid.';
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
              <p className={styles.welcome}>Create Account</p>
              <p className={styles.account}>Join SHOP.CO and start shopping</p>
              <form onSubmit={handleSubmit}>
                <div className={styles.fullName}>
                  <div className={styles.name}>
                    <div className={styles.textName}>
                      <p>First Name</p>
                      <p className={styles.lastName}>Last Name</p>
                    </div>
                    <div className={styles.ipName}>
                      <input 
                        type="text" 
                        placeholder="John" 
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        disabled={isLoading}
                      />
                      <input 
                        type="text" 
                        placeholder="Doe" 
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>

                <p className={styles.email}>Email Address</p>
                <div className={styles.groupEmail}>
                  <input
                    type="email"
                    name="email"
                    placeholder="john.doe@example.com"
                    className={styles.ipEmail}
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                  <FontAwesomeIcon icon={faEnvelope} className={styles.iconEmail} />
                </div>

                <p className={styles.password}>Password</p>
                <div className={styles.groupPass}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Create a strong password"
                    className={styles.ipPassword}
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    className={styles.iconPassword}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>

                <div className={styles.navList}>
                  <ul className={styles.list}>
                    <li>At least 8 characters</li>
                    <li>Upper & lowercase letters</li>
                    <li>At least one number</li>
                  </ul>
                </div>

                <p className={styles.password}>Confirm Password</p>
                <div className={styles.groupPass}>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    className={styles.ipPassword}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                  <FontAwesomeIcon
                    icon={showConfirmPassword ? faEyeSlash : faEye}
                    className={styles.iconPassword}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                </div>

                <div className={styles.rememberForgot}>
                  <label className={styles.remember}>
                    <input 
                      type="checkbox" 
                      name="agreeToTerms" 
                      className={styles.cbRemember}
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      disabled={isLoading}
                    />
                    <p className={styles.textRemember}>
                      I agree to the <span className={styles.texthint}>Terms of Service</span> and <span className={styles.texthint}>Privacy Policy</span>
                    </p>
                  </label>
                </div>

                <button type="submit" className={styles.btnLogin} disabled={isLoading}>
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>

              <p className={styles.continue}>Or continue with</p>
              <div className={styles.logo}>
                <div className={styles.borderIcon}><img src="/images/Google.png" alt="Google icon" /></div>
                <div className={styles.borderIcon}><img src="/images/Facebook.png" alt="Facebook icon" /></div>
              </div>

              <div className={styles.createAccount}>
                <p className={styles.noAccount}>Already have an account?</p>
                <p className={styles.signupLink} onClick={switchToLogin} style={{ cursor: "pointer" }}>Sign in</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
