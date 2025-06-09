// app/services/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Check, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';

const serviceTypes = [
  { id: 'surroundings', name: '사무실주변' },
  { id: 'interior', name: '사무실내부' },
  { id: 'single', name: '1인실' },
  { id: 'multi', name: '다인실' },
  { id: 'meeting', name: '회의실' },
  { id: 'pantry', name: '탕비실' },
] as const;

type ServiceId = typeof serviceTypes[number]['id'];

export default function Services() {
  const [activeService, setActiveService] = useState<ServiceId>('surroundings');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const images: Record<ServiceId, string[]> = {
    surroundings: ['/nearbyoffice1.jpg', '/nearbyoffice2.jpg', '/nearbyoffice3.jpg', '/sur2.jpeg'],
    interior: ['/inside1.jpg', '/inside2.jpg', '/inside3.jpg', '/inside4.jpg', '/inside5.jpg'],
    single: ['/personal.jpg', '/personal2.jpg', '/personal3.jpg', '/1in.jpeg'],
    multi: ['/toomuch1.jpg', '/toomuch2.jpg', '/toomuch3.jpg', '/toomuch4.jpg', '/dain.jpeg', '/dain2.jpeg'],
    meeting: ['/officeroom.jpg', '/officeroom2.jpg', '/officeroom3.jpg', '/officeroom4.jpg', '/ghldml.jpeg', '/ghldml2.jpeg'],
    pantry: ['/break.jpg', '/break2.jpg'],
  };

  const serviceTitles: Record<ServiceId, string> = {
    surroundings: '사무실 주변',
    interior: '사무실 내부',
    single: '1인실',
    multi: '다인실',
    meeting: '회의실',
    pantry: '탕비실',
  };

  const commonDescriptions = [
    {
      title: '사무실의 가치있는 브랜드와 품격을 더하다.',
      content:
        '비즈니스 환경 중심 강남구에 위치한 E-biz는 사업 1번지인 강남구에 위치해있습니다.',
    },
    {
      title: '합리적이고 저렴한 가격으로 사무실의 편의를 기획합니다.',
      content: '강남구에서 가장 저렴하고 합리적인 가격으로 운영하겠습니다.',
    },
    {
      title: '2층 근린 생활 업종으로 다양한 사업자 등록이 가능합니다.',
      content: '건강 기능 식품 및 의료기기 도소매 등 여러 사업자 등록이 가능합니다.',
    },
    {
      title: '모든 우편물과 택배 수령 가능합니다.',
      content: '우편물, 택배 프리(상시 운영 안내) 서비스 제공을 도와드리고 있습니다.',
    },
    {
      title: '실사 지원을 무상으로 지원해 드리고 있습니다.',
      content: '공공 기관과 관공서 및 금융기관 등의 실사 지원을 무상으로 지원해드립니다.',
    },
    {
      title: '편리한 온라인 계약이 가능합니다.',
      content: '어느 지역에서 365일 24시간 전화, 문자, 카카오톡으로 바로 상담 가능합니다.',
    },
    {
      title: '세무사, 법무사 연계서비스가 가능합니다.',
      content: '절세, 법인설립 문의는 전문가에게, 당신은 사업에 집중하세요.',
    },
  ];

  // 자동 이미지 슬라이드 타이머
  useEffect(() => {
    const imageCount = images[activeService].length;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageCount);
        setFade(true);
      }, 300); // 페이드 아웃 시간
    }, 5000); // 이미지 표시 시간

    return () => {
      clearInterval(interval);
    };
  }, [activeService, images]);

  // activeService 변경 시 이미지 초기화
  useEffect(() => {
    setCurrentImageIndex(0);
    setFade(true);
    // 모바일 메뉴 닫기
    setMobileMenuOpen(false);
  }, [activeService]);

  // 이전 이미지로 이동
  const prevImage = () => {
    const imageCount = images[activeService].length;
    setFade(false);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imageCount) % imageCount);
      setFade(true);
    }, 300);
  };

  // 다음 이미지로 이동
  const nextImage = () => {
    const imageCount = images[activeService].length;
    setFade(false);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageCount);
      setFade(true);
    }, 300);
  };

  // 터치 이벤트 핸들러 (모바일 스와이프)
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // 왼쪽으로 스와이프
      nextImage();
    }

    if (touchStart - touchEnd < -50) {
      // 오른쪽으로 스와이프
      prevImage();
    }
  };

  // 모바일 메뉴 토글
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* 헤더 */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2">서비스 소개</h1>
            <p className="text-gray-500">E-Biz Office의 다양한 공간을 만나보세요</p>
          </div>

          {/* 모바일용 서비스 내비게이션 (드롭다운) */}
          <div className="md:hidden mb-8">
            <button
              onClick={toggleMobileMenu}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 flex justify-between items-center shadow-sm"
            >
              <span className="font-medium text-gray-800">{serviceTitles[activeService]}</span>
              <ChevronDown
                size={20}
                className={`text-gray-500 transition-transform ${
                  mobileMenuOpen ? 'transform rotate-180' : ''
                }`}
              />
            </button>
            
            {mobileMenuOpen && (
              <div className="mt-2 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg animate-fade-in">
                {serviceTypes.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setActiveService(service.id)}
                    className={`w-full px-4 py-3 text-left transition-colors ${
                      activeService === service.id
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    {service.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 데스크톱용 서비스 내비게이션 (탭) */}
          <div className="hidden md:flex justify-center mb-10">
            <div className="bg-gray-50 rounded-full p-1.5 inline-flex shadow-sm">
              {serviceTypes.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service.id)}
                  className={`
                    whitespace-nowrap px-5 py-2 text-sm font-medium rounded-full transition-all duration-200
                    ${
                      activeService === service.id
                        ? 'bg-white text-blue-500 shadow'
                        : 'text-gray-600 hover:bg-gray-100'
                    }
                  `}
                >
                  {service.name}
                </button>
              ))}
            </div>
          </div>

          {/* 서비스 콘텐츠 */}
          <div className="mt-8">
            <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-10">
              {/* 이미지 표시 */}
              <div className="lg:w-1/2 w-full">
                <div 
                  className="relative overflow-hidden rounded-2xl shadow-sm h-[300px] md:h-[450px]"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {images[activeService].map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${serviceTitles[activeService]} ${idx + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out ${
                        idx === currentImageIndex && fade ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  ))}
                  
                  {/* 이미지 내비게이션 버튼 */}
                  <div className="absolute inset-y-0 left-0 flex items-center">
                    <button 
                      onClick={prevImage}
                      className="ml-4 bg-white/80 p-2 rounded-full hover:bg-white transition-colors focus:outline-none"
                      aria-label="이전 이미지"
                    >
                      <ChevronLeft size={20} className="text-gray-700" />
                    </button>
                  </div>
                  <div className="absolute inset-y-0 right-0 flex items-center">
                    <button 
                      onClick={nextImage}
                      className="mr-4 bg-white/80 p-2 rounded-full hover:bg-white transition-colors focus:outline-none"
                      aria-label="다음 이미지"
                    >
                      <ChevronRight size={20} className="text-gray-700" />
                    </button>
                  </div>
                  
                  {/* 현재 이미지 인디케이터 - 토스 스타일 */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                    <div className="bg-black/30 rounded-full px-3 py-1.5 backdrop-blur-sm">
                      <p className="text-xs text-white font-medium">
                        {currentImageIndex + 1} / {images[activeService].length}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* 이미지 내비게이션 닷 */}
                <div className="flex justify-center mt-6 gap-2">
                  {images[activeService].map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setFade(false);
                        setTimeout(() => {
                          setCurrentImageIndex(idx);
                          setFade(true);
                        }, 300);
                      }}
                      className={`rounded-full transition-all duration-300 ${
                        currentImageIndex === idx 
                          ? "bg-blue-500 w-6 h-2" 
                          : "bg-gray-200 w-2 h-2 hover:bg-gray-300"
                      }`}
                      aria-label={`이미지 ${idx + 1} 보기`}
                    />
                  ))}
                </div>
              </div>

              {/* 텍스트 설명 */}
              <div className="lg:w-1/2 w-full mt-8 lg:mt-0">
                <div className="bg-white rounded-2xl border border-gray-100 p-0 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100 bg-white">
                    <h2 className="text-2xl font-bold mb-1 text-gray-900">
                      {serviceTitles[activeService]}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      E-Biz Office의 {serviceTitles[activeService]} 공간을 소개합니다
                    </p>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-5">
                      {commonDescriptions.map((desc, index) => (
                        <div key={index} className="flex">
                          <div className="mt-0.5 mr-3">
                            <div className="flex-shrink-0 bg-blue-100 rounded-full p-1 w-6 h-6 flex items-center justify-center">
                              <Check size={14} className="text-blue-600" />
                            </div>
                          </div>
                          <div>
                            <p className="font-medium text-gray-800 text-sm">{desc.title}</p>
                            <p className="text-gray-600 mt-1 text-sm">{desc.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* 도움말 박스 - 토스 스타일 */}
                <div className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="flex items-start">
                    <div className="mr-3 mt-0.5">
                      <div className="flex-shrink-0 bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center">
                        <Check size={14} className="text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">빠른 답변이 필요하신가요?</p>
                      <p className="text-gray-600 mt-1 text-sm">
                        궁금한 점은 언제든지 연락주세요. 
                        <a href="tel:010-6276-8768" className="font-medium text-blue-500 ml-1 hover:underline">
                          010-6276-8768
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>  
        </div>
      </div>
      <Footer />

      {/* 스타일 */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}