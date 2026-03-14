<script setup lang="ts">
defineProps<{
  description: string
  imageAlt: string
  imageUrl: string
  title: string
}>()
</script>

<template>
  <article class="card">
    <img :alt="imageAlt" :src="imageUrl" class="image-cover" style="height: 220px;">
    <div class="card-body form-stack">
      <h3 class="card-title">
        {{ title }}
      </h3>
      <p class="card-subtitle">
        {{ description }}
      </p>
      <slot />
    </div>
  </article>
</template>
