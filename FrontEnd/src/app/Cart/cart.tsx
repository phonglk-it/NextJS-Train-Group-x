'use client'
import React, { useState, useEffect } from 'react';
import styles from './cart.module.css';
import clsx from 'clsx';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Cart = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Gradient Graphic T-shirt',
      size: 'Large',
      color: 'White',
      price: 145,
      image: '/images/Product-1.png',
      quantity: 1
    },
    {
      id: 2,
      name: 'CHECKERED SHIRT',
      size: 'Medium',
      color: 'Red',
      price: 180,
      image: '/images/Product-2.png',
      quantity: 1
    },
    {
      id: 3,
      name: 'CHECKERED SHIRT',
      size: 'Large',
      color: 'Blue',
      price: 240,
      image: '/images/Product-3.png',
      quantity: 1
    }
  ]);

  const handleDelete = (id: number) => {
    setProducts(products.filter(item => item.id !== id));
  };

  const increaseQuantity = (id: number) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    AOS.refresh();
  }, [products]);

  const subtotal = products.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = subtotal * 0.2;
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  return (
    <div className={clsx(styles.containerFluid, styles.body)}>
      <div className={styles.container}>
        <div data-aos="fade-up" className={styles.link}>
          <p className={styles.titleHome}><a href="#">Home</a></p>
          <FontAwesomeIcon icon={faAngleRight} className={styles.iconNext} />
          <p className={styles.titleCart}>Cart</p>
        </div>
        <p data-aos="fade-up" className={styles.titlePage}>Your cart</p>
        <div data-aos="fade-up" className={styles.total}>
          <div data-aos="fade-up" className={styles.products}>
            {products.map(product => (
              <div className={styles.item} key={product.id}>
                <img src={product.image} alt={product.name} />
                <div className={styles.infoProduct}>
                  <p className={styles.nameProduct}>{product.name}</p>
                  <p className={styles.sizeProduct}>Size: {product.size}</p>
                  <p className={styles.colorProduct}>Color: {product.color}</p>
                  <p className={styles.priceProduct}>${product.price}</p>
                </div>
                <div className={styles.deleteCounter}>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(product.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <div className={styles.counter}>
                    <button onClick={() => decreaseQuantity(product.id)} className={styles.btn}>−</button>
                    <span className={styles.quantity}>{product.quantity}</span>
                    <button onClick={() => increaseQuantity(product.id)} className={styles.btn}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div data-aos="fade-up" className={styles.summary}>
            <h3 className={styles.summaryTitle}>Order Summary</h3>

            <div className={styles.summaryRow}>
              <span className={styles.label}>Subtotal</span>
              <span className={styles.value}>${subtotal}</span>
            </div>

            <div className={styles.summaryRow}>
              <span className={styles.label}>Discount (-20%)</span>
              <span className={`${styles.value} ${styles.discount}`}>-${discount.toFixed(0)}</span>
            </div>

            <div className={styles.summaryRow}>
              <span className={styles.label}>Delivery Fee</span>
              <span className={styles.value}>${deliveryFee}</span>
            </div>

            <hr style={{ margin: '20px 0', borderColor: '#eee' }} />

            <div className={styles.totalRow}>
              <span>Total</span>
              <span>${total.toFixed(0)}</span>
            </div>

            <div className={styles.promo}>
              <input type="text" placeholder="Add promo code" className={styles.promoInput} />
              <button className={styles.promoButton}>Apply</button>
            </div>

            <button className={styles.checkoutButton}>Go to Checkout →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
