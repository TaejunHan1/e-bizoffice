// app/api/send-sms/route.ts
import { SolapiMessageService } from 'solapi';
import fs from 'fs';
import path from 'path';

const messageService = new SolapiMessageService(
  process.env.SOLAPI_API_KEY!,
  process.env.SOLAPI_API_SECRET!
);

// 메시지 발송 횟수를 추적하기 위한 Map
const messageCounts = new Map<string, { count: number; date: string }>();

// 로그 파일 경로 
const LOG_FILE = path.join(process.cwd(), 'sms-logs.json');

// 로그 데이터 읽기
function readLogs() {
  try {
    if (fs.existsSync(LOG_FILE)) {
      const data = fs.readFileSync(LOG_FILE, 'utf8');
      return JSON.parse(data);
    }
    return {};
  } catch (error) {
    console.error('Error reading logs:', error);
    return {};
  }
}

// 로그 데이터 쓰기
function writeLogs(logs: any) {
  try {
    fs.writeFileSync(LOG_FILE, JSON.stringify(logs, null, 2));
  } catch (error) {
    console.error('Error writing logs:', error);
  }
}

export async function POST(request: Request) {
  try {
    const { phone, name, inquiry, adminPhone } = await request.json();

    if (!adminPhone) {
      return new Response(JSON.stringify({
        error: '수신자 번호가 필요합니다.'
      }), { status: 400 });
    }

    // 현재 날짜 (서울 시간 기준)
    const seoulTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' });
    const today = new Date(seoulTime).toISOString().split('T')[0];

    // 메모리 Map에서 발송 횟수 확인
    const memoryCount = messageCounts.get(phone);
    
    if (memoryCount && memoryCount.date === today) {
      if (memoryCount.count >= 1) {  // 1회로 제한
        return new Response(JSON.stringify({
          error: '하루에 한 번만 문의 가능합니다.'
        }), { status: 429 });
      }
      memoryCount.count += 1;
    } else {
      messageCounts.set(phone, { count: 1, date: today });
    }

    // 파일 시스템에서도 발송 횟수 확인
    const logs = readLogs();
    if (!logs[today]) {
      logs[today] = {};
    }

    const fileCount = logs[today][phone] || 0;
    if (fileCount >= 1) {  // 1회로 제한
      return new Response(JSON.stringify({
        error: '하루에 한 번만 문의 가능합니다.'
      }), { status: 429 });
    }

    // 문자 메시지 내용 구성
    const messageText = `
[이비즈 문의]
이름: ${name}
연락처: ${phone}
문의내용: ${inquiry}
    `.trim();

    // SMS 발송
    const message = {
      to: adminPhone,
      from: process.env.SOLAPI_SENDER_PHONE_NUMBER,
      text: messageText,
    };

    await messageService.send(message);

    // 발송 횟수 업데이트 (파일)
    logs[today][phone] = fileCount + 1;
    writeLogs(logs);

    // 오래된 로그 정리 (7일 이상 된 로그 삭제)
    const oldDate = new Date();
    oldDate.setDate(oldDate.getDate() - 7);
    Object.keys(logs).forEach(date => {
      if (new Date(date) < oldDate) {
        delete logs[date];
      }
    });
    writeLogs(logs);

    return new Response(JSON.stringify({
      message: '문의가 성공적으로 전송되었습니다.'
    }), { status: 200 });

  } catch (error) {
    console.error('Failed to send SMS:', error);
    return new Response(JSON.stringify({
      error: '문자 전송에 실패했습니다.'
    }), { status: 500 });
  }
}