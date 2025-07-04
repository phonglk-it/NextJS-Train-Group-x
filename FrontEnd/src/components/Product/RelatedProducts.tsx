"use client";

import { casual } from "@/data/products-data";
import Image from "next/image";
import Link from "next/link";
import styles from "./RelatedProducts.module.css";

interface RelatedProductsProps {
  currentProductId: number;
  limit?: number;
}

export default function RelatedProducts({
  currentProductId,
  limit = 4,
}: RelatedProductsProps) {
  // Get related products (excluding current product)
  const relatedProducts = casual
    .filter((product) => product.id !== currentProductId)
    .slice(0, limit);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>You might also like</h2>
      <div className={styles.grid}>
        {relatedProducts.map((product) => (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            className={styles.productCard}
          >
            <div className={styles.imageContainer}>
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className={styles.productImage}
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              {product.discount && (
                <span className={styles.discountBadge}>{product.discount}</span>
              )}
            </div>
            <div className={styles.productInfo}>
              <h3 className={styles.productName}>{product.name}</h3>
              <div className={styles.priceContainer}>
                <span className={styles.price}>${product.price}</span>
                {product.oldPrice && (
                  <span className={styles.oldPrice}>${product.oldPrice}</span>
                )}
              </div>
              <div className={styles.rating}>
                <span className={styles.stars}>
                  {"★".repeat(Math.floor(product.rating))}
                  {product.rating % 1 !== 0 && "☆"}
                  {"★".repeat(5 - Math.ceil(product.rating))}
                </span>
                <span className={styles.ratingText}>
                  {product.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
