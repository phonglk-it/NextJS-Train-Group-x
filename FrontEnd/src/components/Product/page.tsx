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

  const product = casual.find((item) => item.id === params.id);

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
    setIsInWishlist(!isInWishlist);
    // Here you would typically update wishlist state or call API
    alert(isInWishlist ? "Removed from wishlist" : "Added to wishlist");
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
                    onChange={(e) =>
                      handleQuantityChange(parseInt(e.target.value) || 1)
                    }
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

              {/* Add to Cart Button */}
              <button
                className={styles.addToCartButton}
                onClick={handleAddToCart}
                disabled={isAddingToCart}
              >
                {isAddingToCart ? "Adding..." : "Add to Cart"}
              </button>

              {/* Wishlist Button */}
              <button
                className={styles.wishlistButton}
                onClick={handleWishlistToggle}
              >
                {isInWishlist
                  ? "❤️ Remove from Wishlist"
                  : "🤍 Add to Wishlist"}
              </button>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className={styles.descriptionSection}>
          <h2 className={styles.descriptionTitle}>Product Description</h2>
          <p className={styles.descriptionText}>
            Experience the perfect blend of style and comfort with our premium{" "}
            {product.name.toLowerCase()}. Crafted with attention to detail and
            made from high-quality materials, this piece is designed to elevate
            your everyday wardrobe. Whether you're heading to a casual meetup or
            a semi-formal event, this versatile item will ensure you look your
            best while feeling comfortable throughout the day.
          </p>
          <p className={styles.descriptionText}>
            Features include breathable fabric, durable construction, and a
            modern fit that flatters various body types. The design incorporates
            contemporary trends while maintaining timeless appeal, making it a
            valuable addition to any fashion-conscious individual's collection.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts currentProductId={product.id} />
    </>
  );
}
