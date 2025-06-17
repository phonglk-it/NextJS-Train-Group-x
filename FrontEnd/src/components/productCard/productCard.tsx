"use client";

import React from "react";
import { Star, StarHalf } from "lucide-react";

import styles from "./productCard.module.scss";

interface ProductCardProps {
  productPath: string;
  title: string;
  rate: number;
  originalPrice: number;
  salePercent: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  productPath,
  title,
  rate,
  originalPrice,
  salePercent,
}) => {
  const price = (originalPrice * salePercent) / 100;

  const renderStars = () => {
    if (rate < 0 || rate > 5) return null;

    const fullStars = Math.floor(rate);
    const hasHalf = rate % 1 >= 0.5;

    return (
      <div className="flex items-center gap-0.5 text-yellow-500">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} fill="currentColor" className="w-4 h-4" />
        ))}
        {hasHalf && <StarHalf fill="currentColor" className="w-4 h-4" />}
      </div>
    );
  };

  return (
    <div className={styles.card}>
      <img
        src={productPath}
        alt={title}
        className="w-full h-56 object-contain"
      />

      <h2 className="text-sm font-medium">{title}</h2>

      <div className="flex items-center text-sm gap-2">
        {renderStars()}
        <span className="text-gray-500 text-xs">{rate.toFixed(1)}/5</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-lg font-bold text-black">${price}</span>
        <span className="line-through text-gray-400 text-sm">
          ${originalPrice}
        </span>
        <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">
          -{salePercent}%
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
