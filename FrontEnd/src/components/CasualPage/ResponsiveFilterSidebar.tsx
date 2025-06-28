"use client";

import React, { useState } from "react";
import FilterSidebar from "./FilterSidebar";
import styles from "./responsiveFilterSidebar.module.css";
import { FaSlidersH } from "react-icons/fa";
import Image from "next/image";

export default function ResponsiveFilterSidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Overlay */}
      {isOpen && <div className={styles.overlay} onClick={onClose} />}
      {/* Sidebar Slide In */}
      <div className={`${styles.sidebarWrapper} ${isOpen ? styles.open : ""}`}>
        <FilterSidebar onClose={onClose} />
      </div>
    </>
  );
}
