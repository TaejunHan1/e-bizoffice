import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// IP별 접속 기록을 저장할 맵
const ipRecords = new Map<string, {
  count: number;          // 일일 접속 횟수
  lastDay: number;        // 마지막 접속 일자
  lastAccess: number;     // 마지막 접속 시간
  consecutiveCount: number; // 연속 접속 횟수
  suspiciousAttempts: number; // 의심스러운 시도 횟수
}>()

// 차단된 IP 목록
const blockedIPs = new Set<string>()

// 의심스러운 패턴 감지를 위한 상수
const SUSPICIOUS_PATTERNS = {
  MIN_REQUEST_INTERVAL: 1000,    // 최소 요청 간격 (1초)
  MAX_CONSECUTIVE_REQUESTS: 5,   // 최대 연속 요청 수
  CONSECUTIVE_WINDOW: 10000,     // 연속 요청 체크 윈도우 (10초)
  DAILY_LIMIT: 3,               // 일일 접속 제한
  BLOCK_DURATION: 24 * 60 * 60 * 1000, // IP 차단 지속 시간 (24시간)
}

// 의심스러운 User-Agent 패턴
const SUSPICIOUS_UA_PATTERNS = [
  /bot/i, /crawler/i, /spider/i, /headless/i,
  /selenium/i, /puppeteer/i, /chrome-lighthouse/i,
  /wget/i, /curl/i, /postman/i, /insomnia/i,
  /python-requests/i, /java/i, /go-http-client/i,
  /apache-httpclient/i, /\(\)/i, /empty/i, /null/i
]

// HTTP 응답 생성 헬퍼 함수
function createErrorResponse(message: string, status: number = 429) {
  return new NextResponse(JSON.stringify({ error: message }), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
}

// 봇 탐지 함수
function isSuspiciousUserAgent(userAgent: string): boolean {
  if (!userAgent || userAgent.length < 10) return true
  return SUSPICIOUS_UA_PATTERNS.some(pattern => pattern.test(userAgent))
}

// 요청 헤더 검증 함수
function hasInvalidHeaders(request: NextRequest): boolean {
  const acceptLanguage = request.headers.get('accept-language')
  const accept = request.headers.get('accept')
  
  // 기본적인 브라우저 헤더가 없는 경우
  if (!acceptLanguage || !accept) return true
  
  // 비정상적인 Referer나 Origin
  const referer = request.headers.get('referer')
  const origin = request.headers.get('origin')
  if (referer && !referer.includes('ebiz-office.com')) return true
  if (origin && !origin.includes('ebiz-office.com')) return true

  return false
}

export async function middleware(request: NextRequest) {
  // IP 주소 가져오기
  const forwardedFor = request.headers.get('x-forwarded-for')
  const ip = forwardedFor ? forwardedFor.split(',')[0] : request.headers.get('x-real-ip') || 'unknown'
  
  // 1. 이미 차단된 IP 체크
  if (blockedIPs.has(ip)) {
    return createErrorResponse('접근이 차단되었습니다. 24시간 후에 다시 시도해주세요.')
  }

  // 2. User-Agent 체크
  const userAgent = request.headers.get('user-agent') || ''
  if (isSuspiciousUserAgent(userAgent)) {
    blockedIPs.add(ip)
    return createErrorResponse('비정상적인 접근이 감지되었습니다.', 403)
  }

  // 3. 헤더 검증
  if (hasInvalidHeaders(request)) {
    return createErrorResponse('잘못된 요청입니다.', 400)
  }

  const now = Date.now()
  const today = Math.floor(now / (1000 * 60 * 60 * 24))

  // IP 기록 가져오기 또는 생성
  const record = ipRecords.get(ip) || {
    count: 0,
    lastDay: today,
    lastAccess: now,
    consecutiveCount: 0,
    suspiciousAttempts: 0
  }

  // 4. 새로운 날짜 체크 및 카운트 리셋
  if (record.lastDay !== today) {
    record.count = 0
    record.lastDay = today
    record.suspiciousAttempts = 0
  }

  // 5. 빠른 연속 요청 체크
  const timeSinceLastAccess = now - record.lastAccess
  if (timeSinceLastAccess < SUSPICIOUS_PATTERNS.MIN_REQUEST_INTERVAL) {
    record.consecutiveCount++
    record.suspiciousAttempts++
    
    if (record.suspiciousAttempts >= 5) {
      blockedIPs.add(ip)
      return createErrorResponse('비정상적인 접근으로 인해 차단되었습니다.')
    }
    
    return createErrorResponse('너무 빠른 요청입니다. 잠시 후 다시 시도해주세요.')
  }

  // 6. 연속 요청 횟수 초기화 (시간 간격이 충분한 경우)
  if (timeSinceLastAccess > SUSPICIOUS_PATTERNS.CONSECUTIVE_WINDOW) {
    record.consecutiveCount = 0
  }

  // 7. 일일 접속 제한 체크
  if (record.count >= SUSPICIOUS_PATTERNS.DAILY_LIMIT) {
    return createErrorResponse('일일 접속 한도를 초과했습니다. 내일 다시 시도해주세요.')
  }

  // 8. 기록 업데이트
  record.count += 1
  record.lastAccess = now
  ipRecords.set(ip, record)

  // 개발 환경에서만 로깅
  if (process.env.NODE_ENV === 'development') {
    console.log(`IP: ${ip}, Count: ${record.count}, Suspicious Attempts: ${record.suspiciousAttempts}`)
  }

  return NextResponse.next()
}

// 정적 파일을 제외한 모든 경로에 미들웨어 적용
export const config = {
  matcher: [
    '/((?!_next/static|favicon.ico|images|.*\\.).*)',
    '/api/:path*'
  ]
}

// 24시간마다 차단된 IP 목록 초기화
setInterval(() => {
  blockedIPs.clear()
}, SUSPICIOUS_PATTERNS.BLOCK_DURATION)