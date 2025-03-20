"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { ChevronDown, PhoneCall, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
  const pathname = usePathname();
  const [showServiceMenu, setShowServiceMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 수정된 슬라이더 설정
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 1,
      spacing: 0,
    },
    loop: true,
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    }
  });

  // 자동 슬라이딩
  useEffect(() => {
    const timer = setInterval(() => {
      if (instanceRef.current) {
        instanceRef.current.next();
      }
    }, 5000);
    
    return () => {
      clearInterval(timer);
    };
  }, [instanceRef]);

  return (
    <>
      <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
        {/* 상단 헤더 */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4">
            <div className="py-2 flex justify-center">
              <Link href="/" className="inline-block">
                <img 
                  src="/e-bizlogo.png" 
                  alt="E-Biz Office Logo" 
                  className="h-28 md:h-36 w-auto"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* 네비게이션 바 */}
        <nav className="bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <ul className="flex justify-center items-center text-sm py-3 gap-x-8">
              <li>
                <Link
                  href="/"
                  className={`relative py-2 px-1 transition-colors duration-200 font-medium ${
                    pathname === '/'
                      ? 'text-blue-500 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-500'
                      : 'text-gray-700 hover:text-blue-500'
                  }`}
                >
                  홈
                </Link>
              </li>
              <li>
                <Link
                  href="/location"
                  className={`relative py-2 px-1 transition-colors duration-200 font-medium ${
                    pathname === '/location'
                      ? 'text-blue-500 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-500'
                      : 'text-gray-700 hover:text-blue-500'
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
                  className={`relative py-2 px-1 transition-colors duration-200 font-medium flex items-center ${
                    pathname === '/services'
                      ? 'text-blue-500 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-500'
                      : 'text-gray-700 hover:text-blue-500'
                  }`}
                >
                  서비스 소개
                  <ChevronDown size={16} className="ml-1" />
                </Link>
              </li>
              <li>
                <Link
                  href="/inquiry"
                  className={`relative py-2 px-1 transition-colors duration-200 font-medium ${
                    pathname === '/inquiry'
                      ? 'text-blue-500 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-500'
                      : 'text-gray-700 hover:text-blue-500'
                  }`}
                >
                  서비스 문의
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* 헤더 높이만큼 빈 공간 추가 */}
      <div className="h-40 md:h-52"></div>

      {/* 메인 슬라이더 - 토스 스타일 + 이미지 이슈 해결 */}
      <div className="relative h-[600px] md:h-[720px]">
        <div ref={sliderRef} className="keen-slider h-full">
          {[1, 2, 3, 4, 5].map((num) => (
            <div key={num} className="keen-slider__slide relative">
              <div className="absolute inset-0 bg-black/50 z-10"></div>
              <img
                src={`/sample${num}.jpg`}
                alt={`Slide ${num}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* 토스 스타일의 헤더 콘텐츠 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-20 pt-16 md:pt-0">
          <div className="max-w-4xl w-full text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
              <span className="inline-block">비즈니스의 시작,</span> 
              <span className="inline-block text-blue-300 mt-2">강남 공유 오피스</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 max-w-lg mx-auto mb-6">
              필요한 것만 골라 쓰는 스마트한 비즈니스 솔루션
            </p>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-4 mt-8">
              <a 
                href="tel:010-6276-8768" 
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg inline-flex items-center justify-center transition-all w-full md:w-auto"
              >
                <PhoneCall size={18} className="mr-2" />
                전화 문의
              </a>
              <Link 
                href="/inquiry" 
                className="bg-white hover:bg-gray-100 text-blue-600 font-medium py-3 px-6 rounded-lg inline-flex items-center justify-center transition-all w-full md:w-auto"
              >
                <span>서비스 안내</span>
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* 슬라이더 인디케이터 */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-30">
          {instanceRef.current && 
            Array.from({length: instanceRef.current.track.details.slides.length}).map((_, idx) => (
              <button
                key={idx}
                onClick={() => instanceRef.current?.moveToIdx(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === idx ? "bg-white scale-125" : "bg-white/40"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))
          }
        </div>
      </div>
    </>
  );
}