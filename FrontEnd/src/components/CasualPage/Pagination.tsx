"use client";

import React, { useState } from "react";

import styles from "./pagination.module.css";

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // ví dụ 10 trang

  const handleClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Hàm tạo mảng số trang với dấu ...
  const getPageNumbers = () => {
    const pages = [];
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
      <button
        className={styles.pageButton}
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <span style={{ marginRight: 4 }}>←</span> Previous
      </button>

      {getPageNumbers().map((page, idx) =>
        page === "..." ? (
          <span key={"ellipsis-" + idx} className={styles.ellipsis}>
            ...
          </span>
        ) : (
          <button
            key={page}
            className={`${styles.pageButton} ${
              currentPage === page ? styles.active : ""
            }`}
            onClick={() => handleClick(Number(page))}
          >
            {page}
          </button>
        )
      )}

      <button
        className={styles.pageButton}
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next <span style={{ marginLeft: 4 }}>→</span>
      </button>
    </div>
  );
};

export default Pagination;
