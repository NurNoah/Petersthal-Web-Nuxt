<script setup lang="ts">
import { clubs } from '~/lib/data'
import type { Event } from '~/lib/types'
import { formatShortEventDate, formatEventTime } from '~/utils/events'

definePageMeta({
  middleware: 'admin',
})

useSeoMeta({
  title: 'Admin',
  description: 'Veranstaltungen im Admin-Bereich verwalten.',
})

const headers = import.meta.server ? useRequestHeaders(['cookie']) : undefined

const { data: events, refresh } = await useFetch('/api/admin/events', {
  credentials: 'include',
  default: () => [],
  headers,
})

const form = reactive({
  eventDate: '',
  eventDescription: '',
  eventLocation: '',
  eventName: '',
  eventTime: '',
  organizerClubSlug: 'none',
})

const submitting = ref(false)
const deletingId = ref('')
const message = ref('')
const messageType = ref<'success' | 'error'>('success')

function setMessage(type: 'success' | 'error', value: string) {
  message.value = value
  messageType.value = type
}

async function submitEvent() {
  submitting.value = true
  setMessage('success', '')

  try {
    await $fetch('/api/admin/events', {
      body: form,
      credentials: 'include',
      method: 'POST',
    })

    form.eventDate = ''
    form.eventDescription = ''
    form.eventLocation = ''
    form.eventName = ''
    form.eventTime = ''
    form.organizerClubSlug = 'none'

    setMessage('success', 'Veranstaltung erfolgreich gespeichert.')
    await refresh()
  } catch (error) {
    setMessage(
      'error',
      error instanceof Error ? error.message : 'Speichern fehlgeschlagen.',
    )
  } finally {
    submitting.value = false
  }
}

async function deleteEvent(eventId: string) {
  if (!window.confirm('Veranstaltung wirklich loeschen?')) {
    return
  }

  deletingId.value = eventId
  setMessage('success', '')

  try {
    await $fetch(`/api/admin/events/${eventId}`, {
      credentials: 'include',
      method: 'DELETE',
    })
    setMessage('success', 'Veranstaltung erfolgreich geloescht.')
    await refresh()
  } catch (error) {
    setMessage(
      'error',
      error instanceof Error ? error.message : 'Loeschen fehlgeschlagen.',
    )
  } finally {
    deletingId.value = ''
  }
}

async function logout() {
  await $fetch('/api/admin/logout', {
    credentials: 'include',
    method: 'POST',
  })
  await navigateTo('/admin/login')
}

const eventList = computed(() => events.value as Event[])
</script>

<template>
  <div class="container page">
    <section class="section-intro">
      <h1>Admin-Bereich</h1>
      <p>Veranstaltungen sicher serverseitig verwalten.</p>
      <div class="button-row" style="justify-content: center; margin-top: 1rem;">
        <button class="button-ghost" type="button" @click="logout">
          Abmelden
        </button>
      </div>
    </section>

    <section class="section split-grid">
      <form class="panel form-stack" @submit.prevent="submitEvent">
        <div>
          <h2 class="card-title">Neue Veranstaltung erstellen</h2>
          <p class="card-subtitle">
            Alle Schreibzugriffe laufen jetzt nur noch ueber die Nuxt-Server-API.
          </p>
        </div>

        <div class="field">
          <label for="event-name">Eventname</label>
          <input id="event-name" v-model="form.eventName" class="input" required>
        </div>

        <div class="form-grid">
          <div class="field">
            <label for="event-location">Ort</label>
            <input id="event-location" v-model="form.eventLocation" class="input" required>
          </div>

          <div class="field">
            <label for="event-club">Veranstalter</label>
            <select id="event-club" v-model="form.organizerClubSlug" class="select">
              <option value="none">Kein Verein</option>
              <option
                v-for="club in clubs"
                :key="club.slug"
                :value="club.slug"
              >
                {{ club.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="form-grid">
          <div class="field">
            <label for="event-date">Datum</label>
            <input id="event-date" v-model="form.eventDate" class="input" required type="date">
          </div>

          <div class="field">
            <label for="event-time">Uhrzeit</label>
            <input id="event-time" v-model="form.eventTime" class="input" required type="time">
          </div>
        </div>

        <div class="field">
          <label for="event-description">Beschreibung</label>
          <textarea id="event-description" v-model="form.eventDescription" class="textarea"></textarea>
        </div>

        <p v-if="message" class="status-message" :class="messageType">
          {{ message }}
        </p>

        <button class="button" :disabled="submitting" type="submit">
          {{ submitting ? 'Speichere...' : 'Veranstaltung speichern' }}
        </button>
      </form>

      <section class="panel form-stack">
        <div>
          <h2 class="card-title">Bestehende Veranstaltungen</h2>
          <p class="card-subtitle">
            Schreib- und Lesezugriffe fuer den Admin-Bereich sind durch eine
            signierte Session geschuetzt.
          </p>
        </div>

        <div v-if="eventList.length" class="form-stack">
          <article
            v-for="event in eventList"
            :key="event.id"
            class="card"
          >
            <div class="card-body form-stack">
              <div class="button-row" style="justify-content: space-between;">
                <div>
                  <h3 class="card-title">{{ event.title }}</h3>
                  <p class="card-subtitle">
                    {{ formatShortEventDate(event.date) }} um
                    {{ formatEventTime(event.time) }} Uhr
                  </p>
                </div>
                <button
                  class="button-danger"
                  :disabled="deletingId === event.id"
                  type="button"
                  @click="deleteEvent(event.id)"
                >
                  {{ deletingId === event.id ? 'Loesche...' : 'Loeschen' }}
                </button>
              </div>
              <div class="tag-list">
                <span class="tag">{{ event.location }}</span>
                <span v-if="event.organizer_club_slug" class="tag">
                  {{ clubs.find((club) => club.slug === event.organizer_club_slug)?.name }}
                </span>
              </div>
            </div>
          </article>
        </div>
        <div v-else class="empty-state">
          Keine Veranstaltungen gefunden.
        </div>
      </section>
    </section>
  </div>
</template>
