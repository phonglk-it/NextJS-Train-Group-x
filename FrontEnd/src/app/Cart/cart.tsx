'use client'
import React, { useState, useEffect } from 'react';
import styles from './cart.module.css';
import clsx from 'clsx';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useAuth } from '@/contexts/AuthContext';
import LoginModal from '@/components/login/login';

interface CartProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
  color: string;
}

const Cart = () => {
  const { user, loading } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [products, setProducts] = useState<CartProduct[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      setShowLoginModal(true);
    } else {
      setShowLoginModal(false);
    }
  }, [user, loading]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    AOS.refresh();
  
    const fetchCartItems = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/carts/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (!res.ok) throw new Error("Failed to fetch cart items");
  
        const data = await res.json();
        console.log("Fetched cart items:", data);

        let items = [];
        if (Array.isArray(data)) {
          items = data;
        } else if (Array.isArray(data.results)) {
          items = data.results;
        } else {
          items = [];
          console.error("Cart API did not return an array or paginated results:", data);
        }

        const transformed = items.map((item: any) => ({
          id: item.id,
          name: item.product.name,
          price: item.product.price,
          image: item.product.image,
          quantity: item.quantity,
          size: item.product.size,
          color: item.product.color,
        }));
        setProducts(transformed);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
  
    fetchCartItems();
  }, []);

  if (loading) return null;

  return (
    <>
      {/* Nếu chưa đăng nhập, hiện modal login, không render cart */}
      {!user && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          switchToRegister={() => setShowLoginModal(false)}
        />
      )}
      {/* Nếu đã đăng nhập, render cart */}
      {user && (() => {
        const handleDelete = async (id: number) => {
          try {
            const res = await fetch(`http://127.0.0.1:8000/carts/${id}/`, {
              method: 'DELETE',
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
            });
            if (res.ok) {
              setProducts(products.filter(item => item.id !== id));
            } else {
              console.error("Failed to delete cart item");
            }
          } catch (err) {
            console.error("Delete error:", err);
          }
        };
        const updateQuantity = async (id: number, quantity: number) => {
          try {
            const res = await fetch(`http://127.0.0.1:8000/carts/${id}/`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
              body: JSON.stringify({ quantity }),
            });
            if (!res.ok) throw new Error("Update failed");
            setProducts(prev =>
              prev.map(product =>
                product.id === id ? { ...product, quantity } : product
              )
            );
          } catch (err) {
            console.error("Update quantity error:", err);
          }
        };
        const increaseQuantity = (id: number) => {
          const item = products.find(p => p.id === id);
          if (item) updateQuantity(id, item.quantity + 1);
        };
        const decreaseQuantity = (id: number) => {
          const item = products.find(p => p.id === id);
          if (item && item.quantity > 1) updateQuantity(id, item.quantity - 1);
        };
        const subtotal = products.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const discount = subtotal * 0.2;
        const deliveryFee = 15;
        const total = subtotal - discount + deliveryFee;
        return (
          <div className={clsx(styles.containerFluid, styles.body)}>
            <div className={styles.container}>
              <div className={styles.link}>
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
      })()}
    </>
  );
};

export default Cart;
