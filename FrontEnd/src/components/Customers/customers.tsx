"use client";
import React, { useEffect } from "react";
import styles from "./customers.module.css";
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css";

const Customers = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    AOS.refresh();
  }, []);

  return (
    <div className={clsx(styles.containerFluid, styles.body)}>
      <div className={styles.container}>
        <div data-aos="fade-up" className={styles.head}>
          <p className={styles.title}>OUR HAPPY CUSTOMERS</p>
          <div className={styles.navButtons}>
            <button className={styles.prevBtn}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button className={styles.nextBtn}>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>

        <Swiper
          className={styles.slide}
          data-aos="fade-up"
          modules={[Navigation]}
          navigation={{
            prevEl: `.${styles.prevBtn}`,
            nextEl: `.${styles.nextBtn}`,
          }}
          spaceBetween={30}
          loop={true}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {[
            {
              name: "Sarah M.",
              comment:
                "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
            },
            {
              name: "Alex K.",
              comment:
                "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
            },
            {
              name: "James L.",
              comment:
                "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
            },
            {
              name: "Sarah M.",
              comment:
                "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
            },
            {
              name: "Alex K.",
              comment:
                "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
            },
            {
              name: "James L.",
              comment:
                "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
            },
          ].map((customer, index) => {
            return (
              <SwiperSlide key={index}>
                <div className={styles.item}>
                  <img
                    className={styles.stars}
                    src="/images/Stars.png"
                    alt="Stars icon"
                  />
                  <div className={styles.customer}>
                    <p className={styles.customerName}>{customer.name}</p>
                    <img src="/images/Stick.png" alt="Stick icon" />
                  </div>
                  <p className={styles.comment}>{customer.comment}</p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default Customers;
