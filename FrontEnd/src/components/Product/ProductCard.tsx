"use client";
import React, { useEffect, useRef, useState } from "react";
import { Product } from "../../types/Product";
import styles from "../Style/productCard.module.css";

interface ProductCardProps {
  product: Product;
  isMobile?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isMobile }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // chỉ trigger 1 lần
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`${styles.productCard} ${styles.animate} ${
        visible ? styles.visible : ""
      }`}
    >
      <div className={styles.imageWrapper}>
        <img src={product.image} alt={product.name} />
      </div>
      <p className={styles.productName}>{product.name}</p>
      <div className={styles.rating}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`${styles.star} ${
              i < Math.floor(product.rating) ? styles.filled : ""
            }`}
          >
            ★
          </span>
        ))}
        <span className={styles.score}>{product.rating}/5</span>
      </div>
      <div className={styles.price}>
        <span className={styles.current}>${product.price}</span>
        {product.oldPrice && (
          <span className={styles.oldGroup}>
            <span className={styles.old}>${product.oldPrice}</span>
            <span className={styles.discount}>{product.discount}</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
