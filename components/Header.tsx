"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

export default function Header() {
  const pathname = usePathname();
  const [showServiceMenu, setShowServiceMenu] = useState(false);

  const [mainSliderRef, mainSliderInstanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: { perView: 1, spacing: 0 },
      mode: "free-snap",
    }
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (mainSliderInstanceRef.current) {
        const nextSlide =
          (mainSliderInstanceRef.current.track.details.rel + 1) %
          mainSliderInstanceRef.current.track.details.slides.length;
        mainSliderInstanceRef.current.moveToIdx(nextSlide);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [mainSliderInstanceRef]);

  return (
    <>
      <header className="fixed w-full z-50">  {/* relative 대신 fixed 사용 */}
      {/* 상단 헤더 */}
        <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="py-2 md:py-3 text-center">
              <Link href="/" className="inline-block">
                <span className="text-base md:text-xl font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400 hover:from-blue-500 hover:to-teal-500 transition-all">
                  E-Biz
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* 네비게이션 바 */}
        <nav className="backdrop-blur-md bg-white/90 border-b border-gray-200/50 shadow-sm">
          <div className="max-w-7xl mx-auto">
            <ul className="flex justify-center items-center text-[11px] md:text-sm py-2 md:py-3 px-2 gap-x-5 md:gap-x-8">
              <li>
                <Link
                  href="/"
                  className={`relative py-1 hover:text-blue-500 transition-colors duration-200 ${
                    pathname === '/'
                      ? 'text-blue-500'
                      : 'text-gray-600'
                  }`}
                >
                  홈
                </Link>
              </li>
              <li>
                <Link
                  href="/location"
                  className={`relative py-1 hover:text-blue-500 transition-colors duration-200 ${
                    pathname === '/location'
                      ? 'text-blue-500'
                      : 'text-gray-600'
                  }`}
                >
                  오시는길
                </Link>
              </li>
              <li
                className="relative"
                onMouseEnter={() => setShowServiceMenu(true)}
                onMouseLeave={() => setShowServiceMenu(false)}
              >
                <Link
                  href="/services"
                  className={`relative py-1 hover:text-blue-500 transition-colors duration-200 ${
                    pathname === '/services'
                      ? 'text-blue-500'
                      : 'text-gray-600'
                  }`}
                >
                  서비스 소개
                </Link>
              </li>
              <li>
                <Link
                  href="/inquiry"
                  className={`relative py-1 hover:text-blue-500 transition-colors duration-200 ${
                    pathname === '/inquiry'
                      ? 'text-blue-500'
                      : 'text-gray-600'
                  }`}
                >
                  서비스 문의
                </Link>
              </li>
             
            </ul>
          </div>
        </nav>
      </header>

      {/* 메인 슬라이더 */}
      <div ref={mainSliderRef} className="keen-slider relative">
        {[1, 2, 3, 4, 5].map((num) => (
          <div key={num} className="keen-slider__slide">
            <img
              src={`/sample${num}.jpg`}
              alt={`Slide ${num}`}
              className="w-full h-[500px] md:h-[600px] object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-2xl md:text-4xl font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            E-Biz Office
          </h1>
          <p className="text-base md:text-xl mt-2 md:mt-4 font-medium text-gray-200">
            강남 & 공유 오피스
          </p>
          <p className="text-lg md:text-2xl mt-2 font-medium text-blue-400">
            010.6276.8768
          </p>
          <div className="mt-4 md:mt-6 space-y-1">
            <p className="text-sm md:text-base text-gray-200 font-medium">
              We Add Value to Your Office
            </p>
            <p className="text-sm md:text-base text-gray-300">
              We will put in precious value and happiness.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
