<script setup lang="ts">
interface GalleryImage {
  alt: string
  src: string
}

const props = defineProps<{
  images: GalleryImage[]
}>()

const openImage = ref<GalleryImage | null>(null)

function closeLightbox() {
  openImage.value = null
}

watchEffect((onCleanup) => {
  if (!openImage.value) {
    return
  }

  const handler = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeLightbox()
    }
  }

  window.addEventListener('keydown', handler)
  onCleanup(() => window.removeEventListener('keydown', handler))
})
</script>

<template>
  <div>
    <div class="gallery-grid">
      <button
        v-for="image in props.images"
        :key="image.src"
        class="gallery-card"
        type="button"
        @click="openImage = image"
      >
        <img :alt="image.alt" :src="image.src">
      </button>
    </div>

    <div
      v-if="openImage"
      class="lightbox"
      @click.self="closeLightbox"
    >
      <button class="button-ghost" type="button" @click="closeLightbox">
        Schliessen
      </button>
      <img :alt="openImage.alt" :src="openImage.src">
    </div>
  </div>
</template>
