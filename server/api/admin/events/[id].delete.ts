import { createError, getRouterParam } from 'h3'
import { requireAdminSession } from '~/server/utils/admin-session'
import { getAdminSupabaseClient } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  requireAdminSession(event)

  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Event-ID fehlt.',
    })
  }

  const { error } = await getAdminSupabaseClient(event)
    .from('events')
    .delete()
    .eq('id', id)

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    })
  }

  return {
    ok: true,
  }
})
