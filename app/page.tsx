import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.container}>
      <section className="main-banner mB100">
        <h2 className="skip-tag">메인배너</h2>
        <div className="main-slider"></div>
      </section>

      <section className="main-gallery mB100">
        <h2 className="main-title text-center">갤러리</h2>
        <div className="gallery-slider">
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </section>

      <section className="main-notice container mB100">
        <div className="notice-box">
          <h2 className="main-title">공지사항</h2>
          <div className="content-box"></div>
        </div>
        <div className="booking-box">
          <h2 className="main-title">예약 바로가기</h2>
          <div className="content-box"></div>
        </div>
      </section>

      <section className="main-contact container">
        <div className="contact-box">
          <h2 className="main-title">고객센터</h2>
          <div className="content-box"></div>
        </div>
        <div className="location-box">
          <h2 className="main-title">오시는 길</h2>
          <div className="content-box"></div>
        </div>
      </section>
    </main>
  );
}
