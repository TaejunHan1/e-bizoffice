import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import Script from "next/script";
import "./globals.css";

// Next.js의 기본 폰트인 Inter 사용
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "E-biz 이비즈 공유오피스",
  description: "강남에서 가장 저렴한 공유오피스 입니다. 강남구 논현동 사업자 등록 가능 주소지 및 공유 사무실",
  keywords: "공유오피스, 강남 사무실, 비상주사무실, 사업자등록, 강남구, 논현동, 가상오피스",
  authors: [{ name: "E-Biz Office" }],
  creator: "E-Biz Office",
  publisher: "E-Biz Office",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://e-bizoffice.com",
    title: "E-biz 이비즈 공유오피스",
    description: "강남에서 가장 저렴한 공유오피스입니다. 강남구 논현동 사업자 등록 가능 주소지 및 공유 사무실",
    siteName: "E-biz 이비즈 공유오피스",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={inter.variable}>
      <head>
        {/* Mirae Talk Script MemberInfo Start */}
        <Script id="mirae-memberinfo" strategy="beforeInteractive">
          {`
            var mi_uk = {
              uk: '',      // 로그인 id
              un: '',      // 로그인 사용자 이름
              ue: '',      // 로그인 사용자 email
              up: ''       // 로그인 사용자 연락처 
            };
          `}
        </Script>
        {/* Mirae Talk Script MemberInfo End */}
        
        {/* 기본적으로 frameset, iframe 구조시 미톡 미실행 */}
        {/* 미실행 되는 영역에서 실행을 원할경우 아래코드 추가 설치 mi_is_chat 값을 true로 변경 기본 false */}
        <Script id="mirae-chat-config" strategy="beforeInteractive">
          {`var mi_is_chat = false;`}
        </Script>
      </head>
      <body className="antialiased min-h-screen">
        {children}
        
        {/* Mirae Talk Script Ver 2.0 */}
        <Script
          src="//log1.toup.net/mirae_log_chat_common.js?adkey=sprfm"
          strategy="afterInteractive"
          async
        />
        {/* Mirae Talk Script END Ver 2.0 */}
      </body>
    </html>
  );
}