// components/Location.tsx
import { 
    PhoneCall, 
    Clock, 
    Building, 
    FileText, 
    MapPin, 
    GraduationCap
  } from 'lucide-react';
  import Link from 'next/link';
  
  export default function Location() {
    return (
      <div className="bg-[#f5f0eb] py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Main Address */}
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">서울특별시 강남구 논현동 86-5 4층</h2>
          </div>
  
          {/* SNS Icons */}
          <div className="flex justify-center flex-wrap gap-6 mb-16">
            <a href="https://instagram.com/bh768768?igshid=YmMyMTA2M2Y="  className="hover:opacity-80">
              <img src="/instagram-icon.png" alt="Instagram" className="w-12 h-12" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100086997880340" className="hover:opacity-80">
              <img src="/facebook-icon.png" alt="Facebook" className="w-12 h-12" />
            </a>
            <a href="http://qr.kakao.com/talk/EY07kCmUR97NBwRFunG2rZqczmw-"  className="hover:opacity-80">
              <img src="/kakao-icon.png" alt="KakaoTalk" className="w-12 h-12" />
            </a>
            <a href="https://blog.naver.com/ebiz-office"  className="hover:opacity-80">
              <img src="/naverblog-icon.png" alt="Blog" className="w-12 h-12" />
            </a>
          </div>
  
          {/* Two Horizontal Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img 
                src="/shareoffice6.jpg" 
                alt="Office Location 1" 
                className="w-full h-[300px] object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img 
                src="/shareoffice7.jpg" 
                alt="Office Location 2" 
                className="w-full h-[300px] object-cover"
              />
            </div>
          </div>
  
          {/* Address Details */}
          <div className="text-center mb-16">
            <h3 className="text-xl font-bold mb-2">Address</h3>
            <p className="text-sm text-gray-500 italic">Please Enjoy the Atmosphere</p>
          </div>
  
          {/* Map Image */}
          <div className="flex justify-center mb-16">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/shareoffice8.png" 
                alt="Location Map" 
                className="w-full h-auto"
              />
            </div>
          </div>
  
          {/* Contact Information with Icons */}
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex items-start space-x-4">
              <PhoneCall size={24} className="text-pink-500 flex-shrink-0 mt-1" />
              <div>
                <p>02-544-8768</p>
                <p>010-6276-8768</p>
                <p className="text-gray-500">(스마트폰에서 여기를 누르시면 바로 전화연결 가능)</p>
              </div>
            </div>
  
            <div className="flex items-start space-x-4">
              <Clock size={24} className="text-pink-500 flex-shrink-0 mt-1" />
              <div>
                <p>무료와이파이, 무료주차</p>
              </div>
            </div>
  
            <div className="flex items-start space-x-4">
              <Building size={24} className="text-pink-500 flex-shrink-0 mt-1" />
              <div>
                <p>상호명 : 이비즈</p>
                <p>대표자 : 김보영</p>
                <p>사업자번호 : 629-21-01668</p>
                <p>이메일 : bh101092@daum.net</p>
              </div>
            </div>
  
            <div className="flex items-start space-x-4">
              <FileText size={24} className="text-pink-500 flex-shrink-0 mt-1" />
              <div>
                <p>예 금 주 : 김보영(이비즈)</p>
                <p>입 금 은 행 : 국민은행</p>
                <p>계 좌 번 호 : 924501-01-393200</p>
              </div>
            </div>
  
            <div className="flex items-start space-x-4">
              <GraduationCap size={24} className="text-pink-500 flex-shrink-0 mt-1" />
              <div>
                <p>통신판매업 : 제2022-서울강남-04160호</p>
                <p className="text-gray-500">신고번호</p>
              </div>
            </div>
  
            <div className="flex items-start space-x-4 pt-8 border-t">
              <MapPin size={24} className="text-pink-500 flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm">13, Nonhyeon-ro 132-gil, Gangnam-gu, Seoul, Republic of Korea 4floor , Seoul, Korea</p>
                <p className="text-sm">Tel. 010-6276-8768  |  Fax. 02-544-8769 |  bh101092@daum.net</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  