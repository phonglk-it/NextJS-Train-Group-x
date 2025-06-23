import React from "react";
import ProductCard from "@/components/Product/ProductCard";
import styles from "./casualPage.module.css";
import { casual } from "@/data/products-data";

import FilterSidebar from "@/components/CasualPage/FilterSidebar";
import SortDropdown from "@/components/CasualPage/SortDropdown";
import Pagination from "@/components/CasualPage/Pagination";


export default function CasualPage() {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <FilterSidebar />
      </aside>
      <main className={styles.content}>
        <div className={styles.header}>
          <SortDropdown />
        </div>
        <div className={styles.productGrid}>
          {casual.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
        <Pagination />
      </main>
    </div>
  );
}