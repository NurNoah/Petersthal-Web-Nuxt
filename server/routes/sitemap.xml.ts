import { setResponseHeader } from 'h3'
import { clubs } from '~/lib/data'

export default defineEventHandler((event) => {
  const lastModified = new Date().toISOString()
  const urls = [
    '',
    '/veranstaltungen',
    '/gastronomie',
    '/unterkuenfte',
    '/anfahrt',
    '/vereine',
    '/buergerblock',
    ...clubs.map((club) => `/vereine/${club.slug}`),
  ]

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (path) => `  <url>
    <loc>https://www.petersthal.info${path}</loc>
    <lastmod>${lastModified}</lastmod>
  </url>`,
  )
  .join('\n')}
</urlset>`

  setResponseHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return body
})
