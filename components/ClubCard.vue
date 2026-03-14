<script setup lang="ts">
import type { Club } from '~/lib/types'

defineProps<{
  club: Club
}>()
</script>

<template>
  <article class="card">
    <img :alt="`Bild von ${club.name}`" :src="club.imageUrl" class="image-cover" style="height: 220px;">
    <div class="card-body form-stack">
      <h3 class="card-title">
        {{ club.name }}
      </h3>
      <p class="card-subtitle">
        {{ club.description.slice(0, 130) }}...
      </p>
      <NuxtLink class="button" :to="`/vereine/${club.slug}`">
        Mehr erfahren
      </NuxtLink>
    </div>
  </article>
</template>
