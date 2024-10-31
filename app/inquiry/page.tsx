// app/inquiry/page.tsx
"use client";

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ServiceInquiry() {
 const [formData, setFormData] = useState({
   name: '',
   phone: '',
   inquiry: '',
   adminPhone: '010-6276-8768'
 });

 const [isSubmitting, setIsSubmitting] = useState(false);
 const [submitMessage, setSubmitMessage] = useState('');

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
     <div className="pt-[88px] bg-gray-50">
       <div className="max-w-7xl mx-auto px-4 py-12">
         <div className="flex flex-col md:flex-row gap-8">
           {/* 왼쪽 이미지 섹션 */}
           <div className="md:w-1/2 space-y-6 flex flex-col justify-start">
             <img 
               src="/price.jpg" 
               alt="Price Information 1"
               className="w-full rounded-lg shadow-lg"
             />
             <img 
               src="/price4.jpg" 
               alt="Price Information 3"
               className="w-full rounded-lg shadow-lg"
             />
             <img 
               src="/price2.gif" 
               alt="Price Information 2"
               className="w-full rounded-lg shadow-lg"
             />
           </div>

           {/* 오른쪽 정보 섹션 */}
           <div className="md:w-1/2">
             <div className="bg-white p-8 rounded-lg shadow-lg sticky top-24">
               <h2 className="text-2xl font-bold mb-6">방법문의</h2>

               <div className="space-y-6">
                 <div>
                   <h4 className="font-bold text-gray-700">[Address]</h4>
                   <p className="text-gray-600">서울특별시 강남구 논현동 86-5 4 층</p>
                 </div>

                 <div>
                   <h4 className="font-bold text-gray-700">[Phone / Tel] 핸드폰 / 사무실 전화번호</h4>
                   <p className="text-gray-600">Phone : +82 010-6276-8768</p>
                   <p className="text-gray-600">Tel : +82 (02) 544-8768</p>
                 </div>

                 <div>
                   <h4 className="font-bold text-gray-700">[E-mail] 이메일</h4>
                   <p className="text-gray-600">Email : bh101092@daum.net</p>
                 </div>

                 <div>
                   <h4 className="font-bold text-gray-700">[Account] 계좌번호</h4>
                   <p className="text-gray-600">Account Number : (국민은행)924501-01-393200</p>
                 </div>
               </div>

               {/* 문의 폼 */}
               <div className="mt-8 pt-8 border-t border-gray-200">
                 <h3 className="text-xl font-bold mb-6">문의하기</h3>
                 <form onSubmit={handleFormSubmit} className="space-y-4">
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">
                       이름
                     </label>
                     <input
                       type="text"
                       value={formData.name}
                       onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
                       required
                     />
                   </div>

                   <button
                     type="submit"
                     disabled={isSubmitting}
                     className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow transition-colors"
                   >
                     {isSubmitting ? '전송중...' : '문의하기'}
                   </button>

                   {submitMessage && (
                     <div className={`mt-4 p-4 rounded-lg ${
                       submitMessage.includes('실패') 
                         ? 'bg-red-50 text-red-600' 
                         : 'bg-green-50 text-green-600'
                     }`}>
                       {submitMessage}
                     </div>
                   )}
                 </form>
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