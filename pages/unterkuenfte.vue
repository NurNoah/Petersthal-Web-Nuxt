<script setup lang="ts">
import { accommodations } from '~/lib/data'

useSeoMeta({
  title: 'Unterkuenfte',
  description: 'Ferienwohnungen und Unterkuenfte in Petersthal entdecken.',
})
</script>

<template>
  <div class="container page">
    <section class="section-intro">
      <h1>Unterkuenfte in Petersthal</h1>
      <p>
        Gemuetliche Ferienwohnungen, Apartments und Gastgeber in Seennaehe.
      </p>
    </section>

    <section class="section">
      <div class="card-grid three">
        <InfoCard
          v-for="acc in accommodations"
          :key="acc.id"
          :description="acc.description"
          :image-alt="`Bild von ${acc.name}`"
          :image-url="acc.imageUrl"
          :title="acc.name"
        >
          <div class="form-stack">
            <div class="tag-list">
              <span class="tag">{{ acc.type }}</span>
              <span v-if="acc.price" class="tag">{{ acc.price }}</span>
            </div>

            <div v-if="acc.features?.length" class="tag-list">
              <span
                v-for="feature in acc.features"
                :key="feature"
                class="tag"
              >
                {{ feature }}
              </span>
            </div>

            <a
              v-if="acc.bookingUrl"
              :href="acc.bookingUrl"
              class="button"
              rel="noopener noreferrer"
              target="_blank"
            >
              Jetzt buchen
            </a>
          </div>
        </InfoCard>
      </div>
    </section>
  </div>
</template>
