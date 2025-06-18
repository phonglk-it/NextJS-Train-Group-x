"use client";
import Link from "next/link";
import { useState } from "react";
import Style from "../components/Style/style";
import CustomersPage from "../components/Customers/page";
import StylePage from "../components/Style/page";
import Customers from "@/components/Customers/customers";

export default function Home() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  return (
    <main>
      <h1>Home Page</h1>
      <ul>
        <li>About</li>
        <li>Contact</li>
        <li>Blog</li>
      </ul>
      <Style />
      <Customers />
    </main>
  );
}
