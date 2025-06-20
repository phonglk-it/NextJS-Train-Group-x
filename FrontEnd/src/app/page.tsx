"use client";

import React from "react";
import ProductsPage from "../components/ProductsPage/page";


export default function Home() {
  const [showAnnouncement, setShowAnnouncement] = React.useState(true);

  return (
    <main>
      <ProductsPage />
    </main>
  );
}
