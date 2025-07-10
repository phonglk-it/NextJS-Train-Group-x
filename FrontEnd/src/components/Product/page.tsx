"use client";

import { casual } from "@/data/products-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import RelatedProducts from "./RelatedProducts";

// Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <span key={i} className={styles.star}>
        ★
      </span>
    );
  }

  if (hasHalfStar) {
    stars.push(
      <span key="half" className={styles.star}>
        ☆
      </span>
    );
  }

  const remainingStars = 5 - Math.ceil(rating);
  for (let i = 0; i < remainingStars; i++) {
    stars.push(
      <span
        key={`empty-${i}`}
        className={styles.star}
        style={{ color: "#e5e7eb" }}
      >
        ★
      </span>
    );
  }

  return <div className={styles.stars}>{stars}</div>;
};

// Loading skeleton component
const ProductSkeleton = () => (
  <div className={styles.container}>
    <div className={styles.productGrid}>
      <div className={styles.imageSection}>
        <div className={`${styles.skeletonImage} ${styles.skeleton}`} />
      </div>
      <div className={styles.infoSection}>
        <div className={`${styles.skeletonTitle} ${styles.skeleton}`} />
        <div className={`${styles.skeletonPrice} ${styles.skeleton}`} />
        <div className={`${styles.skeletonButton} ${styles.skeleton}`} />
        <div className={`${styles.skeletonButton} ${styles.skeleton}`} />
      </div>
    </div>
  </div>
);

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Fix: Ensure params.id is a string and product.id is compared as string
  const product = casual.find((item) => String(item.id) === String(params.id));

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!product) return notFound();

  if (loading) {
    return <ProductSkeleton />;
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (Number.isNaN(newQuantity)) return;
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsAddingToCart(false);
    // Here you would typically add to cart state or call API
    alert(`Added ${quantity} ${product.name} to cart!`);
  };

  const handleWishlistToggle = () => {
    setIsInWishlist((prev) => !prev);
    // Here you would typically update wishlist state or call API
    alert(!isInWishlist ? "Added to wishlist" : "Removed from wishlist");
  };

  const calculateDiscountPercentage = () => {
    if (product.oldPrice) {
      return Math.round(
        ((product.oldPrice - product.price) / product.oldPrice) * 100
      );
    }
    return 0;
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.productGrid}>
          {/* Image Section */}
          <div className={styles.imageSection}>
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={500}
              className={styles.mainImage}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Product Info Section */}
          <div className={styles.infoSection}>
            <h1 className={styles.productTitle}>{product.name}</h1>

            {/* Rating */}
            <div className={styles.ratingSection}>
              <StarRating rating={product.rating} />
              <span className={styles.ratingText}>
                {product.rating.toFixed(1)}/5 (
                {Math.floor(Math.random() * 100) + 50} reviews)
              </span>
            </div>

            {/* Price Section */}
            <div className={styles.priceSection}>
              <span className={styles.currentPrice}>${product.price}</span>
              {product.oldPrice && (
                <span className={styles.oldPrice}>${product.oldPrice}</span>
              )}
              {(product.discount || product.oldPrice) && (
                <span className={styles.discount}>
                  {product.discount || `-${calculateDiscountPercentage()}%`}
                </span>
              )}
            </div>

            {/* Actions Section */}
            <div className={styles.actionsSection}>
              {/* Quantity Controls */}
              <div className={styles.quantitySection}>
                <span className={styles.quantityLabel}>Quantity:</span>
                <div className={styles.quantityControls}>
                  <button
                    className={styles.quantityButton}
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      handleQuantityChange(Number.isNaN(val) ? 1 : val);
                    }}
                    className={styles.quantityInput}
                    min="1"
                    max="99"
                  />
                  <button
                    className={styles.quantityButton}
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= 99}
                  >
                    +
                  </button>
                </div>
              </div>
              {/* Add to Cart and Wishlist Buttons */}
              <div className={styles.buttonRow}>
                <button
                  className={styles.addToCartButton}
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                >
                  {isAddingToCart ? "Adding..." : "Add to Cart"}
                </button>
                <button
                  className={`${styles.wishlistButton} ${
                    isInWishlist ? styles.inWishlist : ""
                  }`}
                  onClick={handleWishlistToggle}
                >
                  {isInWishlist ? "♥ In Wishlist" : "♡ Add to Wishlist"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts currentProductId={product.id} />
    </>
  );
}
