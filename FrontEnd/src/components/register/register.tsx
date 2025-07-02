'use client';
import React, { useState } from 'react';
import styles from './register.module.css';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faEnvelope } from '@fortawesome/free-solid-svg-icons';

type RegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
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
              <p className={styles.welcome}>Create Account</p>
              <p className={styles.account}>Join SHOP.CO and start shopping</p>
              <form method="POST">
                <div className={styles.fullName}>
                  <div className={styles.name}>
                    <div className={styles.textName}>
                      <p>First Name</p>
                      <p className={styles.lastName}>Last Name</p>
                    </div>
                    <div className={styles.ipName}>
                      <input type="text" placeholder="John" />
                      <input type="text" placeholder="Doe" />
                    </div>
                  </div>
                </div>

                <p className={styles.email}>Email Address</p>
                <div className={styles.groupEmail}>
                  <input
                    type="text"
                    name="email"
                    placeholder="john.doe@example.com"
                    className={styles.ipEmail}
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
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm your password"
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
                    <input type="checkbox" name="Remember" className={styles.cbRemember} />
                    <p className={styles.textRemember}>
                      I agree to the <span className={styles.texthint}>Terms of Service</span> and <span className={styles.texthint}>Privacy Policy</span>
                    </p>
                  </label>
                </div>

                <button type="submit" className={styles.btnLogin}>Create Account</button>
              </form>

              <p className={styles.continue}>Or continue with</p>
              <div className={styles.logo}>
                <div className={styles.borderIcon}><img src="/images/Google.png" alt="Google icon" /></div>
                <div className={styles.borderIcon}><img src="/images/Facebook.png" alt="Facebook icon" /></div>
              </div>

              <div className={styles.createAccount}>
                <p className={styles.noAccount}>Already have an account?</p>
                <p className={styles.signupLink} onClick={onClose} style={{ cursor: "pointer" }}>Sign in</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
