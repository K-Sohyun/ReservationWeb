"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Gnb.module.scss";
import { FiMenu, FiX } from "react-icons/fi";

const menuData = [
  { title: "펜션소개", link: "/" },
  { title: "주변관광지", link: "/" },
  { title: "예약안내", link: "/" },
  {
    title: "커뮤니티",
    link: "/community",
    sub: [
      { title: "공지사항", link: "/community/notice" },
      { title: "포토갤러리", link: "/community/gallery" },
    ],
  },
];

const Gnb = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [mobileSubOpen, setMobileSubOpen] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth > 1024);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileOpen((prev) => !prev);
    setMobileSubOpen(null);
  };

  const toggleMobileSub = (idx: number) => {
    setMobileSubOpen((prev) => (prev === idx ? null : idx));
  };

  return (
    <>
      <button
        className={styles.gnbToggleBtn}
        onClick={toggleMobileMenu}
        aria-label="메뉴 토글"
      >
        {isMobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <nav className={styles.gnb}>
        <ul className={`${styles.dep1Ul} ${isMobileOpen ? styles.open : ""}`}>
          {menuData.map((menu, idx) => {
            const isActive = isDesktop
              ? hovered === idx
              : mobileSubOpen === idx;

            return (
              <li
                key={idx}
                className={`${styles.dep1Li} ${isActive ? styles.on : ""}`}
                onMouseEnter={() => isDesktop && setHovered(idx)}
                onMouseLeave={() => isDesktop && setHovered(null)}
              >
                <Link
                  href={menu.link}
                  className={`${styles.dep1A} ${menu.sub ? styles.subYes : ""}`}
                  onClick={(e) => {
                    if (menu.sub && !isDesktop) {
                      e.preventDefault();
                      toggleMobileSub(idx);
                    }
                  }}
                >
                  {menu.title}
                </Link>

                {menu.sub && (
                  <ul
                    className={`${styles.dep2Ul} ${
                      isActive ? styles.subOpen : ""
                    }`}
                  >
                    {menu.sub.map((sub, subIdx) => (
                      <li key={subIdx} className={styles.dep2Li}>
                        <Link href={sub.link} className={styles.dep2A}>
                          {sub.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {!isDesktop && isMobileOpen && (
        <div
          className={`${styles.gnbDummy} ${styles.on}`}
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Gnb;
