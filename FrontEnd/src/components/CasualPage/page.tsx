"use client";

import styles from "./casualPage.module.css";
import ResponsiveFilterSidebar from "@/components/CasualPage/ResponsiveFilterSidebar";
import SortDropdown from "@/components/CasualPage/SortDropdown";
import Pagination from "@/components/CasualPage/Pagination";
import { casual } from "@/data/products-data";
import ProductCard from "@/components/Product/ProductCard";
import { useState } from "react";

export default function CasualPage() {
  const [sort, setSort] = useState("popular");
  const [products, setProducts] = useState(casual);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;
  const totalPages = Math.ceil(products.length / pageSize);

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
    setCurrentPage(1); // Reset page when sort changes
  }

  // Lấy sản phẩm cho trang hiện tại
  const paginatedProducts = products.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className={styles.pageContainer}>
      <ResponsiveFilterSidebar
        isOpen={true}
        onClose={() => {}}
        onFilterChange={setProducts}
      />
      <div className={styles.mainContent}>
        <SortDropdown onSortChange={handleSortChange} />
        <div className={styles.productGrid}>
          {paginatedProducts.map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
        <Pagination />
        <div className={styles.divider}></div>
      </div>
    </div>
  );
}
