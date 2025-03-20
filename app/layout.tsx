import type { Metadata } from "next";
import { Inter } from 'next/font/google';
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
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}