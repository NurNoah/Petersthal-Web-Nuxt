import { createError } from 'h3'
import type { Event } from '~/src/lib/types'
import { requireAdminSession } from '~/server/utils/admin-session'
import { getAdminSupabaseClient } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  requireAdminSession(event)

  const { data, error } = await getAdminSupabaseClient(event)
    .from('events')
    .select('*')
    .order('date', { ascending: false })
    .order('time', { ascending: false })

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    })
  }

  return (data ?? []) as Event[]
})
