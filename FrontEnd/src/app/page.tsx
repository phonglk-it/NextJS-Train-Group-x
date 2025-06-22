"use client";
import Link from "next/link";
import { useState } from "react";
import CustomersPage from "../components/Customers/page";
import StylePage from "../components/Style/page";
import Header from "../components/Header/header";
import Footer from "../components/Footer/footer";
import HomePage from "./(main)/homepage/page";
import ProductsCart from "@/components/ProductCart/ProductCart";

export default function Home() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  return (
    <main>
      <Header />
      <HomePage />
      <ProductsCart />
      <CustomersPage />
      <StylePage />

      <Footer />
    </main>
  );
}
