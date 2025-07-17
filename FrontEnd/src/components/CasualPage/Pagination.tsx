"use client";

import React, { useState } from "react";

import styles from "./pagination.module.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const Pagination = () => {
  const totalPages = 10; // Số trang thực tế
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  // Hàm tạo mảng số trang với dấu ...
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  return (
    <div className={styles.pagination}>
      <Link
        href={`/casual?page=${currentPage - 1}`}
        className={styles.navButton}
        aria-disabled={currentPage === 1}
        tabIndex={currentPage === 1 ? -1 : 0}
      >
        <span style={{ fontSize: "1.2em" }}>←</span>
        Previous
      </Link>
      <div className={styles.paginationInner}>
        {getPageNumbers().map((page, idx) =>
          page === "..." ? (
            <span key={"ellipsis-" + idx} className={styles.ellipsis}>
              ...
            </span>
          ) : (
            <Link
              key={page}
              href={`/casual?page=${page}`}
              className={`${styles.pageButton} ${
                currentPage === page ? styles.activePage : ""
              }`}
            >
              {page}
            </Link>
          )
        )}
      </div>
      <Link
        href={`/casual?page=${currentPage + 1}`}
        className={styles.navButton}
        aria-disabled={currentPage === totalPages}
        tabIndex={currentPage === totalPages ? -1 : 0}
      >
        Next
        <span style={{ fontSize: "1.2em" }}>→</span>
      </Link>
    </div>
  );
};

export default Pagination;
