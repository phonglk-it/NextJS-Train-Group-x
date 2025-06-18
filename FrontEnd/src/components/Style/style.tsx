'use client'
import clsx from 'clsx';
import React from 'react'
import styles from './style.module.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const Style = () => {

    useEffect(() => {
        AOS.init({ duration: 800, once: true });
        AOS.refresh();
    }, []); 

    return (
    <div className={clsx(styles.containerFluid, styles.body)}>
        <div className={clsx(styles.container)}>
            <div data-aos="fade-up" className={styles.bg}>
                <p  className={styles.text}>BROWSE BY DRESS STYLE</p>
                <div className={styles.styleTop}>
                    <img src="/images/Casual.png" alt="Casual style" />
                    <img src="/images/Formal.png" alt="Formal style" />
                </div>
                <div className={styles.styleUnder}>
                    <img src="/images/Party.png" alt="Party style" />
                    <img src="/images/Gym.png" alt="Gym style" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Style