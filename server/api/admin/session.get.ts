import { requireAdminSession } from '~/server/utils/admin-session'

export default defineEventHandler((event) => {
  requireAdminSession(event)

  return {
    authenticated: true,
  }
})
