"use client";
import React, { useState } from "react";
import ProductCard from "@/components/Product/ProductCard";
import styles from "./casualPage.module.css";
import { casual } from "@/data/products-data";

import ResponsiveFilterSidebar from "@/components/CasualPage/ResponsiveFilterSidebar";
import SortDropdown from "@/components/CasualPage/SortDropdown";
import Pagination from "@/components/CasualPage/Pagination";
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";

export default function CasualPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sort, setSort] = useState("popular");
  const [products, setProducts] = useState(casual);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  function handleSortChange(sortValue: string) {
    setSort(sortValue);
    setProducts((prevProducts) => {
      let sorted = [...prevProducts];
      if (sortValue === "lowToHigh") {
        sorted.sort((a, b) => a.price - b.price);
      } else if (sortValue === "highToLow") {
        sorted.sort((a, b) => b.price - a.price);
      } else if (sortValue === "newest") {
        return [...casual]; // giả sử dữ liệu đã sắp xếp theo newest
      } else if (sortValue === "rating") {
        sorted.sort((a, b) => b.rating - a.rating);
      } else {
        return [...casual]; // popular mặc định
      }
      return sorted;
    });
  }

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <ResponsiveFilterSidebar
            isOpen={sidebarOpen}
            onClose={closeSidebar}
          />
        </aside>
        <main className={styles.content}>
          <div className={styles.header}>
            <SortDropdown
              onSortChange={handleSortChange}
              onFilterClick={toggleSidebar}
            />
          </div>
          <div className={styles.productGrid}>
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
          <hr className={styles.paginationDivider} />
          <Pagination />
        </main>
      </div>
      <Footer />
    </div>
  );
}
