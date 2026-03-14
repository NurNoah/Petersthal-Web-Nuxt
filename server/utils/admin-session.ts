import {
  createHmac,
  randomUUID,
  timingSafeEqual,
} from 'node:crypto'
import {
  createError,
  deleteCookie,
  getCookie,
  setCookie,
} from 'h3'
import type { H3Event } from 'h3'
import { useRuntimeConfig } from '#imports'

const COOKIE_NAME = 'admin-session'
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7

interface AdminSessionPayload {
  exp: number
  nonce: string
  sub: 'admin'
}

function getSessionSecret(event: H3Event) {
  const config = useRuntimeConfig(event)
  const secret = config.adminSessionSecret || config.adminPassword

  if (!secret) {
    throw createError({
      statusCode: 500,
      statusMessage:
        'ADMIN_SESSION_SECRET oder ADMIN_PASSWORD muss gesetzt sein.',
    })
  }

  return secret
}

function encodePayload(payload: AdminSessionPayload) {
  return Buffer.from(JSON.stringify(payload)).toString('base64url')
}

function decodePayload(value: string) {
  try {
    return JSON.parse(Buffer.from(value, 'base64url').toString('utf8')) as AdminSessionPayload
  } catch {
    return null
  }
}

function signPayload(value: string, secret: string) {
  return createHmac('sha256', secret).update(value).digest('base64url')
}

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)

  if (leftBuffer.length !== rightBuffer.length) {
    return false
  }

  return timingSafeEqual(leftBuffer, rightBuffer)
}

export function hasValidAdminSession(event: H3Event) {
  const token = getCookie(event, COOKIE_NAME)

  if (!token) {
    return false
  }

  const [payloadValue, providedSignature] = token.split('.')

  if (!payloadValue || !providedSignature) {
    return false
  }

  const payload = decodePayload(payloadValue)

  if (!payload || payload.sub !== 'admin' || payload.exp < Date.now()) {
    return false
  }

  const expectedSignature = signPayload(payloadValue, getSessionSecret(event))
  return safeCompare(expectedSignature, providedSignature)
}

export function requireAdminSession(event: H3Event) {
  if (!hasValidAdminSession(event)) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Nicht autorisiert.',
    })
  }
}

export function issueAdminSession(event: H3Event) {
  const expiresAt = Date.now() + SESSION_TTL_SECONDS * 1000
  const payloadValue = encodePayload({
    exp: expiresAt,
    nonce: randomUUID(),
    sub: 'admin',
  })
  const signature = signPayload(payloadValue, getSessionSecret(event))

  setCookie(event, COOKIE_NAME, `${payloadValue}.${signature}`, {
    httpOnly: true,
    maxAge: SESSION_TTL_SECONDS,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })

  return expiresAt
}

export function clearAdminSession(event: H3Event) {
  deleteCookie(event, COOKIE_NAME, {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })
}
