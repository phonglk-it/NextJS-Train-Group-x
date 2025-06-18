"use client";
import React from "react";
import ProductCard from "@/components/productCard/productCard";
import styles from "./page.module.scss";


export default function Home() {
  const dataMock = [
    {
      id: 1,
      productPath: "/images/tshirt-1.png",
      title: "T-SHIRT WITH TAPE DETAILS",
      rate: 5.0,
      originalPrice: 232,
      salePercent: 20,
    },
    {
      id: 2,
      productPath: "/images/jeans-1.png",
      title: "SKINNY FIT JEANS",
      rate: 4.0,
      originalPrice: 145,
      salePercent: 0,
    },
    {
      id: 3,
      productPath: "/images/shirt-1.png",
      title: "CHECKERED SHIRT",
      rate: 4.8,
      originalPrice: 300,
      salePercent: 15,
    },
    {
      id: 4,
      productPath: "/images/tshirt-2.png",
      title: "SLEEVE STRIPED T-SHIRT",
      rate: 4.3,
      originalPrice: 180,
      salePercent: 10,
    },
  ];

  const renderProductCard = () => {
    return dataMock.map((item) => {
      return (
        <div key={item.id}>
          <ProductCard
            productPath={item.productPath}
            title={item.title}
            rate={item.rate}
            originalPrice={item.originalPrice}
            salePercent={item.salePercent}
          />
        </div>
      );
    });
  };

  return (
    <div>
      <h1>NEW ARRIVALS</h1>
      <div className={styles.card}>{renderProductCard()}</div>
    </div>
    
  );
}
