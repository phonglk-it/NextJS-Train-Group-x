'use client';
import React, { useState } from 'react';
import styles from './login.module.css';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
    switchToRegister: () => void;
};


  const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, switchToRegister }) => {

  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

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
              <form method="POST">
                <p className={styles.email}>Email</p>
                <div className={styles.groupEmail}>
                  <input type="text" name="email" placeholder="Enter your email" className={styles.ipEmail} />
                  <FontAwesomeIcon icon={faUser} className={styles.iconEmail} />
                </div>
                <p className={styles.password}>Password</p>
                <div className={styles.groupPass}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter your password"
                    className={styles.ipPassword}
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
                <button type="submit" className={styles.btnLogin}>Sign In</button>
              </form>
              <p className={styles.continue}>Or continue with</p>
              <div className={styles.logo}>
                <div className={styles.borderIcon}><img src="/images/Google.png" alt="Google" /></div>
                <div className={styles.borderIcon}><img src="/images/Facebook.png" alt="Facebook" /></div>
              </div>
              <div className={styles.createAccount}>
                <p className={styles.noAccount}>Don't have an account?</p>
                <p className={styles.signupLink} onClick={switchToRegister} style={{ cursor: 'pointer' }}>
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
