<script setup lang="ts">
useSeoMeta({
  title: 'Admin Login',
  description: 'Geschuetzter Login fuer den Admin-Bereich.',
})

const headers = import.meta.server ? useRequestHeaders(['cookie']) : undefined

try {
  await $fetch('/api/admin/session', {
    credentials: 'include',
    headers,
  })
  await navigateTo('/admin')
} catch {
  // not logged in
}

const password = ref('')
const loading = ref(false)
const errorMessage = ref('')
const showPassword = ref(false)

async function login() {
  errorMessage.value = ''
  loading.value = true

  try {
    await $fetch('/api/admin/login', {
      body: { password: password.value },
      credentials: 'include',
      method: 'POST',
    })

    await navigateTo('/admin')
  } catch (error) {
    errorMessage.value =
      error instanceof Error ? error.message : 'Anmeldung fehlgeschlagen.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="container page">
    <section class="section-intro">
      <h1>Admin-Bereich</h1>
      <p>Bitte Passwort eingeben, um Veranstaltungen zu verwalten.</p>
    </section>

    <section class="section" style="max-width: 440px; margin-left: auto; margin-right: auto;">
      <form class="panel form-stack" @submit.prevent="login">
        <div class="field">
          <label for="admin-password">Passwort</label>
          <input
            id="admin-password"
            v-model="password"
            class="input"
            :type="showPassword ? 'text' : 'password'"
          >
        </div>

        <button
          class="button-ghost"
          type="button"
          @click="showPassword = !showPassword"
        >
          {{ showPassword ? 'Passwort verbergen' : 'Passwort anzeigen' }}
        </button>

        <p v-if="errorMessage" class="status-message error">
          {{ errorMessage }}
        </p>

        <button class="button" :disabled="loading" type="submit">
          {{ loading ? 'Anmeldung laeuft...' : 'Anmelden' }}
        </button>
      </form>
    </section>
  </div>
</template>
