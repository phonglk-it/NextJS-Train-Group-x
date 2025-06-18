"use client";
import Image from "next/image";
import { useState } from "react";
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
            <a href="#" className={styles.announcementBarLink}>
              Sign Up Now
            </a>
          </span>
          <span
            onClick={() => setShowAnnouncement(false)}
            className={styles.closeButton}
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
          <Image
            src="/images/Logo-header.png"
            alt="SHOP.CO"
            width={120}
            height={30}
          />
          <ul className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ""}`}>
            <li>
              <a href="#" className={styles.menuLinkBold}>
                Shop &#9662;
              </a>
            </li>
            <li>
              <a href="#" className={styles.menuLink}>
                On Sale
              </a>
            </li>
            <li>
              <a href="#" className={styles.menuLink}>
                New Arrivals
              </a>
            </li>
            <li>
              <a href="#" className={styles.menuLink}>
                Brands
              </a>
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
          <Image
            src="/images/Cart.png"
            alt="Cart"
            width={24}
            height={24}
            className={styles.icon}
          />
          <Image
            src="/images/User.png"
            alt="User"
            width={24}
            height={24}
            className={styles.icon}
          />
        </div>
      </nav>
    </>
  );
}
