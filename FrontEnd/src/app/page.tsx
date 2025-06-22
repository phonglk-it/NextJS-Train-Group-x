"use client";
import Link from "next/link";
import { useState } from "react";
import CustomersPage from "../components/Customers/page";
import StylePage from "../components/Style/page";
import Header from "../components/Header/header";
import Footer from "../components/Footer/footer";
import HomePage from "./(main)/homepage/page";
import ProductSection from "@/components/Product/ProductSection";
import { newArrivals, topSelling } from "@/data/products-data";

export default function Home() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  return (
    <main>
      <Header />
      <HomePage />
      <ProductSection title="NEW ARRIVALS" products={newArrivals} />
      <ProductSection title="TOP SELLING" products={topSelling} />
      <StylePage />
      <CustomersPage />
      <Footer />
    </main>
  );
}
