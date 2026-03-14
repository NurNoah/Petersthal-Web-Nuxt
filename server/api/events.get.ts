import { createError, getQuery } from 'h3'
import type { Event } from '~/src/lib/types'
import { getPublicSupabaseClient } from '~/server/utils/supabase'
import { isUpcomingEvent } from '~/utils/events'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const clubSlug =
    typeof query.clubSlug === 'string' && query.clubSlug.length > 0
      ? query.clubSlug
      : undefined
  const limit =
    typeof query.limit === 'string' && query.limit.length > 0
      ? Number(query.limit)
      : undefined
  const upcomingOnly = query.upcoming === 'true'

  let request = getPublicSupabaseClient(event)
    .from('events')
    .select('*')
    .order('date', { ascending: true })
    .order('time', { ascending: true })

  if (clubSlug) {
    request = request.eq('organizer_club_slug', clubSlug)
  }

  const { data, error } = await request

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    })
  }

  let events = (data ?? []) as Event[]

  if (upcomingOnly) {
    events = events.filter((entry) => isUpcomingEvent(entry))
  }

  if (typeof limit === 'number' && Number.isFinite(limit)) {
    events = events.slice(0, limit)
  }

  return events
})
