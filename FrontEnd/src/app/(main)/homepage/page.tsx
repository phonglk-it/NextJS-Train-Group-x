"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "./homepage.module.css";
import ProductSection from "@/components/Product/ProductSection";
import { newArrivals, topSelling } from "@/data/products-data";
import { useSearchParams } from "next/navigation";
import Customers from "@/components/Customers/customers";
import Style from "@/components/Style/style";
import Link from "next/link";

interface CounterProps {
  target: string;
  duration: number;
}

const Counter = ({ target, duration }: CounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target.replace(/\D/g, ""));
    if (start === end) return;

    let current = start;
    const increment = end / (duration / 10);

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(current));
      }
    }, 10);

    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <span>
      {count.toLocaleString()}
      {target.includes("+") ? "+" : ""}
    </span>
  );
};

export default function Home() {
  const searchParams = useSearchParams();
  const [heroImgSrc, setHeroImgSrc] = useState("/images/homepage__image.jpg");

  useEffect(() => {
    const scroll = searchParams.get("scroll");
    if (scroll) {
      setTimeout(() => {
        const el = document.getElementById(scroll);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  }, [searchParams]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200) {
        setHeroImgSrc("/images/Background-hero.png");
      } else {
        setHeroImgSrc("/images/homepage__image.jpg");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.homepageContainer}>
      <section className={styles.heroSection}>
        <div className={styles.blingTopRight}>
          <Image src="/images/Bling.png" alt="Bling" width={104} height={104} />
        </div>
        <div className={styles.blingBottomLeft}>
          <Image src="/images/Bling.png" alt="Bling" width={56} height={56} />
        </div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className={styles.heroDescription}>
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <button
            className={styles.shopNowButton}
            onClick={() => {
              const el = document.getElementById("new-arrivals-section");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Shop Now
          </button>
          <div className={styles.statsContainer}>
            <div className={styles.statColumn}>
              <h3 className={styles.statNumber}>
                <Counter target="200+" duration={2000} />
              </h3>
              <p className={styles.statLabel}>International Brands</p>
            </div>
            <div className={styles.statColumn}>
              <h3 className={styles.statNumber}>
                <Counter target="2,000+" duration={2000} />
              </h3>
              <p className={styles.statLabel}>High-Quality Products</p>
            </div>
            <div className={styles.statColumn}>
              <h3 className={styles.statNumber}>
                <Counter target="30,000+" duration={2000} />
              </h3>
              <p className={styles.statLabel}>Happy Customers</p>
            </div>
          </div>
        </div>
        <div className={styles.heroImageContainer}>
          <Image
            src={heroImgSrc}
            alt="Hero Section"
            fill
            className={styles.heroImage}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          />
        </div>
      </section>

      <section className={styles.brandBar}>
        <div className={styles.brandLogoWrapper}>
          <Image
            src="/images/Logo__banner-versace.png"
            alt="Versace"
            width={120}
            height={30}
          />
        </div>
        <div className={styles.brandLogoWrapper}>
          <Image
            src="/images/Logo__banner-zara.png"
            alt="Zara"
            width={120}
            height={30}
          />
        </div>
        <div className={styles.brandLogoWrapper}>
          <Image
            src="/images/Logo__banner-gucci.png"
            alt="Gucci"
            width={120}
            height={30}
          />
        </div>
        <div className={styles.brandLogoWrapper}>
          <Image
            src="/images/Logo__banner-prada.png"
            alt="Prada"
            width={120}
            height={30}
          />
        </div>
        <div className={styles.brandLogoWrapper}>
          <Image
            src="/images/Logo__banner-calmklevin.png"
            alt="Calvin Klein"
            width={120}
            height={30}
          />
        </div>
      </section>
      <ProductSection
        title="NEW ARRIVALS"
        products={newArrivals}
        id="new-arrivals-section"
      />
      <ProductSection
        title="TOP SELLING"
        products={topSelling}
        id="top-selling-section"
      />
    </div>
  );
}
