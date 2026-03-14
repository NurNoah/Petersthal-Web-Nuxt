import { createError, readBody } from 'h3'
import { z } from 'zod'
import { requireAdminSession } from '~/server/utils/admin-session'
import { getAdminSupabaseClient } from '~/server/utils/supabase'

const eventSchema = z.object({
  eventDate: z.string().min(1, 'Datum ist erforderlich.'),
  eventDescription: z.string().optional(),
  eventLocation: z.string().min(1, 'Ort ist erforderlich.'),
  eventName: z.string().min(1, 'Eventname ist erforderlich.'),
  eventTime: z.string().min(1, 'Uhrzeit ist erforderlich.'),
  organizerClubSlug: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  requireAdminSession(event)

  const payload = eventSchema.safeParse(await readBody(event))

  if (!payload.success) {
    throw createError({
      statusCode: 400,
      statusMessage: payload.error.issues.map((issue) => issue.message).join(' '),
    })
  }

  const { error } = await getAdminSupabaseClient(event).from('events').insert([
    {
      title: payload.data.eventName,
      date: payload.data.eventDate,
      time: payload.data.eventTime,
      location: payload.data.eventLocation,
      description: payload.data.eventDescription,
      organizer_club_slug:
        payload.data.organizerClubSlug === 'none'
          ? null
          : payload.data.organizerClubSlug || null,
    },
  ])

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
