# Petersthal Web

Nuxt 3 village portal for Petersthal.

## Setup

```bash
npm install
npm run dev
```

## Required environment variables

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`

The app also accepts `NEXT_PUBLIC_SUPABASE_URL` and
`NEXT_PUBLIC_SUPABASE_ANON_KEY` as fallbacks for existing deployments.

## Security notes

- Supabase requests now run through Nuxt server routes under `server/api`.
- The browser no longer talks to Supabase directly.
- Admin access uses a signed `admin-session` cookie.
- Every admin API route verifies the signed session server-side.

## Scripts

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run typecheck`
