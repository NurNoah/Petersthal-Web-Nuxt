<script setup lang="ts">
import { clubs } from '~/src/lib/data'
import type { Event } from '~/src/lib/types'
import {
  formatEventDate,
  formatEventTime,
  isPastEvent,
  isTodayEvent,
} from '~/utils/events'

const props = withDefaults(
  defineProps<{
    event: Event
    showClubLink?: boolean
  }>(),
  {
    showClubLink: true,
  },
)

const club = computed(() =>
  clubs.find((entry) => entry.slug === props.event.organizer_club_slug),
)

const isToday = computed(() => isTodayEvent(props.event))
const isPast = computed(() => isPastEvent(props.event))
</script>

<template>
  <article class="card" :style="{ opacity: isPast ? '0.78' : '1' }">
    <div class="card-body form-stack">
      <div class="form-stack">
        <div class="button-row" style="justify-content: space-between;">
          <h3 class="card-title">
            {{ event.title }}
          </h3>
          <NuxtLink
            v-if="club && showClubLink"
            class="button-secondary"
            :to="`/vereine/${club.slug}`"
          >
            {{ club.name }}
          </NuxtLink>
        </div>

        <div class="tag-list">
          <span class="tag" :class="{ today: isToday }">
            {{ formatEventDate(event.date) }}
          </span>
          <span class="tag">
            {{ formatEventTime(event.time) }} Uhr
          </span>
          <span class="tag">
            {{ event.location }}
          </span>
        </div>
      </div>

      <p v-if="event.description" class="card-subtitle">
        {{ event.description }}
      </p>
    </div>
  </article>
</template>
