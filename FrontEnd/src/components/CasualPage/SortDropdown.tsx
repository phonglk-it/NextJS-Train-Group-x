"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./SortDropdown.module.css";
import { FaChevronDown, FaSlidersH } from "react-icons/fa";

const SORT_OPTIONS = [
  { label: "Most Popular", value: "popular" },
  { label: "Price: Low to High", value: "lowToHigh" },
  { label: "Price: High to Low", value: "highToLow" },
  { label: "Newest", value: "newest" },
  { label: "Customer Rating", value: "rating" },
];

export default function SortDropdown({
  onSortChange,
  onFilterClick,
}: {
  onSortChange: (sortValue: string) => void;
  onFilterClick?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(SORT_OPTIONS[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className={styles.headerRow}>
      <h2 className={styles.title}>Casual</h2>
      <div className={styles.right}>
        <span className={styles.productCount}>
          Showing 1-10 of 100 Products
        </span>
        <div className={styles.sortWrapper} ref={dropdownRef}>
          <span className={styles.sortLabel}>Sort by</span>
          <button
            className={styles.sortButton}
            onClick={() => setOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={open}
          >
            {selected.label}
            <FaChevronDown className={styles.chevronIcon} />
          </button>
          {open && (
            <ul className={styles.sortDropdownMenu} role="listbox">
              {SORT_OPTIONS.map((option) => (
                <li
                  key={option.value}
                  className={
                    option.value === selected.value
                      ? styles.sortDropdownOptionSelected
                      : styles.sortDropdownOption
                  }
                  role="option"
                  aria-selected={option.value === selected.value}
                  onClick={() => {
                    setSelected(option);
                    setOpen(false);
                    onSortChange(option.value);
                  }}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
