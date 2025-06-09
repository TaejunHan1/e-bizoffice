// app/components/Footer.tsx
import { MapPin, Phone, Mail, Building2, Ban, MapIcon, Instagram, Facebook, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-100 pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* 모바일용 푸터 (스택 레이아웃) */}
        <div className="md:hidden">
          <div className="mb-8">
            <Link href="/" className="inline-block">
              <h3 className="text-xl font-bold text-blue-500 flex items-center">
                <Building2 className="w-5 h-5 mr-2" />
                E-Biz Office
              </h3>
            </Link>
            
            {/* 소셜 미디어 아이콘 */}
            <div className="flex gap-3 mt-6">
              <a 
                href="https://instagram.com/bh768768?igshid=YmMyMTA2M2Y=" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-50 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <img 
                  src="/instagram-icon.png" 
                  alt="Instagram" 
                  className="w-5 h-5" 
                />
              </a>
              <a 
                href="https://www.facebook.com/profile.php?id=100086997880340" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-50 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <img 
                  src="/facebook-icon.png" 
                  alt="Facebook" 
                  className="w-5 h-5" 
                />
              </a>
              <a 
                href="https://open.kakao.com/o/grmmDSAh" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-50 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <img 
                  src="/kakao-icon.png" 
                  alt="KakaoTalk" 
                  className="w-5 h-5" 
                />
              </a>
              <a 
                href="https://blog.naver.com/ebiz-office" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-50 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <img 
                  src="/naverblog-icon.png" 
                  alt="Blog" 
                  className="w-5 h-5" 
                />
              </a>
            </div>
          </div>
          
          <div className="border rounded-2xl p-4 bg-gray-50 mb-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-start">
                <Phone className="w-4 h-4 mt-0.5 mr-2 text-blue-500 flex-shrink-0" />
                <div>
                  <p className="text-gray-800 text-sm font-medium">연락처</p>
                  <p className="text-gray-600 text-sm">010-6276-8768</p>
                  <p className="text-gray-600 text-sm">02-544-8768</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="w-4 h-4 mt-0.5 mr-2 text-blue-500 flex-shrink-0" />
                <div>
                  <p className="text-gray-800 text-sm font-medium">이메일</p>
                  <p className="text-gray-600 text-sm">bh101092@daum.net</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mt-0.5 mr-2 text-blue-500 flex-shrink-0" />
                <div>
                  <p className="text-gray-800 text-sm font-medium">주소</p>
                  <p className="text-gray-600 text-sm">서울특별시 강남구 논현동 86-5 4층</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border rounded-2xl p-4 bg-gray-50 mb-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-start">
                <Building2 className="w-4 h-4 mt-0.5 mr-2 text-blue-500 flex-shrink-0" />
                <div>
                  <p className="text-gray-800 text-sm font-medium">계좌번호</p>
                  <p className="text-gray-600 text-sm">국민은행 924501-01-393200</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Ban className="w-4 h-4 mt-0.5 mr-2 text-blue-500 flex-shrink-0" />
                <div>
                  <p className="text-gray-800 text-sm font-medium">사업자번호</p>
                  <p className="text-gray-600 text-sm">629-21-01668</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapIcon className="w-4 h-4 mt-0.5 mr-2 text-blue-500 flex-shrink-0" />
                <div>
                  <p className="text-gray-800 text-sm font-medium">통신판매업 신고번호</p>
                  <p className="text-gray-600 text-sm">제2022-서울강남-04160호</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-xs text-gray-500 text-center">
            <p>© {currentYear} E-Biz Office. All Rights Reserved.</p>
            <p className="mt-1">Designed by Taejun Han</p>
          </div>
        </div>
        
        {/* 데스크톱용 푸터 (그리드 레이아웃) */}
        <div className="hidden md:block">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-4">
              <Link href="/" className="inline-block">
                <h3 className="text-xl font-bold text-blue-500 flex items-center">
                  <Building2 className="w-5 h-5 mr-2" />
                  E-Biz Office
                </h3>
              </Link>
              <p className="mt-4 text-gray-600 text-sm">비즈니스 환경 중심 강남구에 위치한 E-biz는 사업 1번지인 강남구에 위치해있습니다. 강남구에서 가장 저렴하고 합리적인 가격으로 운영하겠습니다.</p>
              
              {/* 소셜 미디어 아이콘 */}
              <div className="flex gap-3 mt-6">
                <a 
                  href="https://instagram.com/bh768768?igshid=YmMyMTA2M2Y=" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-50 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <img 
                    src="/instagram-icon.png" 
                    alt="Instagram" 
                    className="w-5 h-5" 
                  />
                </a>
                <a 
                  href="https://www.facebook.com/profile.php?id=100086997880340" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-50 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <img 
                    src="/facebook-icon.png" 
                    alt="Facebook" 
                    className="w-5 h-5" 
                  />
                </a>
                <a 
                  href="https://open.kakao.com/o/grmmDSAh" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-50 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <img 
                    src="/kakao-icon.png" 
                    alt="KakaoTalk" 
                    className="w-5 h-5" 
                  />
                </a>
                <a 
                  href="https://blog.naver.com/ebiz-office" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-50 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <img 
                    src="/naverblog-icon.png" 
                    alt="Blog" 
                    className="w-5 h-5" 
                  />
                </a>
              </div>
            </div>
            
            <div className="col-span-4">
              <h4 className="font-medium text-gray-900 mb-4">연락처 정보</h4>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Phone className="w-4 h-4 mt-0.5 mr-2 text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="text-gray-800 text-sm">010-6276-8768</p>
                    <p className="text-gray-600 text-sm">02-544-8768</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="w-4 h-4 mt-0.5 mr-2 text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="text-gray-800 text-sm">bh101092@daum.net</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 mt-0.5 mr-2 text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="text-gray-800 text-sm">서울특별시 강남구 논현동 86-5 4층</p>
                    <a 
                      href="https://map.naver.com/v5/search/서울특별시%20강남구%20논현동%2086-5" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 text-xs flex items-center mt-1 hover:underline"
                    >
                      <span>지도에서 보기</span>
                      <ExternalLink size={12} className="ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-span-4">
              <h4 className="font-medium text-gray-900 mb-4">회사 정보</h4>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Building2 className="w-4 h-4 mt-0.5 mr-2 text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="text-gray-800 text-sm">계좌번호</p>
                    <p className="text-gray-600 text-sm">국민은행 924501-01-393200</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Ban className="w-4 h-4 mt-0.5 mr-2 text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="text-gray-800 text-sm">사업자번호</p>
                    <p className="text-gray-600 text-sm">629-21-01668</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapIcon className="w-4 h-4 mt-0.5 mr-2 text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="text-gray-800 text-sm">통신판매업 신고번호</p>
                    <p className="text-gray-600 text-sm">제2022-서울강남-04160호</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-100 mt-12 pt-6 flex flex-wrap justify-between items-center">
            <p className="text-xs text-gray-500">© {currentYear} E-Biz Office. All Rights Reserved.</p>
            <p className="text-xs text-gray-500">Designed by Taejun Han</p>
          </div>
        </div>
      </div>
    </footer>
  );
}