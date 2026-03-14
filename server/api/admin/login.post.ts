import { createError, readBody } from 'h3'
import { z } from 'zod'
import { useRuntimeConfig } from '#imports'
import { issueAdminSession } from '~/server/utils/admin-session'

const loginSchema = z.object({
  password: z.string().min(1),
})

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  if (!config.adminPassword) {
    throw createError({
      statusCode: 500,
      statusMessage: 'ADMIN_PASSWORD ist nicht gesetzt.',
    })
  }

  const payload = loginSchema.safeParse(await readBody(event))

  if (!payload.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Ungueltige Eingabe.',
    })
  }

  if (payload.data.password !== config.adminPassword) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Falsches Passwort.',
    })
  }

  const expiresAt = issueAdminSession(event)

  return {
    authenticated: true,
    expiresAt,
  }
})
