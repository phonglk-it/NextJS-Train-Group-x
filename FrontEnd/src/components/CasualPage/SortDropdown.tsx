"use client";

import React from "react";
import styles from "./sortDropdown.module.css";
import { FaChevronDown, FaSlidersH } from "react-icons/fa";

export default function SortDropdown({ onFilterClick }: { onFilterClick: () => void }) {
  return (
    <div className={styles.headerRow}>
    <h2 className={styles.title}>Casual</h2>
    <div className={styles.right}>
      <span className={styles.productCount}>Showing 1-10 of 100 Products</span>
      <div className={styles.sortWrapper}>
        <span className={styles.sortLabel}>Sort by:</span>
        <button className={styles.sortButton}>
          Most Popular
          <FaChevronDown className={styles.chevronIcon} />
        </button>
      </div>
      <button className={styles.filterBtn} onClick={onFilterClick}>
        <FaSlidersH />
      </button>
    </div>
  </div>
  );
}
