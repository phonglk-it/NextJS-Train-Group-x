"use client";
import styles from "./footer.module.css";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [randomId] = useState(() => Math.random());

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
    } else if (!validateEmail(email)) {
      setError("Invalid email address.");
    } else {
      setError("");
      alert("Subscribed successfully!");
      setEmail("");
    }
  };

  return (
    <>
      <div className={styles.newsletterBanner}>
        <div className={styles.newsletterTitle}>
          STAY UPTO DATE ABOUT
          <br />
          OUR LATEST OFFERS
        </div>
        <div className={styles.newsletterForm}>
          <form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <div style={{ position: "relative", width: "100%" }}>
              <img
                src="/images/Email.png"
                alt="Email"
                className={styles.emailIcon}
              />
              <input
                key="newsletter-email"
                type="email"
                placeholder="Enter your email address"
                className={styles.emailInput}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                suppressHydrationWarning
              />
            </div>
            {error && (
              <div
                style={{
                  color: "red",
                  marginTop: 4,
                  marginBottom: 4,
                  fontSize: 14,
                }}
              >
                {error}
              </div>
            )}
            <button
              key="newsletter-btn"
              className={styles.subscribeButton}
              suppressHydrationWarning
              type="submit"
              id={randomId.toString()}
            >
              Subscribe to Newsletter
            </button>
          </form>
        </div>
      </div>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <img
              src="/images/Logo-footer.png"
              alt="SHOP.CO"
              style={{ height: 23, width: "auto", marginBottom: 16 }}
            />
            <div className={styles.footerDescription}>
              We have clothes that suits your style and which you're proud to
              wear. From women to men.
            </div>
            <div className={styles.socialLinks}>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/images/Social-twitter.png"
                  alt="Twitter"
                  className={styles.socialIcon}
                />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/images/Social-facebook.png"
                  alt="Facebook"
                  className={styles.socialIcon}
                />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/images/Social-instagram.png"
                  alt="Instagram"
                  className={styles.socialIcon}
                />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/images/Social-github.png"
                  alt="Github"
                  className={styles.socialIcon}
                />
              </a>
            </div>
          </div>
          <div className={styles.footerColumns}>
            <div>
              <div className={styles.columnTitle}>COMPANY</div>
              <div className={styles.columnLink}>About</div>
              <div className={styles.columnLink}>Features</div>
              <div className={styles.columnLink}>Works</div>
              <div className={styles.columnLink}>Career</div>
            </div>
            <div>
              <div className={styles.columnTitle}>HELP</div>
              <div className={styles.columnLink}>Customer Support</div>
              <div className={styles.columnLink}>Delivery Details</div>
              <div className={styles.columnLink}>Terms & Conditions</div>
              <div className={styles.columnLink}>Privacy Policy</div>
            </div>
            <div>
              <div className={styles.columnTitle}>FAQ</div>
              <div className={styles.columnLink}>Account</div>
              <div className={styles.columnLink}>Manage Deliveries</div>
              <div className={styles.columnLink}>Orders</div>
              <div className={styles.columnLink}>Payments</div>
            </div>
            <div>
              <div className={styles.columnTitle}>RESOURCES</div>
              <div className={styles.columnLink}>Free eBooks</div>
              <div className={styles.columnLink}>Development Tutorial</div>
              <div className={styles.columnLink}>How to - Blog</div>
              <div className={styles.columnLink}>Youtube Playlist</div>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <div>Shop.co © 2000-2025. All Rights Reserved</div>
          <div className={styles.paymentMethods}>
            <div>
              <img
                src="/images/Method__payment-visa.png"
                alt="Visa"
                className={styles.paymentIcon}
              />
            </div>
            <div>
              <img
                src="/images/Method__payment-mastercard.png"
                alt="Mastercard"
                className={styles.paymentIcon}
              />
            </div>
            <div>
              <img
                src="/images/Method__payment-paypal.png"
                alt="Paypal"
                className={styles.paymentIcon}
              />
            </div>
            <div>
              <img
                src="/images/Method__payment-apple-pay.png"
                alt="Apple Pay"
                className={styles.paymentIcon}
              />
            </div>
            <div>
              <img
                src="/images/Method__payment-google-pay.png"
                alt="Google Pay"
                className={styles.paymentIcon}
              />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
