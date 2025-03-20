// app/location/page.tsx
import { 
  PhoneCall, 
  Clock, 
  Building, 
  FileText, 
  MapPin, 
  GraduationCap,
  Mail,
  Wifi,
  CreditCard,
  Ban,
  FileSpreadsheet,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

export default function Location() {
  return (
    <div className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main Address */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">오시는 길</h1>
          <div className="inline-block bg-blue-50 px-6 py-3 rounded-full text-blue-800 font-medium mt-2">
            서울특별시 강남구 논현동 86-5 4층
          </div>
        </div>
  
        {/* SNS Icons - 반응형으로 수정 */}
        <div className="flex justify-center flex-wrap gap-4 md:gap-5 lg:gap-6 mb-12">
          <a 
            href="https://instagram.com/bh768768?igshid=YmMyMTA2M2Y=" 
            className="bg-white rounded-full p-3 md:p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <img src="/instagram-icon.png" alt="Instagram" className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
          </a>
          <a 
            href="https://www.facebook.com/profile.php?id=100086997880340" 
            className="bg-white rounded-full p-3 md:p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <img src="/facebook-icon.png" alt="Facebook" className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
          </a>
          <a 
            href="http://qr.kakao.com/talk/EY07kCmUR97NBwRFunG2rZqczmw-" 
            className="bg-white rounded-full p-3 md:p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <img src="/kakao-icon.png" alt="KakaoTalk" className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
          </a>
          <a 
            href="https://blog.naver.com/ebiz-office" 
            className="bg-white rounded-full p-3 md:p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <img src="/naverblog-icon.png" alt="Blog" className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
          </a>
        </div>
  
        {/* Two Horizontal Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <img 
              src="/shareoffice6.jpg" 
              alt="Office Location 1" 
              className="w-full h-[300px] object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <img 
              src="/shareoffice7.jpg" 
              alt="Office Location 2" 
              className="w-full h-[300px] object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
  
        {/* 교통 정보 섹션 */}
        <div className="bg-gray-50 rounded-2xl p-6 md:p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">교통 안내</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-lg flex items-center mb-4">
                <span className="bg-blue-500 text-white w-7 h-7 rounded-full flex items-center justify-center mr-2">2</span>
                지하철 이용 시
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium mr-2 mt-1">2호선</span>
                  <div>
                    <p className="font-medium">강남역</p>
                    <p className="text-gray-600 text-sm">3번 출구에서 도보 10분</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded text-xs font-medium mr-2 mt-1">9호선</span>
                  <div>
                    <p className="font-medium">신논현역</p>
                    <p className="text-gray-600 text-sm">4번 출구에서 도보 7분</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h3 className="font-bold text-lg flex items-center mb-4">
                <span className="bg-blue-500 text-white w-7 h-7 rounded-full flex items-center justify-center mr-2">B</span>
                버스 이용 시
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium">간선버스</p>
                  <p className="text-gray-600">146, 341, 472</p>
                </div>
                <div>
                  <p className="font-medium">지선버스</p>
                  <p className="text-gray-600">3412, 4412</p>
                </div>
                <div>
                  <p className="font-medium">정류장</p>
                  <p className="text-gray-600">논현역, 신논현역</p>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Map Image */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">위치 안내</h2>
          <div className="flex justify-center">
            <div className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img 
                src="/shareoffice8.png" 
                alt="Location Map" 
                className="w-full max-w-4xl h-auto"
              />
            </div>
          </div>
        </div>
        
        {/* 주변 편의시설 섹션 */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">주변 편의시설</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl text-center hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 text-xl font-bold">🍽️</span>
              </div>
              <p className="font-medium">맛집/레스토랑</p>
              <p className="text-gray-500 text-sm">도보 5분 이내</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-center hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 text-xl font-bold">☕</span>
              </div>
              <p className="font-medium">카페</p>
              <p className="text-gray-500 text-sm">도보 3분 이내</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-center hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 text-xl font-bold">🏦</span>
              </div>
              <p className="font-medium">은행/ATM</p>
              <p className="text-gray-500 text-sm">도보 5분 이내</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-center hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 text-xl font-bold">🛒</span>
              </div>
              <p className="font-medium">편의점/마트</p>
              <p className="text-gray-500 text-sm">도보 1분 이내</p>
            </div>
          </div>
        </div>
        
        {/* 서비스 안내 섹션 - 가격 정보 추가 */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">서비스 안내</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
              <h3 className="text-xl font-bold mb-4 text-blue-600">상주 서비스</h3>
              <p className="text-gray-700 mb-4">실제로 사무실 공간을 사용하는 서비스입니다.</p>
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <p className="font-medium">최소 계약 기간: 1개월부터</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="font-medium">개인 사업자 (1인실)</span>
                  <span className="text-blue-600 font-medium">40만원</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="font-medium">법인 사업자 (4~8인실)</span>
                  <span className="text-blue-600 font-medium">150만원</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
              <h3 className="text-xl font-bold mb-4 text-blue-600">비상주 서비스</h3>
              <p className="text-gray-700 mb-4">사업자등록을 위한 주소지만 사용하는 서비스입니다.</p>
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <p className="font-medium">계약 기간: 6개월 또는 12개월</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="font-medium">개인 사업자 (6개월)</span>
                  <span className="text-blue-600 font-medium">24만원</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="font-medium">개인 사업자 (12개월)</span>
                  <span className="text-blue-600 font-medium">36만원</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="font-medium">법인 사업자 (6개월)</span>
                  <span className="text-blue-600 font-medium">24만원</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="font-medium">법인 사업자 (12개월)</span>
                  <span className="text-blue-600 font-medium">36만원</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact Information with Icons - 3x3 그리드 레이아웃 및 모바일 최적화 */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">연락처 및 정보</h2>
          <div className="bg-blue-50 rounded-3xl p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* 첫 번째 줄 */}
              <div className="bg-white rounded-xl p-4 md:p-5 text-center shadow-sm hover:shadow-md transition-all">
                <div className="bg-blue-100 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <PhoneCall size={20} className="text-blue-600" />
                </div>
                <h3 className="font-bold text-base md:text-lg mb-1 md:mb-2">연락처</h3>
                <p className="text-gray-700 text-sm md:text-base">02-544-8768</p>
                <p className="text-gray-700 text-sm md:text-base">010-6276-8768</p>
              </div>
              
              <div className="bg-white rounded-xl p-4 md:p-5 text-center shadow-sm hover:shadow-md transition-all">
                <div className="bg-blue-100 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Wifi size={20} className="text-blue-600" />
                </div>
                <h3 className="font-bold text-base md:text-lg mb-1 md:mb-2">편의 시설</h3>
                <p className="text-gray-700 text-sm md:text-base">무료 와이파이</p>
                <p className="text-gray-700 text-sm md:text-base">무료 주차</p>
              </div>
              
              <div className="bg-white rounded-xl p-4 md:p-5 text-center shadow-sm hover:shadow-md transition-all">
                <div className="bg-blue-100 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Mail size={20} className="text-blue-600" />
                </div>
                <h3 className="font-bold text-base md:text-lg mb-1 md:mb-2">이메일</h3>
                <p className="text-gray-700 text-sm md:text-base">bh101092@daum.net</p>
              </div>
              
              {/* 두 번째 줄 */}
              <div className="bg-white rounded-xl p-4 md:p-5 text-center shadow-sm hover:shadow-md transition-all">
                <div className="bg-blue-100 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Building size={20} className="text-blue-600" />
                </div>
                <h3 className="font-bold text-base md:text-lg mb-1 md:mb-2">회사 정보</h3>
                <p className="text-gray-700 text-sm md:text-base">상호명: 이비즈</p>
                <p className="text-gray-700 text-sm md:text-base">대표자: 김보영</p>
              </div>
              
              <div className="bg-white rounded-xl p-4 md:p-5 text-center shadow-sm hover:shadow-md transition-all">
                <div className="bg-blue-100 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Ban size={20} className="text-blue-600" />
                </div>
                <h3 className="font-bold text-base md:text-lg mb-1 md:mb-2">사업자 번호</h3>
                <p className="text-gray-700 text-sm md:text-base">629-21-01668</p>
              </div>
              
              <div className="bg-white rounded-xl p-4 md:p-5 text-center shadow-sm hover:shadow-md transition-all">
                <div className="bg-blue-100 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <CreditCard size={20} className="text-blue-600" />
                </div>
                <h3 className="font-bold text-base md:text-lg mb-1 md:mb-2">계좌 정보</h3>
                <p className="text-gray-700 text-sm md:text-base">예금주: 김보영(이비즈)</p>
                <p className="text-gray-700 text-sm md:text-base">국민은행 924501-01-393200</p>
              </div>
              
              {/* 세 번째 줄 */}
              <div className="bg-white rounded-xl p-4 md:p-5 text-center shadow-sm hover:shadow-md transition-all">
                <div className="bg-blue-100 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <FileSpreadsheet size={20} className="text-blue-600" />
                </div>
                <h3 className="font-bold text-base md:text-lg mb-1 md:mb-2">통신판매업</h3>
                <p className="text-gray-700 text-sm md:text-base">제2022-서울강남-04160호</p>
              </div>
              
              <div className="bg-white rounded-xl p-4 md:p-5 text-center shadow-sm hover:shadow-md transition-all">
                <div className="bg-blue-100 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <MapPin size={20} className="text-blue-600" />
                </div>
                <h3 className="font-bold text-base md:text-lg mb-1 md:mb-2">주소 (Address)</h3>
                <p className="text-gray-700 text-sm md:text-base">서울특별시 강남구 논현동 86-5 4층</p>
                <p className="text-gray-600 text-xs md:text-sm mt-1">13, Nonhyeon-ro 132-gil, Gangnam-gu</p>
              </div>
              
              <div className="bg-white rounded-xl p-4 md:p-5 text-center shadow-sm hover:shadow-md transition-all">
                <div className="bg-blue-100 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <ExternalLink size={20} className="text-blue-600" />
                </div>
                <h3 className="font-bold text-base md:text-lg mb-1 md:mb-2">지도 보기</h3>
                <a 
                  href="https://map.naver.com/v5/search/서울특별시%20강남구%20논현동%2086-5" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-500 hover:text-blue-600 text-sm font-medium"
                >
                  <span>네이버 지도에서 보기</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}