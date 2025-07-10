"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./header.module.css";
import { useRouter, usePathname } from "next/navigation";
import LoginModal from "@/components/login/login";
import RegisterModal from "../register/register";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  const switchToRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const switchToLogin = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
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
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        switchToRegister={switchToRegister}
      />

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        switchToLogin={switchToLogin}
      />
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
              {pathname === "/" ? (
                <a
                  className={styles.menuLink}
                  href="#top-selling-section"
                  onClick={() => {
                    scrollToSection("top-selling-section");
                    setIsMenuOpen(false);
                  }}
                >
                  On Sale
                </a>
              ) : (
                <a
                  className={styles.menuLink}
                  href="/?scroll=top-selling-section"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/?scroll=top-selling-section");
                    setIsMenuOpen(false);
                  }}
                >
                  On Sale
                </a>
              )}
            </li>
            <li>
              {pathname === "/" ? (
                <a
                  className={styles.menuLink}
                  href="#new-arrivals-section"
                  onClick={() => {
                    scrollToSection("new-arrivals-section");
                    setIsMenuOpen(false);
                  }}
                >
                  New Arrivals
                </a>
              ) : (
                <a
                  className={styles.menuLink}
                  href="/?scroll=new-arrivals-section"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/?scroll=new-arrivals-section");
                    setIsMenuOpen(false);
                  }}
                >
                  New Arrivals
                </a>
              )}
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
          
          {isAuthenticated ? (
            <div className={styles.userMenuContainer} ref={userMenuRef}>
              <Image
                src="/images/User.png"
                alt="User"
                width={24}
                height={24}
                className={styles.icon}
                onClick={toggleUserMenu}
                style={{ cursor: "pointer" }}
              />
              {showUserMenu && (
                <div className={styles.userMenu}>
                  <div className={styles.userInfo}>
                    <p className={styles.userEmail}>{user?.email}</p>
                    <p className={styles.userName}>{user?.first_name} {user?.last_name}</p>
                  </div>
                  <button className={styles.logoutButton} onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Image
              src="/images/User.png"
              alt="User"
              width={24}
              height={24}
              className={styles.icon}
              onClick={() => setShowLoginModal(true)}
              style={{ cursor: "pointer" }}
            />
          )}
        </div>
      </nav>
    </>
  );
}
