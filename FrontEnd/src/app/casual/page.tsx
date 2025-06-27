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

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);
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
            <SortDropdown onFilterClick={toggleSidebar} />
          </div>
          <div className={styles.productGrid}>
            {casual.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
          <Pagination />
        </main>
      </div>
      <Footer />
    </div>
  );
}
