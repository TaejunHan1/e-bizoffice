// app/services/page.tsx
"use client";

import React, { useState, useEffect } from 'react';

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

  const images: Record<ServiceId, string[]> = {
    surroundings: ['/nearbyoffice1.jpg', '/nearbyoffice2.jpg', '/nearbyoffice3.jpg'],
    interior: ['/inside1.jpg', '/inside2.jpg', '/inside3.jpg', '/inside4.jpg', '/inside5.jpg'],
    single: ['/personal.jpg', '/personal2.jpg', '/personal3.jpg'],
    multi: ['/toomuch1.jpg', '/toomuch2.jpg', '/toomuch3.jpg', '/toomuch4.jpg'],
    meeting: ['/officeroom.jpg', '/officeroom2.jpg', '/officeroom3.jpg', '/officeroom4.jpg'],
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
      title: '구내의 가치있는 브랜드와 품격을 더하다.',
      content:
        '비즈니스 환경 중심 강남구에 위치한 E-biz는 사업 1번지인 강남구에 위치해있습니다.',
    },
    {
      title: '합리적이고 저렴한 가격으로 구내의 편의를 기획합니다.',
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

  useEffect(() => {
    const imageCount = images[activeService].length;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageCount);
        setFade(true);
      }, 1000); // 페이드 아웃 시간
    }, 4000); // 이미지 표시 시간 + 페이드 아웃 시간

    return () => {
      clearInterval(interval);
    };
  }, [activeService]);

  // activeService 변경 시 이미지 초기화
  useEffect(() => {
    setCurrentImageIndex(0);
    setFade(true);
  }, [activeService]);

  return (
    <div className="bg-[#f5f0eb] min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold">서비스 소개</h1>
          <p className="text-gray-600 mt-2">Our Office</p>
        </div>

        {/* 서비스 내비게이션 */}
        <div className="border-b border-gray-200 mb-12">
          <nav className="flex flex-wrap justify-center -mb-px">
            {serviceTypes.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveService(service.id)}
                className={`
                  inline-flex items-center px-4 py-2 md:px-6 md:py-4 border-b-2 text-sm font-medium
                  ${
                    activeService === service.id
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                  transition-colors duration-200
                `}
              >
                {service.name}
              </button>
            ))}
          </nav>
        </div>

        {/* 서비스 콘텐츠 */}
        <div className="mt-8">
          <div className="flex flex-col md:flex-row items-start">
            {/* 이미지 표시 */}
            <div className="md:w-1/2 w-full relative">
              <div className="image-container">
                <img
                  src={images[activeService][currentImageIndex]}
                  alt={`${serviceTitles[activeService]} ${currentImageIndex + 1}`}
                  className={`fade-image ${fade ? 'fade-in' : 'fade-out'}`}
                />
              </div>
            </div>

            {/* 텍스트 설명 */}
            <div className="md:w-1/2 w-full mt-8 md:mt-0 md:ml-8">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold mb-8 text-center md:text-left">
                  {serviceTitles[activeService]}
                </h2>
                <div className="space-y-6">
                  {commonDescriptions.map((desc, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-5 h-5 mt-1 text-red-500">✓</div>
                      <div>
                        <p className="font-semibold">{desc.title}</p>
                        <p className="text-gray-600">{desc.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>  
      </div>

      {/* 스타일 */}
      <style jsx>{`
        .image-container {
          position: relative;
          width: 100%;
          height: 300px;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .image-container {
            height: 600px;
          }
        }
        .fade-image {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 1s ease-in-out;
          opacity: 0;
        }
        .fade-in {
          opacity: 1;
        }
        .fade-out {
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
