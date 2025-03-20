// app/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ServiceSlider from '../components/ServiceSlider';
import { 
  Building, 
  Users, 
  Home as HomeIcon, 
  Briefcase, 
  Globe, 
  Building2, 
  FileText, 
  Phone, 
  UserCheck,
  PhoneCall,
  Check,
  Loader2,
  AlertCircle,
  Coffee,
  Wifi,
  Shield,
  Printer,
  Clock,
  PanelTop,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    inquiry: '',
    adminPhone: '010-6276-8768'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  
  // 자주 묻는 질문 토글 상태
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // FAQ 데이터
  const faqData = [
    {
      question: "비상주 사무실이란 무엇인가요?",
      answer: "비상주 사무실은 물리적으로 사용하지 않고 비즈니스 주소와 우편물 관리 등의 서비스만 이용하는 가상 오피스입니다. 사업자등록, 법인설립 등에 필요한 공식 비즈니스 주소를 제공합니다."
    },
    {
      question: "최소 계약 기간은 어떻게 되나요?",
      answer: "최소 3개월부터 계약이 가능합니다. 자세한 내용은 문의 부탁드립니다."
    },
    {
      question: "택배나 우편물은 어떻게 받나요?",
      answer: "모든 우편물과 택배는 저희 이비즈 오피스에서 안전하게 대신 수령해 드립니다. 방문하여 직접 수령하시거나, 요청 시 착불로 원하시는 주소로 전달해 드리는 서비스도 가능합니다."
    },
    {
      question: "실제 사무실도 이용할 수 있나요?",
      answer: "네, 실제 사무실 이용이 필요한 경우 시간제 또는 일일 단위로 회의실이나 공유 오피스 공간을 이용하실 수 있습니다. 별도의 이용료가 발생하며, 사전 예약이 필요합니다."
    }
  ];

  const handleServiceInquiry = () => {
    window.location.href = 'tel:010-6276-8768';
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    setSubmitStatus(null);

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
      setSubmitStatus('success');
      setFormData(prev => ({
        ...prev,
        name: '',
        phone: '',
        inquiry: ''
      }));
    } catch (error) {
      setSubmitMessage(error instanceof Error ? error.message : '문의 전송에 실패했습니다.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // FAQ 토글 핸들러
  const toggleFaq = (index: number) => {
    if (openFaqIndex === index) {
      setOpenFaqIndex(null);
    } else {
      setOpenFaqIndex(index);
    }
  };

  return (
    <div className="bg-white">
      <Header />

      {/* 페이지 내용 */}
      <div className="pt-0"> {/* 헤더 슬라이더가 전체 높이를 차지하므로 패딩 제거 */}
        <div className="max-w-6xl mx-auto px-4 py-16">
     
          
          {/* 소셜 미디어 섹션 */}
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12">이비즈 오피스와 소통하세요</h2>
            
            {/* 소셜 미디어 아이콘 - 반응형으로 조정 */}
            <div className="flex justify-center flex-wrap gap-4 md:gap-6 lg:gap-10 mb-8">
              <a 
                href="https://instagram.com/bh768768?igshid=YmMyMTA2M2Y=" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white p-3 md:p-4 lg:p-6 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110"
              >
                <img 
                  src="/instagram-icon.png" 
                  alt="Instagram" 
                  className="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20" 
                />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=100086997880340" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white p-3 md:p-4 lg:p-6 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110"
              >
                <img 
                  src="/facebook-icon.png" 
                  alt="Facebook" 
                  className="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20" 
                />
              </a>
              <a 
                href="http://qr.kakao.com/talk/EY07kCmUR97NBwRFunG2rZqczmw-" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white p-3 md:p-4 lg:p-6 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110"
              >
                <img 
                  src="/kakao-icon.png" 
                  alt="KakaoTalk" 
                  className="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20" 
                />
              </a>
              <a 
                href="https://blog.naver.com/ebiz-office" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white p-3 md:p-4 lg:p-6 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110"
              >
                <img 
                  src="/naverblog-icon.png" 
                  alt="Naver Blog" 
                  className="w-10 h-10 md:w-16 md:h-16 lg:w-20 lg:h-20" 
                />
              </a>
            </div>
            
            <p className="text-gray-600 max-w-2xl text-sm md:text-base">
              이비즈 오피스의 소셜 미디어 채널을 통해 최신 정보를 확인하세요.
              언제든지 연락주시면 친절하게 안내해드립니다.
            </p>
          </div>
          
          

        
          
          {/* 사업장 이미지 섹션 - 세로 크기 더 키움 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all">
            <div className="h-[550px] md:h-[600px] lg:h-[700px] overflow-hidden">
  <img 
    src="/sa2.jpg" 
    alt="Business Location 1" 
    className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
  />
</div>
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">강남구 논현동 사업자주소</h3>
                <p className="text-gray-600 mt-3 mb-4">(비상주사무실) 임대안내</p>
                <div className="flex">
                  <div className="bg-blue-100 text-blue-800 px-4 py-1.5 rounded-full text-sm font-medium">
                    사업자등록
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all">
            <div className="h-[550px] md:h-[600px] lg:h-[700px] overflow-hidden">
                <img 
                  src="/sa3.png" 
                  alt="Business Location 2" 
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">이비즈 비즈니스센터만의 차별점</h3>
                <p className="text-gray-600 mt-3 mb-4">사업자등록/이전 반려 시</p>
                <div className="flex">
                  <div className="bg-blue-100 text-blue-800 px-4 py-1.5 rounded-full text-sm font-medium">
                    비즈니스 센터
                  </div>
                </div>
              </div>
            </div>
          </div>
          

          {/* 서비스 섹션 - 원래 위치로 이동 */}
          <div className="mb-20 md:mb-24">
            <div className="mb-10 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">서비스 소개</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">이비즈 오피스만의 특별한 서비스를 확인해보세요.</p>
            </div>
            
            <ServiceSlider 
              images={['/shareoffice1.png', '/shareoffice2.png', '/shareoffice3.png', '/shareoffice4.png']} 
              title="이비즈 오피스"
              description="강남구 논현동에 위치한 E-Biz 오피스에서 비즈니스 경쟁력을 높이세요."
            />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">주요 편의시설</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <Wifi className="w-8 h-8 mx-auto text-blue-500 mb-3" />
              <h3 className="font-medium">초고속 와이파이</h3>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <Coffee className="w-8 h-8 mx-auto text-blue-500 mb-3" />
              <h3 className="font-medium">무료 커피/음료</h3>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <Printer className="w-8 h-8 mx-auto text-blue-500 mb-3" />
              <h3 className="font-medium">프린터/복사기</h3>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <Shield className="w-8 h-8 mx-auto text-blue-500 mb-3" />
              <h3 className="font-medium">24시간 보안</h3>
            </div>
          </div>

            {/* 운영 시간 섹션 - 운영시간 수정 */}
            <div className="mb-20 md:mb-24">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">운영 시간</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                    <span className="font-medium">평일</span>
                    <span>오전 9:00 - 오후 6:00</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                    <span className="font-medium">토요일</span>
                    <span>휴무</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                    <span className="font-medium">일요일/공휴일</span>
                    <span>휴무</span>
                  </div>
                </div>
                <div className="mt-6 text-sm text-gray-600">
                  <p className="flex items-center"><Clock className="h-4 w-4 mr-2 text-blue-500" /> 24시간 우편물 수령 서비스 제공</p>
                  <p className="flex items-center mt-2"><Clock className="h-4 w-4 mr-2 text-blue-500" /> 영업시간 외 방문 시 사전 예약 필요</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">이용 방법</h2>
                <ol className="space-y-4">
                  <li className="flex">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                    <div>
                      <p className="font-medium">전화 또는 온라인으로 문의</p>
                      <p className="text-gray-600 text-sm">원하는 서비스와 기간을 알려주세요</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                    <div>
                      <p className="font-medium">맞춤 견적 및 계약 안내</p>
                      <p className="text-gray-600 text-sm">필요한 서비스에 따른 최적의 견적을 제공해 드립니다</p>
                    </div>
                  </li>
                  <li className="flex">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">3</span>
                    <div>
                      <p className="font-medium">계약 체결 및 서비스 시작</p>
                      <p className="text-gray-600 text-sm">간편한 온라인 계약으로 빠르게 서비스를 시작하세요</p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* 비용 절감 효과 섹션 */}
          <div className="bg-blue-50 rounded-2xl p-8 md:p-10 mb-20">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">비용 절감 효과</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-center h-12 w-12 bg-blue-100 rounded-full mb-4 mx-auto">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">사무실 임대료</h3>
                <p className="text-gray-700 text-center">실제 사무실 대비 최대 90% 비용 절감</p>
                <div className="flex justify-center mt-4">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">월 50만원 절약</span>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-center h-12 w-12 bg-blue-100 rounded-full mb-4 mx-auto">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">인력 비용</h3>
                <p className="text-gray-700 text-center">리셉션, 관리 인력 채용 불필요</p>
                <div className="flex justify-center mt-4">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">월 200만원 절약</span>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-center h-12 w-12 bg-blue-100 rounded-full mb-4 mx-auto">
                  <PanelTop className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">설비 비용</h3>
                <p className="text-gray-700 text-center">인테리어, 가구, 사무기기 등 초기 투자 불필요</p>
                <div className="flex justify-center mt-4">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">1,000만원+ 절약</span>
                </div>
              </div>
            </div>
          </div>

          {/* 서비스 항목 - 토스 스타일 개선 */}
          <div className="bg-gray-50 rounded-3xl p-6 md:p-10 lg:p-12 mb-20 md:mb-24">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-10">이런 분들께 추천합니다</h2>
            
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-start">
                <div className="bg-blue-100 p-2 md:p-3 rounded-full mr-4 flex-shrink-0">
                  <Building className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-gray-800 text-sm md:text-base">사무실이 필요하지 않지만 사업장 소재지가 필요하신 분</p>
              </div>
              
              <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-start">
                <div className="bg-blue-100 p-2 md:p-3 rounded-full mr-4 flex-shrink-0">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-gray-800 text-sm md:text-base">집주소로 되어있는 사업장 주소를 일반 회사 주소지로 두고 싶은 사업자</p>
              </div>
              
              <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-start">
                <div className="bg-blue-100 p-2 md:p-3 rounded-full mr-4 flex-shrink-0">
                  <HomeIcon className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-gray-800 text-sm md:text-base">추가로 사업자를 내는데 주소지만 필요하신 분</p>
              </div>
              
              <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-start">
                <div className="bg-blue-100 p-2 md:p-3 rounded-full mr-4 flex-shrink-0">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-gray-800 text-sm md:text-base">인터넷사업자 / 재택근무자 사업 주소지가 필요하신 분</p>
              </div>
              
              <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-start">
                <div className="bg-blue-100 p-2 md:p-3 rounded-full mr-4 flex-shrink-0">
                  <Globe className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-gray-800 text-sm md:text-base">해외 거주자로 국내 사업을 위한 사업자등록증이 필요하신 분</p>
              </div>
              
              <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-start">
                <div className="bg-blue-100 p-2 md:p-3 rounded-full mr-4 flex-shrink-0">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-gray-800 text-sm md:text-base">외근 중심의 업무스타일로 사무공간이 필요하신 분</p>
              </div>
              
              <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-start">
                <div className="bg-blue-100 p-2 md:p-3 rounded-full mr-4 flex-shrink-0">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-gray-800 text-sm md:text-base">자체적으로 사업자 주소, 명함, 전화 등이 필요하신 분</p>
              </div>
              
              <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-start">
                <div className="bg-blue-100 p-2 md:p-3 rounded-full mr-4 flex-shrink-0">
                  <UserCheck className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-gray-800 text-sm md:text-base">평생 법인 설립 문의 가능한 세무사, 법무사 연계 서비스가 필요하신 분</p>
              </div>
            </div>
          </div>

          {/* 서비스 문의 버튼 - 토스 스타일 개선 */}
          <div className="text-center mb-16 md:mb-20">
            <div className="bg-gray-50 rounded-2xl p-6 md:p-10 mb-6 max-w-3xl mx-auto">
              <h3 className="text-xl md:text-2xl font-bold mb-4">지금 바로 문의하세요</h3>
              <p className="text-gray-600 mb-6 text-sm md:text-base">10초 만에 궁금증을 해결해 드립니다</p>
              <button 
                onClick={handleServiceInquiry}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-4 px-8 rounded-xl shadow-md transition-all text-base md:text-lg flex items-center justify-center mx-auto"
              >
                <PhoneCall size={18} className="mr-2" />
                전화 상담하기
              </button>
            </div>
          </div>

          {/* 서비스 문의 폼 - 토스 스타일 개선 및 디자인 강화 */}
          <div className="max-w-xl md:max-w-2xl mx-auto mb-16 md:mb-20">
            <div className="bg-gradient-to-b from-blue-50 to-white rounded-3xl shadow-lg p-6 md:p-10 border border-blue-100">
              <div className="text-center mb-8">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PhoneCall size={26} className="text-blue-600" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">서비스 문의하기</h2>
                <p className="text-gray-600 mt-3 text-sm md:text-base max-w-md mx-auto">
                  궁금한 점이 있으신가요? 문의를 남겨주시면 빠르게 답변해드립니다.
                </p>
              </div>
              
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    이름
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="이름을 입력해주세요"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm md:text-base shadow-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    연락처
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="010-0000-0000"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm md:text-base shadow-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    문의내용
                  </label>
                  <textarea
                    value={formData.inquiry}
                    onChange={(e) => setFormData(prev => ({ ...prev, inquiry: e.target.value }))}
                    placeholder="문의하실 내용을 입력해주세요"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-sm md:text-base shadow-sm"
                    style={{ minHeight: '10rem' }}
                    required
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-4 px-8 rounded-xl shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="animate-spin h-5 w-5 mr-2" />
                        처리중...
                      </div>
                    ) : (
                      '문의하기'
                    )}
                  </button>
                </div>

                {submitStatus && (
                  <div className={`mt-4 flex items-start p-4 rounded-xl ${
                    submitStatus === 'success' 
                      ? 'bg-green-50 text-green-800 border border-green-100' 
                      : 'bg-red-50 text-red-800 border border-red-100'
                  }`}>
                    {submitStatus === 'success' ? (
                      <Check className="h-5 w-5 mr-2 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                    )}
                    <p className="text-sm">{submitMessage}</p>
                  </div>
                )}
              </form>

              {/* 문의 안내 텍스트 */}
              <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-100 text-center">
                <p className="text-gray-600 text-sm">문의하신 내용은 확인 후 순차적으로 연락드리겠습니다.</p>
                <p className="mt-2 font-bold flex items-center justify-center text-gray-700">
                  <PhoneCall size={16} className="mr-2 text-blue-500" />
                  빠른 상담: 010-6276-8768
                </p>
              </div>
            </div>
          </div>
          
          {/* 자주 묻는 질문 섹션 - 토스 스타일로 개선 (토글 기능 추가) */}
          <div className="mb-20 md:mb-24">
            <div className="bg-blue-50 rounded-3xl py-10 px-4 md:px-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">자주 묻는 질문</h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
                  이비즈 오피스 서비스에 대해 궁금한 점을 확인해보세요.
                </p>
              </div>
              
              <div className="space-y-4 max-w-3xl mx-auto">
                {faqData.map((faq, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden border border-blue-100">
                    <button 
                      className="w-full p-6 flex justify-between items-center text-left cursor-pointer focus:outline-none"
                      onClick={() => toggleFaq(index)}
                    >
                      <h3 className="font-bold text-lg flex items-center">
                        <span className={`flex-shrink-0 w-8 h-8 rounded-full mr-3 flex items-center justify-center ${
                          openFaqIndex === index ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-500'
                        }`}>Q</span>
                        {faq.question}
                      </h3>
                      {openFaqIndex === index ? (
                        <ChevronUp size={20} className="text-blue-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />
                      )}
                    </button>
                    <div 
                      className={`transition-all duration-300 ${
                        openFaqIndex === index 
                          ? 'max-h-96 opacity-100 scale-y-100' 
                          : 'max-h-0 opacity-0 scale-y-0 overflow-hidden'
                      }`}
                    >
                      <div className="px-6 pb-6 text-gray-600 border-t border-gray-100 pt-4 ml-11">
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <p className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm">
                  더 궁금한 점이 있으신가요? 
                  <button onClick={() => {
  const element = document.querySelector('.max-w-xl, .md\\:max-w-2xl');
  if (element) {
    window.scrollTo({
      top: element.getBoundingClientRect().top + window.scrollY - 100,
      behavior: 'smooth'
    });
  }
}}
                  className="font-medium ml-1 underline">문의하기</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}