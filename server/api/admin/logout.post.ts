import { clearAdminSession } from '~/server/utils/admin-session'

export default defineEventHandler((event) => {
  clearAdminSession(event)

  return {
    authenticated: false,
  }
})
