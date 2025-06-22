import React from "react";
import { Product } from "../../types/Product";
import ProductCard from "./ProductCard";
import styles from "../Style/productSection.module.css";
import Link from "next/link";

interface ProductSectionProps {
  title: string;
  products: Product[];
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, products }) => {
  return (
    <section className={styles.productSection}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.productGrid}>
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      <div className={styles.viewAllWrapper}>
        <Link href="/casual">
          <button className={styles.viewAll}>View All</button>
        </Link>
      </div>
    </section>
  );
};

export default ProductSection;
