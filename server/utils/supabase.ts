import { createClient } from '@supabase/supabase-js'
import { createError } from 'h3'
import type { H3Event } from 'h3'
import { useRuntimeConfig } from '#imports'

function readConfig(event: H3Event) {
  const config = useRuntimeConfig(event)

  if (!config.supabaseUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'SUPABASE_URL ist nicht gesetzt.',
    })
  }

  return config
}

export function getPublicSupabaseClient(event: H3Event) {
  const config = readConfig(event)
  const key = config.supabaseAnonKey || config.supabaseServiceRoleKey

  if (!key) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Kein Supabase-Key fuer serverseitige Lesezugriffe gesetzt.',
    })
  }

  return createClient(config.supabaseUrl, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

export function getAdminSupabaseClient(event: H3Event) {
  const config = readConfig(event)

  if (!config.supabaseServiceRoleKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'SUPABASE_SERVICE_ROLE_KEY ist nicht gesetzt.',
    })
  }

  return createClient(config.supabaseUrl, config.supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}
