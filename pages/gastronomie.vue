<script setup lang="ts">
import { restaurants } from '~/src/lib/data'

useSeoMeta({
  title: 'Gastronomie',
  description: 'Gastronomische Angebote und Einkehrmoeglichkeiten in Petersthal.',
})
</script>

<template>
  <div class="container page">
    <section class="section-intro">
      <h1>Gastro in Petersthal</h1>
      <p>
        Kulinarische Stopps fuer Urlaub, Ausflug und den Feierabend am See.
      </p>
    </section>

    <section class="section">
      <div class="form-stack">
        <article
          v-for="restaurant in restaurants"
          :key="restaurant.id"
          class="card"
        >
          <div class="two-column">
            <img
              :alt="`Bild von ${restaurant.name}`"
              :src="restaurant.imageUrl"
              class="image-cover"
              style="min-height: 320px;"
            >

            <div class="card-body form-stack">
              <div>
                <h2 class="card-title">{{ restaurant.name }}</h2>
                <p class="card-subtitle">{{ restaurant.description }}</p>
              </div>

              <p class="muted">{{ restaurant.address }}</p>

              <div class="button-row">
                <a
                  v-if="restaurant.website"
                  :href="restaurant.website"
                  class="button"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Zur Webseite
                </a>
              </div>

              <details v-if="restaurant.mapEmbed" class="details">
                <summary>Karte anzeigen</summary>
                <div class="details-content">
                  <iframe
                    :src="restaurant.mapEmbed"
                    class="embed-frame"
                    height="320"
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </details>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>
