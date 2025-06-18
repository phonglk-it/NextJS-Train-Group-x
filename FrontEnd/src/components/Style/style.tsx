import clsx from 'clsx';
import React from 'react'
import styles from './style.module.css'

const Style = () => {
  return (
    <div className={clsx(styles.containerFluid, styles.body)}>
        <div className={clsx(styles.container)}>
            <div className={styles.bg}>
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