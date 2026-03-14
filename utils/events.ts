import type { Event } from '~/lib/types'

function pad(value: number) {
  return String(value).padStart(2, '0')
}

export function parseEventDate(date: string) {
  const [year, month, day] = date.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function getEventDateTime(event: Event) {
  const baseDate = parseEventDate(event.date)
  const [hour = 0, minute = 0] = (event.time ?? '')
    .split(':')
    .map((part) => Number(part))

  return new Date(
    baseDate.getFullYear(),
    baseDate.getMonth(),
    baseDate.getDate(),
    hour,
    minute,
  )
}

export function isSameCalendarDay(left: Date, right: Date) {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  )
}

export function formatEventDate(value: string | Date) {
  const date = typeof value === 'string' ? parseEventDate(value) : value

  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export function formatShortEventDate(value: string | Date) {
  const date = typeof value === 'string' ? parseEventDate(value) : value

  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}

export function formatEventTime(time: string | null | undefined) {
  if (!time) {
    return 'N/A'
  }

  const [hour = '00', minute = '00'] = time.split(':')
  return `${pad(Number(hour))}:${pad(Number(minute))}`
}

export function isTodayEvent(event: Event) {
  return isSameCalendarDay(parseEventDate(event.date), new Date())
}

export function isUpcomingEvent(event: Event) {
  const eventDate = parseEventDate(event.date)
  const today = new Date()
  return eventDate >= new Date(today.getFullYear(), today.getMonth(), today.getDate())
}

export function isPastEvent(event: Event) {
  return !isUpcomingEvent(event)
}

export function sortEventsAscending(events: Event[]) {
  return [...events].sort(
    (left, right) => getEventDateTime(left).getTime() - getEventDateTime(right).getTime(),
  )
}

export function sortEventsDescending(events: Event[]) {
  return [...events].sort(
    (left, right) => getEventDateTime(right).getTime() - getEventDateTime(left).getTime(),
  )
}

