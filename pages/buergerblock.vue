<script setup lang="ts">
import { candidates } from '~/src/lib/data'

useSeoMeta({
  title: 'Buergerblock',
  description:
    'Vorstellung der Kandidatinnen und Kandidaten des Buergerblocks Petersthal.',
})
</script>

<template>
  <div class="container page">
    <section class="section-intro">
      <h1>Buergerblock Petersthal</h1>
      <p>
        Lernen Sie die Kandidatinnen und Kandidaten fuer die Gemeinderatswahl
        kennen.
      </p>
      <div class="button-row" style="justify-content: center; margin-top: 1.2rem;">
        <a
          class="button"
          href="https://www.buergerblockpetersthal.de/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Zur offiziellen Webseite
        </a>
      </div>
    </section>

    <section class="section">
      <div class="card-grid four">
        <a
          v-for="candidate in candidates"
          :key="candidate.id"
          :href="`https://www.buergerblockpetersthal.de/kandidaten/${candidate.id}`"
          class="card candidate-card"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            :alt="`${candidate.vorname} ${candidate.nachname}`"
            :src="candidate.portraitUrl"
          >
          <div class="card-body form-stack">
            <div class="tag-list">
              <span class="tag">Platz {{ candidate.listennummer }}</span>
            </div>
            <h2 class="card-title">
              {{ candidate.vorname }} {{ candidate.nachname }}
            </h2>
            <p class="card-subtitle">{{ candidate.beruf }}</p>
            <p v-if="candidate.kurzerText && candidate.kurzerText !== '/'" class="muted">
              "{{ candidate.kurzerText }}"
            </p>
            <div v-if="candidate.themen.length" class="tag-list">
              <span
                v-for="topic in candidate.themen"
                :key="topic"
                class="tag"
              >
                {{ topic }}
              </span>
            </div>
          </div>
        </a>
      </div>
    </section>
  </div>
</template>
