"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import styles from "./productCart.module.scss";

export default function Products() {
  const allProducts = [
    {
      id: 1,
      image: "/images/tshirt.png",
      title: "T-SHIRT WITH TAPE DETAILS",
      price: 120,
      rating: 4.5,
    },
    {
      id: 2,
      image: "/images/jeans-1.png",
      title: "SKINNY FIT JEANS",
      price: 240,
      rating: 3.5,
      oldPrice: 260,
      discountPercent: 20,
    },
    {
      id: 3,
      image: "/images/shirt.png",
      title: "CHECKERED SHIRT",
      price: 180,
      rating: 4.5,
    },
    {
      id: 4,
      image: "/images/tshirt-2.png",
      title: "SLEEVE STRIPED T-SHIRT",
      price: 180,
      rating: 4.5,
      oldPrice: 160,
      discountPercent: 30,
    },
    {
      id: 5,
      image: "/images/shirt-2.png",
      title: "VERTICAL STRIPED SHIRTS",
      price: 212,
      rating: 5.0,
      oldPrice: 232,
      discountPercent: 20,
    },
    {
      id: 6,
      image: "/images/shirt-3.png",
      title: "COURAGE GRAPHIC T-SHIRT",
      price: 145,
      rating: 4.0,
    },
    {
      id: 7,
      image: "/images/shorts-1.png",
      title: "LOOSE FIT BERMUDA SHORTS",
      price: 80,
      rating: 3.0,
    },
    {
      id: 8,
      image: "/images/jeans-2.png",
      title: "FADED SKINNY JEANS",
      price: 210,
      rating: 4.5,
    },
  ];
  return (
    <section className="my-[50px] sm:my-[72px]">
      <section className="product-list">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <div className={styles.grid}>
            {allProducts.map((product) => (
              <div key={product.id} className={styles.card}>
                <Image
                  src={product.image}
                  alt={product.title}
                  width={200}
                  height={200}
                />
                <h3>{product.title}</h3>
                <p>Giá: {product.price}₫</p>
                {product.oldPrice && (
                  <p>
                    Giá cũ:{" "}
                    <span style={{ textDecoration: "line-through" }}>
                      {product.oldPrice}₫
                    </span>
                  </p>
                )}
                {product.discountPercent && (
                  <p>Giảm giá: {product.discountPercent}%</p>
                )}
                <p>Đánh giá: {product.rating}⭐</p>
                {/* Thêm nút hoặc link nếu muốn */}
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
