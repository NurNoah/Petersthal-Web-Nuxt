<script setup lang="ts">
import { createError } from '#app'
import { clubs } from '~/src/lib/data'
import type { Event } from '~/src/lib/types'
import {
  isPastEvent,
  isUpcomingEvent,
  sortEventsAscending,
  sortEventsDescending,
} from '~/utils/events'

const route = useRoute()
const slug = String(route.params.slug)
const club = clubs.find((entry) => entry.slug === slug)

if (!club) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Verein nicht gefunden.',
  })
}

useSeoMeta({
  title: club.name,
  description: `Informationen ueber ${club.name} in Petersthal.`,
})

const { data } = await useFetch('/api/events', {
  default: () => [],
  query: {
    clubSlug: slug,
  },
})

const upcomingEvents = computed(() =>
  sortEventsAscending((data.value as Event[]).filter((entry) => isUpcomingEvent(entry))),
)

const pastEvents = computed(() =>
  sortEventsDescending((data.value as Event[]).filter((entry) => isPastEvent(entry))),
)
</script>

<template>
  <div class="container page">
    <section class="two-column">
      <div class="form-stack">
        <img :alt="`Bild von ${club.name}`" :src="club.imageUrl" class="card image-cover" style="height: 420px;">
        <section class="panel">
          <h1 class="section-title">{{ club.name }}</h1>
          <p class="lead" style="margin-top: 1rem;">
            {{ club.description }}
          </p>
        </section>

        <section v-if="upcomingEvents.length" class="form-stack">
          <h2 class="section-title">Kommende Veranstaltungen</h2>
          <EventCard
            v-for="event in upcomingEvents"
            :key="event.id"
            :event="event"
            :show-club-link="false"
          />
        </section>

        <section v-if="pastEvents.length">
          <details class="details">
            <summary>Vergangene Veranstaltungen</summary>
            <div class="details-content form-stack">
              <EventCard
                v-for="event in pastEvents"
                :key="event.id"
                :event="event"
                :show-club-link="false"
              />
            </div>
          </details>
        </section>
      </div>

      <aside class="panel form-stack">
        <h2 class="card-title">Kontakt</h2>
        <div class="form-stack">
          <p v-if="club.contact.name">{{ club.contact.name }}</p>
          <p v-if="club.contact.address" class="muted" style="white-space: pre-line;">
            {{ club.contact.address }}
          </p>
          <a v-if="club.contact.email" :href="`mailto:${club.contact.email}`" class="button-ghost">
            {{ club.contact.email }}
          </a>
          <a v-if="club.contact.phone" :href="`tel:${club.contact.phone.replace(/\s/g, '')}`" class="button-ghost">
            {{ club.contact.phone }}
          </a>
          <a
            v-if="club.contact.website"
            :href="club.contact.website"
            class="button"
            rel="noopener noreferrer"
            target="_blank"
          >
            Webseite besuchen
          </a>
          <a
            v-if="club.contact.instagram"
            :href="`https://instagram.com/${club.contact.instagram}`"
            class="button-secondary"
            rel="noopener noreferrer"
            target="_blank"
          >
            @{{ club.contact.instagram }}
          </a>
        </div>
      </aside>
    </section>
  </div>
</template>
