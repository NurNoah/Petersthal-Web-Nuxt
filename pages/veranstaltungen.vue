<script setup lang="ts">
import type { Event } from '~/lib/types'
import {
  isPastEvent,
  isUpcomingEvent,
  parseEventDate,
  sortEventsAscending,
  sortEventsDescending,
} from '~/utils/events'

useSeoMeta({
  title: 'Veranstaltungen',
  description: 'Alle Veranstaltungen in Petersthal auf einen Blick.',
})

const { data } = await useFetch('/api/events', {
  default: () => [],
})

const selectedDate = ref(new Date().toISOString().slice(0, 10))

const upcomingEvents = computed(() =>
  sortEventsAscending((data.value as Event[]).filter((entry) => isUpcomingEvent(entry))),
)

const pastEvents = computed(() =>
  sortEventsDescending((data.value as Event[]).filter((entry) => isPastEvent(entry))),
)

const selectedEvents = computed(() =>
  sortEventsAscending(
    (data.value as Event[]).filter((entry) =>
      selectedDate.value
        ? entry.date === selectedDate.value
        : false,
    ),
  ),
)

const highlightedDates = computed(() =>
  Array.from(new Set((data.value as Event[]).map((entry) => entry.date))),
)
</script>

<template>
  <div class="container page">
    <section class="section-intro">
      <h1>Veranstaltungen in Petersthal</h1>
      <p>
        Kommende Termine, vergangene Veranstaltungen und eine schnelle Tagesauswahl
        fuer alles, was im Dorf passiert.
      </p>
    </section>

    <section class="section split-grid">
      <div class="form-stack">
        <h2 class="section-title">Kommende Veranstaltungen</h2>
        <div v-if="upcomingEvents.length" class="form-stack">
          <EventCard
            v-for="event in upcomingEvents"
            :key="event.id"
            :event="event"
          />
        </div>
        <div v-else class="empty-state">
          Derzeit sind keine bevorstehenden Veranstaltungen geplant.
        </div>
      </div>

      <aside class="form-stack">
        <section class="panel">
          <h2 class="card-title">Nach Datum suchen</h2>
          <p class="card-subtitle">
            Waehle einen Tag und pruefe direkt, welche Termine stattfinden.
          </p>
          <div class="field" style="margin-top: 1rem;">
            <label for="event-date-filter">Datum</label>
            <input
              id="event-date-filter"
              v-model="selectedDate"
              class="input"
              type="date"
            >
          </div>
          <div class="tag-list" style="margin-top: 1rem;">
            <span
              v-for="date in highlightedDates.slice(0, 6)"
              :key="date"
              class="tag"
            >
              {{ parseEventDate(date).toLocaleDateString('de-DE') }}
            </span>
          </div>
        </section>

        <section class="panel">
          <h2 class="card-title">Veranstaltungen am gewaehlten Tag</h2>
          <div v-if="selectedEvents.length" class="form-stack" style="margin-top: 1rem;">
            <EventCard
              v-for="event in selectedEvents"
              :key="event.id"
              :event="event"
            />
          </div>
          <div v-else class="empty-state" style="margin-top: 1rem;">
            Keine Veranstaltungen an diesem Tag.
          </div>
        </section>
      </aside>
    </section>

    <section v-if="pastEvents.length" class="section">
      <details class="details">
        <summary>Vergangene Veranstaltungen</summary>
        <div class="details-content">
          <div class="form-stack">
            <EventCard
              v-for="event in pastEvents"
              :key="event.id"
              :event="event"
            />
          </div>
        </div>
      </details>
    </section>
  </div>
</template>
