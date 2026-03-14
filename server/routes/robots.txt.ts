import { setResponseHeader } from 'h3'

export default defineEventHandler((event) => {
  setResponseHeader(event, 'content-type', 'text/plain; charset=utf-8')

  return [
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin',
    'Sitemap: https://www.petersthal.info/sitemap.xml',
  ].join('\n')
})
