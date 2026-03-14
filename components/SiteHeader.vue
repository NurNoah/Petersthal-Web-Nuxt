<script setup lang="ts">
import { clubs } from '~/src/lib/data'

const route = useRoute()
const mobileOpen = ref(false)

const navLinks = [
  { href: '/veranstaltungen', label: 'Veranstaltungen' },
  { href: '/gastronomie', label: 'Gastro' },
  { href: '/unterkuenfte', label: 'Unterkuenfte' },
  { href: '/anfahrt', label: 'Anfahrt' },
]

watch(
  () => route.path,
  () => {
    mobileOpen.value = false
  },
)

function isActive(href: string) {
  if (href === '/vereine') {
    return route.path.startsWith('/vereine')
  }

  return route.path === href
}
</script>

<template>
  <header class="site-header">
    <div class="container site-header__inner">
      <NuxtLink class="brand" to="/">
        <img src="/images/pthalLogo.png" alt="Petersthal Logo">
        <span>Petersthal</span>
      </NuxtLink>

      <nav class="desktop-nav" aria-label="Hauptnavigation">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.href"
          class="nav-link"
          :class="{ active: isActive(link.href) }"
          :to="link.href"
        >
          {{ link.label }}
        </NuxtLink>

        <div class="nav-dropdown">
          <details>
            <summary class="nav-link" :class="{ active: isActive('/vereine') }">
              Vereine
            </summary>
            <div class="nav-dropdown__menu">
              <NuxtLink to="/vereine">
                Alle Vereine
              </NuxtLink>
              <NuxtLink
                v-for="club in clubs"
                :key="club.slug"
                :to="`/vereine/${club.slug}`"
              >
                {{ club.name }}
              </NuxtLink>
            </div>
          </details>
        </div>
      </nav>

      <button
        class="button-ghost mobile-toggle"
        type="button"
        @click="mobileOpen = !mobileOpen"
      >
        {{ mobileOpen ? 'Schliessen' : 'Menue' }}
      </button>
    </div>

    <div class="container mobile-nav" :class="{ open: mobileOpen }">
      <div class="mobile-nav__panel">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.href"
          class="nav-link"
          :class="{ active: isActive(link.href) }"
          :to="link.href"
        >
          {{ link.label }}
        </NuxtLink>

        <details class="details">
          <summary>Vereine</summary>
          <div class="details-content">
            <div class="form-stack">
              <NuxtLink class="nav-link" to="/vereine">
                Alle Vereine
              </NuxtLink>
              <NuxtLink
                v-for="club in clubs"
                :key="club.slug"
                class="nav-link"
                :to="`/vereine/${club.slug}`"
              >
                {{ club.name }}
              </NuxtLink>
            </div>
          </div>
        </details>
      </div>
    </div>
  </header>
</template>
