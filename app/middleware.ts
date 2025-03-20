import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// IP별 접속 기록을 저장할 맵
const ipRecords = new Map<string, {
  count: number;          // 일일 접속 횟수
  lastDay: number;        // 마지막 접속 일자
  lastAccess: number;     // 마지막 접속 시간
  rapidAccessCount: number; // 빠른 연속 접속 횟수
  blockedUntil: number;   // 차단 해제 시간
}>()

// 차단된 IP 목록 (영구 차단)
const blockedIPs = new Set<string>()

// 봇 패턴 감지
const BOT_PATTERNS = [
  /bot/i, /spider/i, /crawler/i,     // 일반적인 봇
  /selenium/i, /puppeteer/i,         // 자동화 도구
  /postman/i, /insomnia/i,          // API 도구
  /wget/i, /curl/i, /python/i,       // 스크립팅 도구
  /headless/i, /phantomjs/i,         // 헤드리스 브라우저
  /apache/i, /httpclient/i,          // HTTP 클라이언트
  /;|\(|\)|'|"|\*|\\|\/usr\/bin/i   // 악성 문자열
]

// 허용된 Referer 도메인 목록
const ALLOWED_DOMAINS = [
  'e-bizoffice.com',
  'www.e-bizoffice.com',
  'naver.com',
  'google.com',
  'daum.net'
]

// 에러 응답 생성 함수
function createErrorResponse(message: string, status: number = 429) {
  return new NextResponse(
    `
    <!DOCTYPE html>
    <html>
      <head>
        <title>접근 제한</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 500px;
            margin: 0 auto;
            padding: 40px 20px;
            text-align: center;
          }
          .icon {
            font-size: 48px;
            margin-bottom: 20px;
          }
          h1 {
            margin-bottom: 16px;
            font-size: 24px;
            font-weight: 600;
          }
          p {
            margin-bottom: 24px;
            color: #666;
          }
          .card {
            background: white;
            border-radius: 12px;
            padding: 32px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="icon">⚠️</div>
          <h1>접근이 제한되었습니다</h1>
          <p>${message}</p>
        </div>
      </body>
    </html>
    `,
    {
      status,
      headers: {
        'Content-Type': 'text/html; charset=utf-8'
      }
    }
  )
}

// 봇 감지 함수
function isSuspiciousBot(request: NextRequest): boolean {
  const userAgent = request.headers.get('user-agent') || ''
  
  // User-Agent 검사
  if (BOT_PATTERNS.some(pattern => pattern.test(userAgent))) {
    return true
  }

  // 기본 브라우저 헤더 확인
  const accept = request.headers.get('accept')
  const acceptLanguage = request.headers.get('accept-language')
  if (!accept || !acceptLanguage) {
    return true
  }

  return false
}

// 비정상 요청 패턴 감지
function detectSuspiciousPattern(request: NextRequest): boolean {
  // Referer 체크
  const referer = request.headers.get('referer')
  if (referer) {
    try {
      const refererDomain = new URL(referer).hostname
      if (!ALLOWED_DOMAINS.some(domain => refererDomain.includes(domain))) {
        return true
      }
    } catch {
      return true
    }
  }

  // 이상한 쿼리 파라미터 체크
  const hasWeirdQuery = Array.from(request.nextUrl.searchParams.values()).some(
    value => /[<>{}()\\\/]/.test(value)
  )
  if (hasWeirdQuery) {
    return true
  }

  return false
}

export async function middleware(request: NextRequest) {
  // 메인 페이지가 아니면 통과
  if (request.nextUrl.pathname !== '/') {
    return NextResponse.next()
  }

  const forwardedFor = request.headers.get('x-forwarded-for')
  const ip = forwardedFor ? forwardedFor.split(',')[0] : request.headers.get('x-real-ip') || 'unknown'
  
  // 1. 영구 차단된 IP 체크
  if (blockedIPs.has(ip)) {
    return createErrorResponse('해당 IP는 비정상적인 접근으로 인해 영구 차단되었습니다.', 403)
  }

  // 2. 봇 체크
  if (isSuspiciousBot(request)) {
    blockedIPs.add(ip) // 봇으로 확인되면 영구 차단
    return createErrorResponse('자동화된 접근이 감지되었습니다.', 403)
  }

  // 3. 비정상 패턴 체크
  if (detectSuspiciousPattern(request)) {
    return createErrorResponse('비정상적인 접근이 감지되었습니다.', 400)
  }

  const now = Date.now()
  const today = Math.floor(now / (1000 * 60 * 60 * 24))

  // IP 기록 가져오기 또는 생성
  const record = ipRecords.get(ip) || {
    count: 0,
    lastDay: today,
    lastAccess: now,
    rapidAccessCount: 0,
    blockedUntil: 0
  }

  // 4. 임시 차단 체크
  if (record.blockedUntil > now) {
    const remainingMinutes = Math.ceil((record.blockedUntil - now) / 1000 / 60)
    return createErrorResponse(`과도한 접근으로 인해 임시 차단되었습니다. ${remainingMinutes}분 후에 다시 시도해주세요.`)
  }

  // 5. 새로운 날짜 체크
  if (record.lastDay !== today) {
    record.count = 0
    record.lastDay = today
    record.rapidAccessCount = 0
  }

  // 6. 빠른 연속 접속 체크 (2초 이내)
  const timeSinceLastAccess = now - record.lastAccess
  if (timeSinceLastAccess < 2000) {
    record.rapidAccessCount++
    if (record.rapidAccessCount >= 5) {
      record.blockedUntil = now + (30 * 60 * 1000) // 30분 차단
      ipRecords.set(ip, record)
      return createErrorResponse('과도하게 빠른 접속이 감지되어 30분간 차단되었습니다.')
    }
  } else {
    record.rapidAccessCount = 0
  }

  // 7. 일일 접속 제한 (3회) 체크
  if (record.count >= 3) {
    const remainingHours = 24 - new Date().getHours()
    return createErrorResponse(`일일 접속 횟수(3회)를 초과했습니다. ${remainingHours}시간 후에 다시 방문해주세요.`)
  }

  // 기록 업데이트
  record.count += 1
  record.lastAccess = now
  ipRecords.set(ip, record)

  // 로깅 (개발 환경에서만)
  if (process.env.NODE_ENV === 'development') {
    console.log(`
      IP: ${ip}
      접속 횟수: ${record.count}/3
      빠른 접속 횟수: ${record.rapidAccessCount}
      차단 상태: ${record.blockedUntil > now ? '차단됨' : '정상'}
    `)
  }

  // Cache-Control 설정
  const response = NextResponse.next()
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
  response.headers.set('Pragma', 'no-cache')
  response.headers.set('Expires', '0')

  return response
}

// 메인 페이지에만 적용
export const config = {
  matcher: '/'
}

// 24시간마다 차단 기록 정리 (메모리 관리)
setInterval(() => {
  const now = Date.now()
  for (const [ip, record] of ipRecords.entries()) {
    if (record.blockedUntil < now && record.lastAccess < now - (24 * 60 * 60 * 1000)) {
      ipRecords.delete(ip)
    }
  }
}, 60 * 60 * 1000) // 1시간마다 실행