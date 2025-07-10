"use client";

import React, { useState } from "react";
import styles from "./filterSidebar.module.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { FaChevronRight } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import Image from "next/image";
import { casual } from "@/data/products-data";
import { FaSlidersH } from "react-icons/fa";

const categories = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"];
const colors = [
  "green",
  "red",
  "yellow",
  "orange",
  "cyan",
  "blue",
  "purple",
  "pink",
  "white",
  "black",
];
const PRICE_MIN = 0;
const PRICE_MAX = 1000;
const sizes = [
  "XX-Small",
  "SX-Small",
  "Small",
  "Medium",
  "Large",
  "X-Large",
  "XX-Large",
  "3X-Large",
  "4X-Large",
];
const dressStyles = ["Casual", "Formal", "Party", "Gym"];

export default function FilterSidebar({
  onFilterChange,
}: {
  onFilterChange?: (data: any) => void;
}) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 200]);
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({
    Price: true,
    Colors: true,
    Size: true,
    "Dress Style": true,
  });
  const [filterCollapsed, setFilterCollapsed] = useState(false);
  const [selectedDressStyle, setSelectedDressStyle] = useState<string | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleSection = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleApplyFilter = () => {
    let filtered = casual.filter((product) => {
      if (product.price < priceRange[0] || product.price > priceRange[1])
        return false;
      return true;
    });
    onFilterChange && onFilterChange(filtered);
  };

  return (
    <aside
      className={
        filterCollapsed
          ? `${styles.sidebar} ${styles.collapsed}`
          : styles.sidebar
      }
    >
      {filterCollapsed ? (
        <div className={styles.filterCollapsedWrapper}>
          <button
            className={styles.filterCircleBtn}
            onClick={() => setFilterCollapsed(false)}
            aria-label="Expand filter sidebar"
          >
            <FaSlidersH size={32} />
          </button>
        </div>
      ) : (
        <>
          <div className={styles.header}>
            <h4 className={styles.title}>Filters</h4>
            <button
              className={styles.filterIconBtn}
              aria-label="Filter icon"
              onClick={() => setFilterCollapsed(true)}
            >
              <Image
                src="/images/filters-close.png"
                alt="Filter"
                width={22}
                height={19}
              />
            </button>
          </div>
          <div className={styles.divider} />
          {/* Categories */}
          <div className={styles.filterSection}>
            <ul className={styles.categoryList}>
              {categories.map((cat) => (
                <li
                  key={cat}
                  className={`${styles.categoryItem} ${
                    selectedCategory === cat ? styles.categoryItemSelected : ""
                  }`}
                  onClick={() =>
                    setSelectedCategory(selectedCategory === cat ? null : cat)
                  }
                  style={{ cursor: "pointer" }}
                >
                  <span>{cat}</span>
                  <span className={styles.arrow}>&#8250;</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Price */}
          <div className={styles.divider} />
          <div className={styles.filterSection}>
            <h4 onClick={() => toggleSection("Price")}>Price</h4>
            {expanded.Price && (
              <div className={styles.sliderWrapper}>
                <Slider
                  range
                  min={PRICE_MIN}
                  max={PRICE_MAX}
                  step={1}
                  value={priceRange}
                  onChange={(value) => setPriceRange(value as [number, number])}
                  trackStyle={[{ backgroundColor: "#000" }]}
                  handleStyle={[
                    { borderColor: "#000", backgroundColor: "#000" },
                    { borderColor: "#000", backgroundColor: "#000" },
                  ]}
                />
                <div className={styles.priceLabels}>
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            )}
          </div>
          {/* Colors */}
          <div className={styles.divider} />
          <div className={styles.filterSection}>
            <h4 onClick={() => toggleSection("Colors")}>Colors</h4>
            {expanded.Colors && (
              <div className={styles.colors}>
                {colors.map((color) => (
                  <div
                    key={color}
                    className={`${styles.colorDot} ${
                      selectedColor === color
                        ? color === "white"
                          ? styles.selectedWhite
                          : styles.selected
                        : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() =>
                      setSelectedColor(selectedColor === color ? null : color)
                    }
                  >
                    {selectedColor === color && (
                      <span className={styles.checkmark}>✔</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Sizes */}
          <div className={styles.divider} />
          <div className={styles.filterSection}>
            <h4 onClick={() => toggleSection("Size")}>Size</h4>
            {expanded.Size && (
              <div className={styles.sizes}>
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`${styles.sizeBtn} ${
                      selectedSize === size ? styles.sizeBtnSelected : ""
                    }`}
                    onClick={() =>
                      setSelectedSize(selectedSize === size ? null : size)
                    }
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Dress Style */}
          <div className={styles.divider} />
          <div className={styles.filterSection}>
            <h4 onClick={() => toggleSection("Dress Style")}>Dress Style</h4>
            {expanded["Dress Style"] && (
              <ul className={styles.categoryList}>
                {dressStyles.map((style) => (
                  <li
                    key={style}
                    className={`${styles.categoryItem} ${
                      selectedDressStyle === style
                        ? styles.dressStyleSelected
                        : ""
                    }`}
                    onClick={() =>
                      setSelectedDressStyle(
                        selectedDressStyle === style ? null : style
                      )
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <span>{style}</span>
                    <FaChevronRight className={styles.arrow} />
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            className={styles.applyBtnRounded}
            onClick={handleApplyFilter}
          >
            Apply Filter
          </button>
        </>
      )}
    </aside>
  );
}
