'use client'
import clsx from 'clsx';
import React, { useEffect } from 'react';
import styles from './style.module.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Style = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    AOS.refresh();
  }, []);

  return (
    <div className={clsx(styles.containerFluid, styles.body)}>
      <div className={clsx(styles.container)}>
        <div data-aos="fade-up" className={styles.bg}>
          <p data-aos="fade-up" className={styles.text}>BROWSE BY DRESS STYLE</p>
          <div data-aos="fade-up" className={styles.styleTop}>
            <img data-aos="fade-up" src="/images/Casual.png" alt="Casual style" />
            <img data-aos="fade-up" src="/images/Formal.png" alt="Formal style" />
          </div>
          <div data-aos="fade-up" className={styles.styleUnder}>
            <img data-aos="fade-up" src="/images/Party.png" alt="Party style" />
            <img data-aos="fade-up" src="/images/Gym.png" alt="Gym style" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Style;
