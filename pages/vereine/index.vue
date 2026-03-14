<script setup lang="ts">
import { clubs } from '~/src/lib/data'

useSeoMeta({
  title: 'Vereine',
  description: 'Das Vereinsleben in Petersthal auf einen Blick.',
})
</script>

<template>
  <div class="container page">
    <section class="section-intro">
      <h1>Das Vereinsleben in Petersthal</h1>
      <p>
        Unsere Vereine tragen das Dorf mit Musik, Sport, Brauchtum und
        Gemeinschaft.
      </p>
    </section>

    <section class="section">
      <div class="club-grid">
        <ClubCard
          v-for="club in clubs"
          :key="club.id"
          :club="club"
        />
      </div>
    </section>
  </div>
</template>
