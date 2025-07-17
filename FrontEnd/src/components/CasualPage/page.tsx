"use client";

import styles from "./casualPage.module.css";
import ResponsiveFilterSidebar from "@/components/CasualPage/ResponsiveFilterSidebar";
import SortDropdown from "@/components/CasualPage/SortDropdown";
import Pagination from "@/components/CasualPage/Pagination";
import { casual } from "@/data/products-data";
import { Product } from "@/types/Product";
import ProductCard from "@/components/Product/ProductCard";
import { useState, useEffect } from "react";

export default function CasualPage() {
  const [sort, setSort] = useState<string>("popular");
  const [products, setProducts] = useState<Product[]>([]);
  const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 9;

  // Fetch sản phẩm từ API khi load trang
  useEffect(() => {
    fetch("http://localhost:8000/api/products/")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setOriginalProducts(data);
      });
  }, []);

  const totalPages = Math.ceil(products.length / pageSize);
  console.log(products);
  console.log(originalProducts);
  console.log(sort);
  console.log(currentPage);
  console.log(pageSize);
  console.log(totalPages);

  function handleSortChange(sortValue: string) {
    setSort(sortValue);
    setProducts((prevProducts) => {
      let sorted = [...prevProducts];
      if (sortValue === "lowToHigh") {
        sorted.sort((a, b) => a.price - b.price);
      } else if (sortValue === "highToLow") {
        sorted.sort((a, b) => b.price - a.price);
      } else if (sortValue === "newest") {
        // Assuming newest means the original order from API
        return [...originalProducts];
      } else if (sortValue === "rating") {
        sorted.sort((a, b) => b.rating - a.rating);
      } else {
        // popular mặc định, fallback to original order
        return [...originalProducts];
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
