<script setup lang="ts">
import { clubs } from '~/lib/data'

useSeoMeta({
  title: 'Startseite',
  description:
    'Petersthal am Rottachsee: Veranstaltungen, Vereine und aktuelle Informationen aus dem Dorf.',
})

const galleryImages = [
  { src: '/images/pthal4.jpg', alt: 'Dorffest in Petersthal' },
  { src: '/images/pthal3.png', alt: 'Wanderwege rund um Petersthal' },
  { src: '/images/pthal10.jpg', alt: 'Musik und Vereinsleben' },
  { src: '/images/pthal5.png', alt: 'Bergblick am See' },
  { src: '/images/pthal7.jpg', alt: 'Freizeit am Rottachsee' },
  { src: '/images/pthal8.jpg', alt: 'Winterstimmung in Petersthal' },
]

const { data: upcomingEvents } = await useFetch('/api/events', {
  default: () => [],
  query: {
    limit: '3',
    upcoming: 'true',
  },
})

const featuredClubs = computed(() => clubs.slice(0, 6))
</script>

<template>
  <div>
    <section class="hero">
      <img alt="Panorama von Petersthal" src="/images/pthal15.png">
      <div class="hero-overlay">
        <div class="hero-content">
          <div class="eyebrow">
            Dorfportal am Rottachsee
          </div>
          <h1>Willkommen in Petersthal</h1>
          <p>
            Zwischen See, Bergen und einem starken Vereinsleben entsteht hier ein
            Ort, der Tradition und Gegenwart zusammenbringt.
          </p>
          <div class="button-row" style="justify-content: center; margin-top: 1.5rem;">
            <NuxtLink class="button" to="/veranstaltungen">
              Veranstaltungen ansehen
            </NuxtLink>
            <NuxtLink class="button-secondary" to="/vereine">
              Vereinsleben entdecken
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <div class="container page">
      <section class="section-intro">
        <h2>Ein Dorf mit Charakter</h2>
        <p>
          Petersthal liegt im oestlichen Oberallgaeu direkt am Rottachsee. Der Ort
          verbindet Natur, Tourismus und ein lebendiges Miteinander aus Vereinen,
          Veranstaltungen und Gastgebern.
        </p>
      </section>

      <section class="section">
        <GalleryLightbox :images="galleryImages" />
      </section>

      <section class="section split-grid">
        <div class="form-stack">
          <div class="button-row" style="justify-content: space-between;">
            <h2 class="section-title">Naechste Termine</h2>
            <NuxtLink class="button-secondary" to="/veranstaltungen">
              Alle Veranstaltungen
            </NuxtLink>
          </div>

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

        <div class="form-stack">
          <WeatherPanel />
          <section class="panel">
            <p class="muted" style="margin: 0 0 0.4rem;">
              Aktuell beliebt
            </p>
            <h3 class="card-title">Gastro und Ausflugsziele</h3>
            <p class="card-subtitle">
              Von Pizza bis Kiosk am See: Petersthal bietet kleine Orte fuer grosse
              Pausen.
            </p>
            <div class="button-row" style="margin-top: 1rem;">
              <NuxtLink class="button" to="/gastronomie">
                Zur Gastro
              </NuxtLink>
              <NuxtLink class="button-ghost" to="/unterkuenfte">
                Unterkuenfte
              </NuxtLink>
            </div>
          </section>
        </div>
      </section>

      <section class="section">
        <div class="section-intro">
          <h2>Unser Vereinsleben</h2>
          <p>
            Musik, Sport, Tradition und Gemeinschaft praegen Petersthal. Hier
            findest du die Vereine, die das Dorf lebendig machen.
          </p>
        </div>

        <div class="club-grid">
          <ClubCard
            v-for="club in featuredClubs"
            :key="club.id"
            :club="club"
          />
        </div>

        <div class="button-row" style="justify-content: center; margin-top: 1.75rem;">
          <NuxtLink class="button" to="/vereine">
            Alle Vereine entdecken
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>
