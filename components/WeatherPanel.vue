<script setup lang="ts">
const weatherText: Record<number, string> = {
  0: 'Klarer Himmel',
  1: 'Leicht bewoelkt',
  2: 'Teilweise bewoelkt',
  3: 'Bedeckt',
  45: 'Nebelig',
  48: 'Nebelig',
  51: 'Nieselregen',
  53: 'Nieselregen',
  55: 'Nieselregen',
  61: 'Regen',
  63: 'Regen',
  65: 'Starker Regen',
  71: 'Schnee',
  73: 'Schnee',
  75: 'Starker Schneefall',
  80: 'Regenschauer',
  81: 'Regenschauer',
  82: 'Starke Regenschauer',
  95: 'Gewitter',
}

const { data, error } = await useFetch('/api/weather', {
  default: () => null,
})

const description = computed(() => {
  const code = data.value?.weathercode

  if (typeof code !== 'number') {
    return 'Wetterdaten derzeit nicht verfuegbar'
  }

  return weatherText[code] || 'Wetterdaten verfuegbar'
})
</script>

<template>
  <section class="panel accent-panel">
    <p class="muted" style="margin: 0;">
      Wetter in Petersthal
    </p>
    <div v-if="data && !error" class="form-stack" style="margin-top: 0.7rem;">
      <strong style="font-size: 2rem;">{{ Math.round(data.temperature) }}°C</strong>
      <span class="muted">{{ description }}</span>
    </div>
    <p v-else class="muted" style="margin-top: 0.7rem;">
      Konnte Wetterdaten nicht laden.
    </p>
  </section>
</template>
