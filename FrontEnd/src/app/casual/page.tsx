import React from "react";
import ProductCard from "@/components/Product/ProductCard";
import styles from "./casualPage.module.css";
import { casual } from "@/data/products-data";
export default function CasualPage() {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        {/* Giả lập filter */}
        <h3>Filters</h3>
        {/* Thêm các filter nếu cần sau */}
      </aside>
      <main className={styles.content}>
        <h1 className={styles.heading}>Casual</h1>
        <div className={styles.productGrid}>
          {casual.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
