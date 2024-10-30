// components/Footer.tsx
import { MapPin, Phone, Mail, Building2, Ban, MapIcon } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Building2 className="mr-2" />
              E-Biz Office
            </h3>
            <p className="mb-2">© 2022 made by Taejun Han</p>
            <p className="text-gray-300">© Copyright 2022 Space Dynamic Co. All Rights Reserved</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <Phone className="mr-3 text-blue-400" />
              <p>[연락처] 010-6276-8768 [대표번호] 02-544-8768</p>
            </div>
            <div className="flex items-center">
              <Mail className="mr-3 text-blue-400" />
              <p>[이메일] bh101092@daum.net</p>
            </div>
            <div className="flex items-center">
              <Building2 className="mr-3 text-blue-400" />
              <p>[계좌번호] 국민은행 924501-01-393200</p>
            </div>
            <div className="flex items-center">
              <Ban className="mr-3 text-blue-400" />
              <p>[사업자번호]: 629-21-01668</p>
            </div>
            <div className="flex items-center">
              <MapIcon className="mr-3 text-blue-400" />
              <p>[통신판매업 신고번호] - 제2022-서울강남-04160호</p>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-3 text-blue-400" />
              <p>Seoul, Korea</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}