// app/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  Building, 
  Users, 
  HomeIcon, 
  Briefcase, 
  Globe, 
  Building2, 
  FileText, 
  Phone, 
  UserCheck,
  PhoneCall 
} from 'lucide-react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    inquiry: '',
    adminPhone: '010-6276-8768'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const [serviceSliderRef, serviceSliderInstanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1 },
    mode: "snap",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (serviceSliderInstanceRef.current) {
        const nextSlide = (serviceSliderInstanceRef.current.track.details.rel + 1) % serviceSliderInstanceRef.current.track.details.slides.length;
        serviceSliderInstanceRef.current.moveToIdx(nextSlide);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [serviceSliderInstanceRef]);

  const handleServiceInquiry = () => {
    window.location.href = 'tel:010-6276-8768';
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    const cleanedAdminPhone = formData.adminPhone.replace(/-/g, '');
    const cleanedPhone = formData.phone.replace(/-/g, '');

    try {
      const response = await fetch('/api/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          phone: cleanedPhone,
          adminPhone: cleanedAdminPhone
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '문의 전송에 실패했습니다.');
      }

      setSubmitMessage('문의가 성공적으로 전송되었습니다.');
      setFormData(prev => ({
        ...prev,
        name: '',
        phone: '',
        inquiry: ''
      }));
    } catch (error) {
      setSubmitMessage(error instanceof Error ? error.message : '문의 전송에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Header />

      {/* 페이지 내용 */}
      <div className="pt-[88px]">
        {/* 비즈니스 소개 섹션 */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="relative w-full max-w-2xl h-auto mb-8">
              <img src="/sa.png" alt="Business Discussion" className="w-full h-auto" />

             {/* 소셜 미디어 아이콘 */}
<div className="flex justify-center flex-wrap gap-6 md:gap-[105px] mt-8 md:mt-28 mb-8">
  <a 
    href="https://instagram.com/bh768768?igshid=YmMyMTA2M2Y=" 
    target="_blank" 
    rel="noopener noreferrer"
    className="transition-transform hover:scale-105"
  >
    <img 
      src="/instagram-icon.png" 
      alt="Instagram" 
      className="w-12 h-12 md:w-16 md:h-16 hover:opacity-80 transition-opacity cursor-pointer" 
    />
  </a>
  <a 
    href="https://www.facebook.com/profile.php?id=100086997880340" 
    target="_blank" 
    rel="noopener noreferrer"
    className="transition-transform hover:scale-105"
  >
    <img 
      src="/facebook-icon.png" 
      alt="Facebook" 
      className="w-12 h-12 md:w-16 md:h-16 hover:opacity-80 transition-opacity cursor-pointer" 
    />
  </a>
  <a 
    href="http://qr.kakao.com/talk/EY07kCmUR97NBwRFunG2rZqczmw-" 
    target="_blank" 
    rel="noopener noreferrer"
    className="transition-transform hover:scale-105"
  >
    <img 
      src="/kakao-icon.png" 
      alt="KakaoTalk" 
      className="w-12 h-12 md:w-16 md:h-16 hover:opacity-80 transition-opacity cursor-pointer" 
    />
  </a>
  <a 
    href="https://blog.naver.com/ebiz-office" 
    target="_blank" 
    rel="noopener noreferrer"
    className="transition-transform hover:scale-105"
  >
    <img 
      src="/naverblog-icon.png" 
      alt="Naver Blog" 
      className="w-12 h-12 md:w-16 md:h-16 hover:opacity-80 transition-opacity cursor-pointer" 
    />
  </a>
</div>
            </div>
          </div>

          {/* 사업장 이미지 섹션 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
            <div>
              <img 
                src="/sa2.jpg" 
                alt="Business Location 1" 
                className="object-cover w-full h-auto"
              />
              <div className="text-center mt-4">
                <h3 className="text-xl font-semibold">강남구 논현동 사업자주소</h3>
                <p className="text-gray-600">(비상주사무실) 임대안내</p>
              </div>
            </div>
            
            <div>
              <img 
                src="/sa3.png" 
                alt="Business Location 2" 
                className="object-cover w-full h-auto"
              />
              <div className="text-center mt-4">
                <h3 className="text-xl font-semibold">이비즈 비즈니스센터만의 차별점</h3>
                <p className="text-gray-600">사업자등록/이전 반려 시</p>
              </div>
            </div>
          </div>

          {/* 서비스 문의 버튼 */}
          <div className="text-center mt-12 mb-16">
            <button 
              onClick={handleServiceInquiry}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-full shadow-lg transform transition hover:scale-105 text-xl flex items-center justify-center mx-auto"
            >
              <PhoneCall size={24} className="mr-2" />
              서비스 문의하기
            </button>
          </div>

          {/* 서비스 문의 폼 */}
          <div className="max-w-xl mx-auto mt-12 bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold mb-8 text-center">서비스 문의하기</h3>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="이름을 입력해주세요"
                  className="w-full px-4 py-3 text-gray-700 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors peer"
                  required
                />
                <label className="absolute text-xs text-gray-500 bg-white px-2 left-2 -top-2 transition-all peer-focus:text-blue-500">
                  이름
                </label>
              </div>

              <div className="relative">
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="010-0000-0000"
                  className="w-full px-4 py-3 text-gray-700 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors peer"
                  required
                />
                <label className="absolute text-xs text-gray-500 bg-white px-2 left-2 -top-2 transition-all peer-focus:text-blue-500">
                  연락처
                </label>
              </div>

              <div className="relative">
                <textarea
                  value={formData.inquiry}
                  onChange={(e) => setFormData(prev => ({ ...prev, inquiry: e.target.value }))}
                  placeholder="문의하실 내용을 입력해주세요"
                  className="w-full px-4 py-3 text-gray-700 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors peer min-h-[120px] resize-none"
                  rows={4}
                  required
                />
                <label className="absolute text-xs text-gray-500 bg-white px-2 left-2 -top-2 transition-all peer-focus:text-blue-500">
                  문의내용
                </label>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      전송중...
                    </div>
                  ) : (
                    '문의하기'
                  )}
                </button>
              </div>

              {submitMessage && (
                <div className={`mt-4 text-center text-sm p-4 rounded-lg ${
                  submitMessage.includes('실패') 
                    ? 'bg-red-50 text-red-600' 
                    : 'bg-green-50 text-green-600'
                }`}>
                  {submitMessage}
                </div>
              )}
            </form>

            {/* 문의 안내 텍스트 */}
            <div className="mt-8 text-center text-sm text-gray-500">
              <p>문의하신 내용은 확인 후 순차적으로 연락드리겠습니다.</p>
              <p className="mt-1">급하신 경우 <b>010-6276-8768</b>로 전화 문의 부탁드립니다.</p>
            </div>
          </div>

          {/* 서비스 섹션 */}
          <div className="bg-[#f5f0eb] py-16">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8">Service</h2>
              
              {/* 서비스 슬라이더 */}
              <div ref={serviceSliderRef} className="keen-slider mb-12">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="keen-slider__slide">
                    <img 
                      src={`/shareoffice${num}.png`} 
                      alt={`Share Office ${num}`}
                      className="w-full h-[300px] md:h-[500px] object-cover rounded-lg shadow-lg"
                    />
                  </div>
                ))}
              </div>

              {/* 서비스 항목 */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Building size={24} className="text-blue-600" />
                    <p className="text-gray-700">사무실이 필요하지 않지만 사업장 소재지가 필요하신 분</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Users size={24} className="text-blue-600" />
                    <p className="text-gray-700">집주소로 되어있는 사업장 주소를 일반 회사 주소지로 두고 싶은 사업자</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <HomeIcon size={24} className="text-blue-600" />
                    <p className="text-gray-700">추가로 사업자를 내는데 주소지만 필요하신 분</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Briefcase size={24} className="text-blue-600" />
                    <p className="text-gray-700">인터넷사업자 / 재택근무자 사업 주소지가 필요하신 분</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Globe size={24} className="text-blue-600" />
                    <p className="text-gray-700">해외 거주자로 국내 사업을 위한 사업자등록증이 필요하신 분</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Building2 size={24} className="text-blue-600" />
                    <p className="text-gray-700">외근 중심의 업무스타일로 사무공간이 필요하신 분</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <FileText size={24} className="text-blue-600" />
                    <p className="text-gray-700">자체적으로 사업자 주소, 명함, 전화 등이 필요하신 분</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Phone size={24} className="text-blue-600" />
                    <p className="text-gray-700">사업자 주소지에서 다양한 운영 서비스가 필요하신 분</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <UserCheck size={24} className="text-blue-600" />
                    <p className="text-gray-700">평생 법인 설립 문의 가능한 세무사, 법무사 연계 서비스가 필요하신 분</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
