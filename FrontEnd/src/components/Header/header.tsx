"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import styles from "./header.module.css";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // Scroll to section helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
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
            <li
              onMouseEnter={() => setShowMegaMenu(true)}
              onMouseLeave={() => setShowMegaMenu(false)}
              style={{ position: "relative" }}
            >
              <span
                className={styles.menuLinkBold}
                style={{ cursor: "pointer" }}
              >
                Shop &#9662;
              </span>
              {showMegaMenu && (
                <div
                  className={styles.megaMenu}
                  onMouseEnter={() => setShowMegaMenu(true)}
                  onMouseLeave={() => setShowMegaMenu(false)}
                >
                  <div className={styles.megaMenuGrid}>
                    <div>
                      <div className={styles.megaMenuTitle}>
                        SHOP BY CATEGORY
                      </div>
                      <Link href="/casual">Casual</Link>
                      <Link href="/formal">Formal</Link>
                      <Link href="/gym">Gym</Link>
                      <Link href="/party">Party</Link>
                    </div>
                  </div>
                  <button
                    className={styles.megaMenuClose}
                    onClick={() => setShowMegaMenu(false)}
                  >
                    &times;
                  </button>
                </div>
              )}
            </li>
            <li>
              <a
                className={styles.menuLink}
                href={pathname === "/" ? undefined : "/"}
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.preventDefault();
                  if (pathname === "/") {
                    scrollToSection("top-selling-section");
                  } else {
                    router.push("/?scroll=top-selling-section");
                  }
                  setIsMenuOpen(false);
                }}
              >
                On Sale
              </a>
            </li>
            <li>
              <a
                className={styles.menuLink}
                href={pathname === "/" ? undefined : "/"}
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.preventDefault();
                  if (pathname === "/") {
                    scrollToSection("new-arrivals-section");
                  } else {
                    router.push("/?scroll=new-arrivals-section");
                  }
                  setIsMenuOpen(false);
                }}
              >
                New Arrivals
              </a>
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

          <Link href="/Cart">
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
