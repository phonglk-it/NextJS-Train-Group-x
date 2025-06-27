import React from "react";
import { Product } from "../../types/Product";
import ProductCard from "./ProductCard";
import styles from "../Style/productSection.module.css";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface ProductSectionProps {
  title: string;
  products: Product[];
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, products }) => {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className={styles.productSection}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {isMobile ? (
        <Swiper
          slidesPerView={2}
          spaceBetween={16}
          style={{ paddingBottom: 16 }}
        >
          {products.map((product, index) => (
            <SwiperSlide key={index}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className={styles.productGrid}>
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      )}
      <div className={styles.viewAllWrapper}>
        <Link href="/casual">
          <button className={styles.viewAll}>View All</button>
        </Link>
      </div>
    </section>
  );
};

export default ProductSection;
