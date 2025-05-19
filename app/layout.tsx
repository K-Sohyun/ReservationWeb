import type { Metadata } from "next";
import Link from "next/link";
import Gnb from "@components/menu/Gnb";
import AuthStatus from "@components/AuthStatus";
import "@styles/variables.scss";
import "@styles/globals.scss";

export const metadata: Metadata = {
  title: "Reservation Web",
  description: "Create Reservation App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <header id="hd">
          <h1>
            <Link href="/">LOGO</Link>
          </h1>
          <Gnb />
        </header>
        {children}
        <footer id="ft" className="mT100">
          <strong className="logo">LOGO</strong>
          <p className="addr">제주특별자치도 서귀포시 서홍동 2472-3</p>
          <p className="compy">
            <span>
              <b>대표자명 : </b>홍길동
            </span>
            <span>
              <b>사업자등록증 : </b>000-00-00000
            </span>
            <span>
              <b>전화 : </b>010-0000-0000
            </span>
            <span>
              <b>계좌 : </b>우리 000-00-00000
            </span>
          </p>
          <p className="copy">
            Copyright
            <AuthStatus />
            2025 Reservation Web. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
