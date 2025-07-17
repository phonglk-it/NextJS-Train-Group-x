"use client";

import React from "react";
import FilterSidebar from "./FilterSidebar";
import styles from "./ResponsiveFilterSidebar.module.css";

export default function ResponsiveFilterSidebar({
  isOpen,
  onClose,
  onFilterChange, 
}: {
  isOpen: boolean;
  onClose: () => void;
  onFilterChange?: (data: any) => void;
}) {
  return (
    <>
      {/* Overlay */}
      {isOpen && <div className={styles.overlay} onClick={onClose} />}
      {/* Sidebar Slide In */}
      <div className={`${styles.sidebarWrapper} ${isOpen ? styles.open : ""}`}>
        <FilterSidebar onFilterChange={onFilterChange} />
      </div>
    </>
  );
}
