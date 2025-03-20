"use client";

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Phone, Mail, Building, MapPin, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

export default function ServiceInquiry() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    inquiry: '',
    adminPhone: '010-6276-8768'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* 왼쪽 이미지 섹션 */}
            <div className="md:w-1/2 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <h2 className="text-lg font-medium text-gray-900 mb-4">가격 안내</h2>
                <div className="space-y-4">
                  <img 
                    src="/price.jpg" 
                    alt="Price Information 1"
                    className="w-full rounded-xl"
                  />
                  <img 
                    src="/price4.jpg" 
                    alt="Price Information 3"
                    className="w-full rounded-xl"
                  />
                  <img 
                    src="/price2.gif" 
                    alt="Price Information 2"
                    className="w-full rounded-xl"
                  />
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                  <p className="text-blue-800 text-sm">
                    E-Biz 오피스는 강남 지역에서 가장 합리적인 가격으로 고품질 공유 오피스 서비스를 제공합니다.
                  </p>
                </div>
              </div>
            </div>

            {/* 오른쪽 정보 섹션 */}
            <div className="md:w-1/2">
              <div className="bg-white p-8 rounded-2xl shadow-sm mb-6">
                <h1 className="text-2xl font-bold mb-6 text-blue-600">문의하기</h1>

                <div className="space-y-5 mb-8">
                  <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <MapPin className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">주소</p>
                      <p className="text-gray-600">서울특별시 강남구 논현동 86-5 4층</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <Phone className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">연락처</p>
                      <p className="text-gray-600">Phone: 010-6276-8768</p>
                      <p className="text-gray-600">Tel: 02-544-8768</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <Mail className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">이메일</p>
                      <p className="text-gray-600">bh101092@daum.net</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <Building className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">계좌번호</p>
                      <p className="text-gray-600">(국민은행) 924501-01-393200</p>
                    </div>
                  </div>
                </div>

                {/* 문의 폼 */}
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      이름
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="이름을 입력해주세요"
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
                      className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="010-0000-0000"
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
                      className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                      style={{ minHeight: '8rem' }}
                      placeholder="문의하실 내용을 입력해주세요"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-xl shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <Loader2 className="animate-spin h-5 w-5 mr-2" />
                        전송중...
                      </span>
                    ) : '문의하기'}
                  </button>

                  {submitStatus && (
                    <div className={`mt-4 p-4 rounded-xl flex items-start ${
                      submitStatus === 'success' 
                        ? 'bg-green-50 text-green-800' 
                        : 'bg-red-50 text-red-800'
                    }`}>
                      {submitStatus === 'success' ? (
                        <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                      )}
                      <p className="text-sm">{submitMessage}</p>
                    </div>
                  )}
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                  <p>문의하신 내용은 확인 후 순차적으로 연락드리겠습니다.</p>
                  <p className="mt-1">급하신 경우 <span className="font-bold">010-6276-8768</span>로 전화 문의 부탁드립니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}