"use client";
import Image from "next/image";
import styles from "./product.module.css";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as faSolidStar,
  faStarHalf,
} from "@fortawesome/free-solid-svg-icons";
import localFont from "next/font/local";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const reviews = [
  {
    name: "Samantha D.",
    date: "August 14, 2023",
    rating: 4.5,
    text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
    highlight: true,
  },
  {
    name: "Alex M.",
    date: "August 15, 2023",
    rating: 5,
    text: "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
  },
  {
    name: "Ethan R.",
    date: "August 16, 2023",
    rating: 3.5,
    text: "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
  },
  {
    name: "Olivia P.",
    date: "August 17, 2023",
    rating: 4,
    text: "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
  },
  {
    name: "Liam K.",
    date: "August 18, 2023",
    rating: 4,
    text: "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
  },
  {
    name: "Ava H.",
    date: "August 19, 2023",
    rating: 4.5,
    text: "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
  },
  {
    name: "John D.",
    date: "August 20, 2023",
    rating: 5,
    text: "This t-shirt is amazing! The quality is top-notch and the design is unique. I've received so many compliments on it.",
  },
  {
    name: "Emma S.",
    date: "August 21, 2023",
    rating: 4,
    text: "I love the fit and style of this t-shirt. It's comfortable and looks great with everything.",
  },
  {
    name: "Michael B.",
    date: "August 22, 2023",
    rating: 4.5,
    text: "This t-shirt is perfect for casual outings. The material is soft and the design is eye-catching.",
  },
  {
    name: "Sophia L.",
    date: "August 23, 2023",
    rating: 3.5,
    text: "I bought this t-shirt for my brother, and he loves it! The fit is great and the colors are vibrant.",
  },
];

const suggestions = [
  {
    name: "Polo with Contrast Trims",
    img: "/images/Polo-with-Contrast-Trims.png",
    price: 212,
    oldPrice: 242,
    discount: "-20%",
    rating: 4,
    ratingText: "4.0/5",
  },
  {
    name: "Gradient Graphic T-shirt",
    img: "/images/Gradient-Graphic-T-shirt.png",
    price: 145,
    rating: 3.5,
    ratingText: "3.5/5",
  },
  {
    name: "Polo with Tipping Details",
    img: "/images/Polo-with-Tipping-Details.png",
    price: 180,
    rating: 4.5,
    ratingText: "4.5/5",
  },
  {
    name: "Black Striped T-shirt",
    img: "/images/Black-Striped-T-shirt.png",
    price: 120,
    oldPrice: 160,
    discount: "-30%",
    rating: 5,
    ratingText: "5.0/5",
  },
];

const galleryImages = [
  {
    thumb: "/images/Sub__t-shirt-1.png",
    main: "/images/Main__T-shirt.png",
    alt: "T-shirt 1",
  },
  {
    thumb: "/images/Sub__t-shirt-2.png",
    main: "/images/Sub__t-shirt-2.png",
    alt: "T-shirt 2",
  },
  {
    thumb: "/images/Sub__t-shirt-3.png",
    main: "/images/Sub__t-shirt-3.png",
    alt: "T-shirt 3",
  },
];

const colorOptions = [
  { color: "#4F4631" },
  { color: "#314F4A" },
  { color: "#31344F" },
];

const sizeOptions = ["Small", "Medium", "Large", "X-Large"];

export default function ProductPage() {
  const [tab, setTab] = useState("reviews");
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(2);
  const [quantity, setQuantity] = useState(1);
  const [loadMore, setLoadMore] = useState(6);
  const [sortType, setSortType] = useState("Latest");
  const [showFilter, setShowFilter] = useState(false);
  const [filterName, setFilterName] = useState<string>("");
  const [filterDate, setFilterDate] = useState<string>("");
  const [filterStar, setFilterStar] = useState<string>("");
  const filterRef = useRef<HTMLDivElement>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    date: "",
    desc: "",
    rating: 0,
  });
  const [reviewsState, setReviewsState] = useState(reviews);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [hoverHalf, setHoverHalf] = useState<boolean>(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileLoadMore, setMobileLoadMore] = useState(3);

  const reviewNames = Array.from(new Set(reviews.map((r) => r.name)));

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setShowFilter(false);
      }
    }
    if (showFilter) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilter]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) setMobileLoadMore(3);
  }, [isMobile]);

  const loadMoreReviews = () => {
    setLoadMore((prev) => prev + 2);
  };

  const getSortedReviews = () => {
    let reviewsCopy = [...reviewsState];
    if (filterName) {
      reviewsCopy = reviewsCopy.filter((r) => r.name === filterName);
    }
    if (filterDate) {
      reviewsCopy = reviewsCopy.filter((r) => r.date === filterDate);
    }
    if (filterStar) {
      reviewsCopy = reviewsCopy.filter(
        (r) => Math.floor(r.rating).toString() === filterStar
      );
    }
    switch (sortType) {
      case "Latest":
        return reviewsCopy.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      case "Oldest":
        return reviewsCopy.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      case "Highest Rating":
        return reviewsCopy.sort((a, b) => b.rating - a.rating);
      case "Lowest Rating":
        return reviewsCopy.sort((a, b) => a.rating - b.rating);
      default:
        return reviewsCopy;
    }
  };

  const handleApplyFilter = () => {
    setShowFilter(false);
  };
  const handleClearFilter = () => {
    setFilterName("");
    setFilterDate("");
    setFilterStar("");
    setShowFilter(false);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 === 0.5;
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <FontAwesomeIcon
            key={i}
            icon={faSolidStar}
            style={{ color: "#FFD600", fontSize: 20, marginRight: 2 }}
          />
        );
      } else if (i === fullStars + 1 && hasHalf) {
        stars.push(
          <FontAwesomeIcon
            key={i}
            icon={faStarHalf}
            style={{ color: "#FFD600", fontSize: 20, marginRight: 2 }}
          />
        );
      } else {
        stars.push(
          <span
            key={i}
            style={{ display: "inline-block", width: 20, height: 20 }}
          ></span>
        );
      }
    }
    return stars;
  };

  const handleOpenReviewModal = () => setShowReviewModal(true);
  const handleCloseReviewModal = () => setShowReviewModal(false);
  const handleReviewFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setReviewForm({ ...reviewForm, [e.target.name]: e.target.value });
  };
  const handleReviewFormRating = (rating: number) => {
    setReviewForm({ ...reviewForm, rating });
  };
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewsState([
      {
        name: reviewForm.name,
        date: reviewForm.date,
        text: reviewForm.desc,
        rating: reviewForm.rating,
        highlight: false,
      },
      ...reviewsState,
    ]);
    setShowReviewModal(false);
    setReviewForm({ name: "", date: "", desc: "", rating: 0 });
  };

  const handleStarMouseMove = (
    e: React.MouseEvent<HTMLSpanElement>,
    star: number
  ) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    if (x < width / 2) {
      setHoverRating(star - 0.5);
      setHoverHalf(true);
    } else {
      setHoverRating(star);
      setHoverHalf(false);
    }
  };

  const handleMobileLoadMore = () => {
    setMobileLoadMore((prev) => prev + 3);
  };

  const tabContent = () => {
    switch (tab) {
      case "details":
        return (
          <div className={styles.tabContent}>
            <h2>Product Details</h2>
            <p>This is the product details content.</p>
          </div>
        );
      case "reviews":
        return (
          <div className={styles.tabContent}>
            <div className={styles.reviewsHeaderRow}>
              <div className={styles.allReviewsTitle}>
                All Reviews <span className={styles.reviewCount}>(451)</span>
              </div>
              <div className={styles.reviewsActions}>
                <div>
                  <button
                    className={styles.reviewFilterIcon}
                    onClick={() => setShowFilter((v) => !v)}
                  >
                    <img
                      src="/images/Icon-filter.png"
                      alt="Filter"
                      width={20}
                      height={20}
                    />
                  </button>
                  {showFilter && (
                    <div className={styles.filterModalOverlay}>
                      <div className={styles.filterModalBox}>
                        <button
                          className={styles.filterModalClose}
                          onClick={() => setShowFilter(false)}
                          aria-label="Close filter"
                        >
                          &times;
                        </button>
                        <div className={styles.filterModalTitle}>
                          Search filters
                        </div>
                        <div className={styles.filterModalGrid}>
                          <div>
                            <div className={styles.filterModalLabel}>NAME</div>
                            <select
                              value={filterName}
                              onChange={(e) => setFilterName(e.target.value)}
                              className={styles.filterModalSelect}
                            >
                              <option value="">All</option>
                              {reviewNames.map((name) => (
                                <option key={name} value={name}>
                                  {name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <div className={styles.filterModalLabel}>DATE</div>
                            <input
                              type="date"
                              value={filterDate}
                              onChange={(e) => setFilterDate(e.target.value)}
                              className={styles.filterModalSelect}
                            />
                          </div>
                          <div>
                            <div className={styles.filterModalLabel}>STARS</div>
                            <select
                              value={filterStar}
                              onChange={(e) => setFilterStar(e.target.value)}
                              className={styles.filterModalSelect}
                            >
                              <option value="">All</option>
                              {[5, 4, 3, 2, 1].map((star) => (
                                <option key={star} value={star}>
                                  {star} stars
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className={styles.filterModalActions}>
                          <button
                            onClick={handleApplyFilter}
                            className={styles.filterApplyBtn}
                          >
                            Filter
                          </button>
                          <button
                            onClick={handleClearFilter}
                            className={styles.filterClearBtn}
                          >
                            Clear
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className={styles.sortDropdownContainer}>
                  <button
                    className={styles.sortDropdownBtn}
                    onClick={() => setShowSortDropdown((v) => !v)}
                    type="button"
                  >
                    {sortType}
                    <img
                      src="/images/shorted-review.png"
                      alt="Sort"
                      className={styles.sortDropdownIcon}
                    />
                  </button>
                  {showSortDropdown && (
                    <div className={styles.sortDropdownMenu}>
                      {[
                        "Latest",
                        "Oldest",
                        "Highest Rating",
                        "Lowest Rating",
                      ].map((option) => (
                        <div
                          key={option}
                          className={
                            sortType === option
                              ? `${styles.sortDropdownOption} ${styles.sortDropdownOptionSelected}`
                              : styles.sortDropdownOption
                          }
                          onClick={() => {
                            setSortType(option);
                            setShowSortDropdown(false);
                          }}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  className={styles.writeReviewBtn}
                  onClick={handleOpenReviewModal}
                >
                  Write a Review
                </button>
              </div>
            </div>
            <div className={styles.reviewsGrid}>
              {(isMobile
                ? getSortedReviews().slice(0, mobileLoadMore)
                : getSortedReviews().slice(0, loadMore)
              ).map((r, i) => (
                <div
                  key={i}
                  className={`${styles.reviewCard} ${
                    r.highlight ? styles.highlight : ""
                  }`}
                >
                  <div className={styles.reviewStars}>
                    {renderStars(r.rating)}
                  </div>
                  <div className={styles.reviewNameRow}>
                    <span className={styles.reviewName}>{r.name}</span>
                    <img
                      src="/images/review-check.png"
                      alt="verified"
                      width={24}
                      height={24}
                      className={styles.verifiedIcon}
                      style={{ marginLeft: 4 }}
                    />
                  </div>
                  <div className={styles.reviewText}>{r.text}</div>
                  <div className={styles.reviewDate}>Posted on {r.date}</div>
                  {!isMobile && (
                    <button className={styles.reviewMenuBtn}>⋯</button>
                  )}
                </div>
              ))}
            </div>
            {isMobile
              ? getSortedReviews().length > mobileLoadMore && (
                  <button
                    className={styles.loadMoreBtn}
                    onClick={handleMobileLoadMore}
                  >
                    Load More Reviews
                  </button>
                )
              : getSortedReviews().length > loadMore && (
                  <button
                    className={styles.loadMoreBtn}
                    onClick={loadMoreReviews}
                  >
                    Load More Reviews
                  </button>
                )}
          </div>
        );
      case "faqs":
        return (
          <div className={styles.tabContent}>
            <h2>FAQs</h2>
            <p>This is the FAQs content.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.productDetailContainer}>
      <div className={styles.breadcrumb}>
        <span>Home</span> &gt; <span>Shop</span> &gt; <span>Men</span> &gt;{" "}
        <span className={styles.active}>T-shirts</span>
      </div>

      <div className={styles.productContent}>
        <div className={styles.gallery}>
          <div className={styles.thumbnails}>
            {galleryImages.map((img) => (
              <div
                key={img.thumb}
                className={`${styles.thumbnail} ${
                  selectedImg ===
                  galleryImages.findIndex((g) => g.thumb === img.thumb)
                    ? styles.active
                    : ""
                }`}
                onClick={() =>
                  setSelectedImg(
                    galleryImages.findIndex((g) => g.thumb === img.thumb)
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <Image src={img.thumb} alt={img.alt} width={152} height={168} />
              </div>
            ))}
          </div>
          <div className={styles.mainImage}>
            <Image
              src={galleryImages[selectedImg].main}
              alt={galleryImages[selectedImg].alt}
              width={350}
              height={550}
            />
          </div>
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>ONE LIFE GRAPHIC T&#8722;SHIRT</h1>
          <div className={styles.rating}>
            <div className={styles.reviewStars} style={{ marginBottom: 0 }}>
              {renderStars(4.5)}
            </div>
            <span className={styles.score}>
              <span style={{ fontWeight: 700 }}>4.5</span>
              <span className={styles.scoreLight}>/5</span>
            </span>
          </div>
          <div className={styles.priceRow}>
            <span className={styles.price}>$260</span>
            <span className={styles.oldPrice}>$300</span>
            <span className={styles.discount}>-40%</span>
          </div>
          <p className={styles.description}>
            This graphic t-shirt which is perfect for any occasion. Crafted from
            a soft and breathable fabric, it offers superior comfort and style.
          </p>
          <hr className={styles.divider} />
          <div className={styles.colors}>
            <span>Select Colors</span>
            <div className={styles.colorOptions}>
              {colorOptions.map((c, idx) => (
                <button
                  key={c.color}
                  className={`${styles.color} ${
                    selectedColor === idx ? styles.selected : ""
                  }`}
                  style={{ background: c.color, position: "relative" }}
                  onClick={() => setSelectedColor(idx)}
                >
                  {selectedColor === idx && (
                    <Image
                      src="/images/Icon-check.png"
                      alt="Selected"
                      width={20}
                      height={20}
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        pointerEvents: "none",
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
          <hr className={styles.divider} />
          <div className={styles.sizes}>
            <span>Choose Size</span>
            <div className={styles.sizeOptions}>
              {sizeOptions.map((size, idx) => (
                <button
                  key={size}
                  className={`${styles.size} ${
                    selectedSize === idx ? styles.selected : ""
                  }`}
                  onClick={() => setSelectedSize(idx)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.addToCartRow}>
            <div className={styles.quantity}>
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>
            <button className={styles.addToCart}>Add to Cart</button>
          </div>
        </div>
      </div>

      <div className={styles.tabsRow}>
        <button
          className={`${styles.tab} ${
            tab === "details" ? styles.activeTab : ""
          }`}
          onClick={() => setTab("details")}
        >
          Product Details
        </button>
        <button
          className={`${styles.tab} ${
            tab === "reviews" ? styles.activeTab : ""
          }`}
          onClick={() => setTab("reviews")}
        >
          Rating & Reviews
        </button>
        <button
          className={`${styles.tab} ${tab === "faqs" ? styles.activeTab : ""}`}
          onClick={() => setTab("faqs")}
        >
          FAQs
        </button>
      </div>

      {tabContent()}

      <div className={styles.suggestSection}>
        <h2 className={styles.suggestTitle}>YOU MIGHT ALSO LIKE</h2>
        {isMobile ? (
          <Swiper
            spaceBetween={16}
            slidesPerView={2}
            style={{ paddingBottom: 8 }}
          >
            {suggestions.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className={styles.suggestCard}>
                  <div className={styles.suggestImgWrap}>
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={180}
                      height={180}
                    />
                  </div>
                  <div className={styles.suggestName}>{item.name}</div>
                  <div className={styles.suggestRating}>
                    <div
                      className={styles.reviewStars}
                      style={{ marginBottom: 0 }}
                    >
                      {renderStars(item.rating)}
                    </div>
                    <span className={styles.suggestRatingText}>
                      <span style={{ fontWeight: 400 }}>
                        {item.ratingText.split("/")[0]}
                      </span>
                      <span className={styles.scoreLight}>/5</span>
                    </span>
                  </div>
                  <div className={styles.suggestPriceRow}>
                    <span className={styles.suggestPrice}>${item.price}</span>
                    {item.oldPrice && (
                      <span className={styles.suggestOldPrice}>
                        ${item.oldPrice}
                      </span>
                    )}
                    {item.discount && (
                      <span className={styles.suggestDiscount}>
                        {item.discount}
                      </span>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className={styles.suggestGrid}>
            {suggestions.map((item, idx) => (
              <div key={idx} className={styles.suggestCard}>
                <div className={styles.suggestImgWrap}>
                  <Image
                    src={item.img}
                    alt={item.name}
                    width={180}
                    height={180}
                  />
                </div>
                <div className={styles.suggestName}>{item.name}</div>
                <div className={styles.suggestRating}>
                  <div
                    className={styles.reviewStars}
                    style={{ marginBottom: 0 }}
                  >
                    {renderStars(item.rating)}
                  </div>
                  <span className={styles.suggestRatingText}>
                    <span style={{ fontWeight: 400 }}>
                      {item.ratingText.split("/")[0]}
                    </span>
                    <span className={styles.scoreLight}>/5</span>
                  </span>
                </div>
                <div className={styles.suggestPriceRow}>
                  <span className={styles.suggestPrice}>${item.price}</span>
                  {item.oldPrice && (
                    <span className={styles.suggestOldPrice}>
                      ${item.oldPrice}
                    </span>
                  )}
                  {item.discount && (
                    <span className={styles.suggestDiscount}>
                      {item.discount}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showReviewModal && (
        <div className={styles.reviewSidebarOverlay}>
          <div className={styles.reviewSidebar}>
            <button
              className={styles.reviewSidebarClose}
              onClick={handleCloseReviewModal}
            >
              &times;
            </button>
            <h3>Write a Review</h3>
            <form onSubmit={handleSubmitReview} className={styles.reviewForm}>
              <label>Name:</label>
              <input
                name="name"
                value={reviewForm.name}
                onChange={handleReviewFormChange}
                required
              />
              <label>Date:</label>
              <input
                name="date"
                type="date"
                value={reviewForm.date}
                onChange={handleReviewFormChange}
                required
              />
              <label>Rating:</label>
              <div className={styles.reviewFormStars}>
                {[1, 2, 3, 4, 5].map((star) => {
                  let displayRating =
                    hoverRating !== null ? hoverRating : reviewForm.rating;
                  let icon = null;
                  if (displayRating >= star) {
                    icon = (
                      <FontAwesomeIcon
                        icon={faSolidStar}
                        style={{
                          color: "#FFD600",
                          fontSize: 24,
                          cursor: "pointer",
                          marginRight: 2,
                        }}
                      />
                    );
                  } else if (displayRating === star - 0.5) {
                    icon = (
                      <FontAwesomeIcon
                        icon={faStarHalf}
                        style={{
                          color: "#FFD600",
                          fontSize: 24,
                          cursor: "pointer",
                          marginRight: 2,
                        }}
                      />
                    );
                  } else {
                    icon = (
                      <span
                        style={{
                          color: "#FFD600",
                          fontSize: 24,
                          cursor: "pointer",
                          marginRight: 2,
                        }}
                      >
                        ☆
                      </span>
                    );
                  }
                  return (
                    <span
                      key={star}
                      style={{
                        display: "inline-block",
                        position: "relative",
                        width: 24,
                      }}
                      onClick={(e) => {
                        const { left, width } =
                          e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - left;
                        if (x < width / 2) {
                          handleReviewFormRating(star - 0.5);
                        } else {
                          handleReviewFormRating(star);
                        }
                      }}
                      onMouseMove={(e) => handleStarMouseMove(e, star)}
                      onMouseLeave={() => {
                        setHoverRating(null);
                        setHoverHalf(false);
                      }}
                      title={`Chọn ${star - 0.5} hoặc ${star} sao`}
                    >
                      {icon}
                    </span>
                  );
                })}
              </div>
              <label>Review content:</label>
              <textarea
                name="desc"
                value={reviewForm.desc}
                onChange={handleReviewFormChange}
                required
              />
              <div className={styles.reviewFormActions}>
                <button type="submit" className={styles.filterApplyBtn}>
                  Submit
                </button>
                <button
                  type="button"
                  className={styles.filterClearBtn}
                  onClick={handleCloseReviewModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
