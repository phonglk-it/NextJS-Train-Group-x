"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import styles from "./header.module.css";


export default function Header() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <>
      {showAnnouncement && (
        <div className={styles.announcementBar}>
          <span>
            Sign up and get 20% off to your first order:{" "}
            <Link href="/login" className={styles.announcementBarLink}>
              Sign Up Now
            </Link>
          </span>
          <span
            onClick={() => setShowAnnouncement(false)}
            className={styles.announcementBarClose}
            aria-label="Close announcement bar"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ")
                setShowAnnouncement(false);
            }}
          >
            &#10005;
          </span>
        </div>
      )}
      <nav className={styles.navbar}>
        <div className={styles.navLeft}>
          <button className={styles.hamburgerMenu} onClick={toggleMenu}>
            <Image
              src="/images/hamburger-menu.png"
              alt="Menu"
              width={24}
              height={24}
            />
          </button>
          <Link href="/">
            <Image
              src="/images/Logo-header.png"
              alt="SHOP.CO"
              width={120}
              height={30}
            />
          </Link>
          <ul className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ""}`}>
            <li>
              <Link href="/" className={styles.menuLinkBold}>
                Shop &#9662;
              </Link>
            </li>
            <li>
              <Link href="/on-sale" className={styles.menuLink}>
                On Sale
              </Link>
            </li>
            <li>
              <Link href="/new-arrivals" className={styles.menuLink}>
                New Arrivals
              </Link>
            </li>
            <li>
              <Link href="/brands" className={styles.menuLink}>
                Brands
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.searchAndIcons}>
          <button className={styles.searchButton} onClick={toggleSearch}>
            <Image
              src="/images/Search-responsive.png"
              alt="Search"
              width={24}
              height={24}
            />
          </button>
          <div
            className={`${styles.searchBox} ${
              isSearchOpen ? styles.searchBoxOpen : ""
            }`}
          >
            <Image
              src="/images/Search.png"
              alt="Search"
              width={20}
              height={20}
              className={styles.searchIcon}
            />
            <input
              type="text"
              placeholder="Search for products..."
              className={styles.searchInput}
              suppressHydrationWarning
            />
          </div>

          <Link href="/cart">
            <Image
              src="/images/Cart.png"
              alt="Cart"
              width={24}
              height={24}
              className={styles.icon}
            />
          </Link>
          <Link href="/login">
            <Image
              src="/images/User.png"
              alt="User"
              width={24}
              height={24}
              className={styles.icon}
            />
          </Link>
        </div>
      </nav>
    </>
  );
}
