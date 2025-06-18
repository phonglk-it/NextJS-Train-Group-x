"use client";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  return (
    <>
      {/* Announcement Bar */}
      {showAnnouncement && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 1000,
            background: "#000",
            color: "#fff",
            textAlign: "center",
            padding: "6px 0",
            fontSize: 14,
          }}
        >
          <span>
            Sign up and get 20% off to your first order.{" "}
            <a href="#" style={{ color: "#fff", textDecoration: "underline" }}>
              Sign Up Now
            </a>
          </span>
          <span
            style={{
              position: "absolute",
              right: 16,
              top: 0,
              cursor: "pointer",
              fontSize: 18,
              lineHeight: "28px",
            }}
            onClick={() => setShowAnnouncement(false)}
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
      {showAnnouncement && <div style={{ height: 24 }} />}
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 100px",
          background: "#fff",
        }}
      >
        {/* Logo */}
        <div style={{ fontWeight: "bold", fontSize: 28, letterSpacing: 2 }}>
          SHOP.CO
        </div>
        {/* Menu */}
        <ul
          style={{
            display: "flex",
            gap: 24,
            listStyle: "none",
            margin: 0,
            padding: 0,
            alignItems: "center",
          }}
        >
          <li>
            <Link href="#" style={{ textDecoration: "none", color: "inherit" }}>
              Shop &#9662;
            </Link>
          </li>
          <li>
            <Link href="#" style={{ textDecoration: "none", color: "inherit" }}>
              On Sale
            </Link>
          </li>
          <li>
            <Link href="#" style={{ textDecoration: "none", color: "inherit" }}>
              New Arrivals
            </Link>
          </li>
          <li>
            <Link href="#" style={{ textDecoration: "none", color: "inherit" }}>
              Brands
            </Link>
          </li>
        </ul>
        {/* Search + Icons */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ position: "relative", width: 450 }}>
            <img
              src="/search.svg"
              alt="Search"
              style={{
                position: "absolute",
                left: 16,
                top: "50%",
                transform: "translateY(-50%)",
                width: 20,
                height: 20,
                pointerEvents: "none",
                opacity: 0.7,
              }}
            />
            <input
              type="text"
              placeholder="Search for products..."
              style={{
                padding: "8px 16px 8px 44px",
                borderRadius: 20,
                border: "none",
                background: "#f2f2f2",
                width: "100%",
              }}
            />
          </div>
          <span style={{ fontSize: 20, cursor: "pointer" }}>🛒</span>
          <span style={{ fontSize: 20, cursor: "pointer" }}>👤</span>
        </div>
      </nav>
      {/* Hero Section */}
      <section
        style={{
          background: "#f0f0f0",
          padding: "48px 0 0 0",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: 480,
          position: "relative",
        }}
      >
        {/* Bên trái: Text */}
        <div style={{ flex: 1, paddingLeft: 64 }}>
          <h1
            style={{
              fontSize: 56,
              fontWeight: 800,
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: -2,
            }}
          >
            FIND CLOTHES
            <br />
            THAT MATCHES
            <br />
            YOUR STYLE
          </h1>
          <p
            style={{
              fontSize: 18,
              color: "#444",
              margin: "24px 0 32px 0",
              maxWidth: 480,
            }}
          >
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <button
            style={{
              background: "#000",
              color: "#fff",
              border: "none",
              borderRadius: 24,
              padding: "16px 36px",
              fontSize: 18,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Shop Now
          </button>
          {/* Thông tin bên dưới */}
          <div
            style={{
              display: "flex",
              gap: 48,
              marginTop: 48,
            }}
          >
            <div>
              <div style={{ fontWeight: 700, fontSize: 24 }}>200+</div>
              <div style={{ color: "#444" }}>International Brands</div>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 24 }}>2,000+</div>
              <div style={{ color: "#444" }}>High-Quality Products</div>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 24 }}>30,000+</div>
              <div style={{ color: "#444" }}>Happy Customers</div>
            </div>
          </div>
        </div>
        {/* Bên phải: Ảnh */}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            position: "relative",
          }}
        >
          <img
            src="/hero-models.png"
            alt="Models"
            style={{
              width: 380,
              height: "auto",
              objectFit: "cover",
              borderRadius: 16,
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            }}
          />
          {/* Các icon trang trí */}
          <span
            style={{
              position: "absolute",
              left: 40,
              top: 40,
              fontSize: 40,
            }}
          >
            ✦
          </span>
          <span
            style={{
              position: "absolute",
              right: 40,
              top: 80,
              fontSize: 40,
            }}
          >
            ✦
          </span>
          <span
            style={{
              position: "absolute",
              left: 120,
              bottom: 40,
              fontSize: 32,
            }}
          >
            ✦
          </span>
        </div>
      </section>
      {/* Brand Bar */}
      <div
        style={{
          background: "#000",
          color: "#fff",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "24px 0",
          fontSize: 32,
          fontWeight: 700,
          letterSpacing: 2,
        }}
      >
        <span>VERSACE</span>
        <span>ZARA</span>
        <span>GUCCI</span>
        <span>PRADA</span>
        <span>Calvin Klein</span>
      </div>
      {/* Footer Newsletter Banner */}
      <div
        style={{
          background: "#000",
          color: "#fff",
          borderRadius: 16,
          margin: "40px auto -100px auto",
          maxWidth: 1000,
          padding: "32px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 32,
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ fontWeight: 800, fontSize: 28, lineHeight: 1.2 }}>
          STAY UPTO DATE ABOUT
          <br />
          OUR LATEST OFFERS
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            flex: 1,
            maxWidth: 320,
          }}
        >
          <div style={{ width: "100%" }}>
            <div style={{ position: "relative", width: "100%" }}>
              <img
                src="/email.svg"
                alt="Email"
                style={{
                  position: "absolute",
                  left: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 20,
                  height: 20,
                  pointerEvents: "none",
                  opacity: 0.7,
                }}
              />
              <input
                key="newsletter-email"
                type="email"
                placeholder="Enter your email address"
                style={{
                  width: "100%",
                  padding: "12px 16px 12px 44px",
                  borderRadius: 20,
                  border: "none",
                  fontSize: 16,
                  boxSizing: "border-box",
                }}
              />
            </div>
            <button
              key="newsletter-btn"
              style={{
                background: "#fff",
                color: "#000",
                border: "none",
                borderRadius: 20,
                padding: "12px 0",
                fontWeight: 600,
                fontSize: 16,
                cursor: "pointer",
                width: "100%",
                marginTop: 12,
              }}
            >
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </div>
      {/* Footer Main */}
      <footer
        style={{
          background: "#f5f5f5",
          padding: "80px 0 0 0",
          marginTop: 40,
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 32,
            flexWrap: "wrap",
          }}
        >
          {/* Logo + Social */}
          <div style={{ flex: 1, minWidth: 180 }}>
            <div
              style={{
                fontWeight: "bold",
                fontSize: 28,
                letterSpacing: 2,
                marginBottom: 12,
              }}
            >
              SHOP.CO
            </div>
            <div style={{ color: "#444", fontSize: 14, marginBottom: 16 }}>
              We have clothes that suits your style and which you're proud to
              wear. From women to men.
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <a href="#" style={{ color: "#222", fontSize: 20 }}>
                🌐
              </a>
              <a href="#" style={{ color: "#222", fontSize: 20 }}>
                🐦
              </a>
              <a href="#" style={{ color: "#222", fontSize: 20 }}>
                📸
              </a>
              <a href="#" style={{ color: "#222", fontSize: 20 }}>
                ▶️
              </a>
            </div>
          </div>
          {/* Footer Columns */}
          <div style={{ flex: 3, display: "flex", gap: 48, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 12 }}>COMPANY</div>
              <div style={{ color: "#444", fontSize: 15, marginBottom: 8 }}>
                About
              </div>
              <div style={{ color: "#444", fontSize: 15, marginBottom: 8 }}>
                Features
              </div>
              <div style={{ color: "#444", fontSize: 15, marginBottom: 8 }}>
                Works
              </div>
              <div style={{ color: "#444", fontSize: 15, marginBottom: 8 }}>
                Career
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 12 }}>HELP</div>
              <div style={{ color: "#444", fontSize: 15, marginBottom: 8 }}>
                Customer Support
              </div>
              <div style={{ color: "#444", fontSize: 15, marginBottom: 8 }}>
                Delivery Details
              </div>
              <div style={{ color: "#444", fontSize: 15, marginBottom: 8 }}>
                Terms & Conditions
              </div>
              <div style={{ color: "#444", fontSize: 15, marginBottom: 8 }}>
                Privacy Policy
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 12 }}>FAQ</div>
              <div style={{ color: "#444", fontSize: 15, marginBottom: 8 }}>
                Account
              </div>
              <div style={{ color: "#444", fontSize: 15, marginBottom: 8 }}>
                Manage Deliveries
              </div>
              <div style={{ color: "#444", fontSize: 15, marginBottom: 8 }}>
                Orders
              </div>
              <div style={{ color: "#444", fontSize: 15, marginBottom: 8 }}>
                Payments
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 12 }}>RESOURCES</div>
              <div style={{ color: "#444", fontSize: 15, marginBottom: 8 }}>
                Free eBooks
              </div>
              <div style={{ color: "#444", fontSize: 15, marginBottom: 8 }}>
                Development Tutorial
              </div>
              <div style={{ color: "#444", fontSize: 15, marginBottom: 8 }}>
                How to - Blog
              </div>
              <div style={{ color: "#444", fontSize: 15, marginBottom: 8 }}>
                Youtube Playlist
              </div>
            </div>
          </div>
        </div>
        {/* Footer Bottom */}
        <div
          style={{
            maxWidth: 1100,
            margin: "32px auto 0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 0",
            borderTop: "1px solid #ddd",
            fontSize: 14,
            color: "#888",
          }}
        >
          <div>Shop.co © 2000-2025. All Rights Reserved</div>
          <div style={{ display: "flex", gap: 8 }}>
            <img src="/visa.png" alt="Visa" style={{ height: 24 }} />
            <img src="/paypal.png" alt="Paypal" style={{ height: 24 }} />
            <img
              src="/mastercard.png"
              alt="Mastercard"
              style={{ height: 24 }}
            />
            <img src="/applepay.png" alt="Apple Pay" style={{ height: 24 }} />
            <img src="/gpay.png" alt="Google Pay" style={{ height: 24 }} />
          </div>
        </div>
      </footer>
    </>
  );
}
