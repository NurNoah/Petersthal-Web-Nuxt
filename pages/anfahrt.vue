<script setup lang="ts">
import { busConnections } from '~/lib/data'

useSeoMeta({
  title: 'Anfahrt',
  description: 'Anfahrt, Busfahrplaene und Haltestellen fuer Petersthal.',
})
</script>

<template>
  <div class="container page">
    <section class="section-intro">
      <h1>Anfahrt und Busverbindungen</h1>
      <p>
        So findest du den Weg nach Petersthal, inklusive Uebersicht zu Linien und
        Haltestellen.
      </p>
    </section>

    <section class="section">
      <iframe
        class="map-frame"
        height="420"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2688.5173735191183!2d10.383165876701055!3d47.635512135980065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479c7d111d1678b7%3A0xa1e48b04cf72010!2s87466%20Oy-Mittelberg-Petersthal!5e0!3m2!1sde!2sde!4v1758146173184!5m2!1sde!2sde"
      ></iframe>
    </section>

    <section class="section">
      <h2 class="section-title">Busfahrplaene</h2>
      <div class="form-stack" style="margin-top: 1rem;">
        <details
          v-for="connection in busConnections"
          :key="connection.direction"
          class="details"
        >
          <summary>{{ connection.direction }}</summary>
          <div class="details-content form-stack">
            <article
              v-for="route in connection.routes"
              :key="route.line"
              class="panel"
            >
              <h3 class="card-title">{{ route.line }}</h3>
              <p v-if="route.note" class="card-subtitle">{{ route.note }}</p>
              <table class="table" style="margin-top: 1rem;">
                <thead>
                  <tr>
                    <th>Verkehrstage</th>
                    <th>Abfahrtszeiten</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="schedule in route.schedules"
                    :key="`${route.line}-${schedule.days}`"
                  >
                    <td>{{ schedule.days }}</td>
                    <td>
                      <div class="tag-list">
                        <span
                          v-for="time in schedule.times"
                          :key="time"
                          class="tag"
                        >
                          {{ time }}
                        </span>
                      </div>
                      <p v-if="schedule.note" class="muted" style="margin-top: 0.65rem;">
                        {{ schedule.note }}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </article>
          </div>
        </details>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">Bushaltestellen</h2>
      <div class="two-column" style="margin-top: 1rem;">
        <section class="panel">
          <h3 class="card-title">Petersthal Ortsmitte</h3>
          <iframe
            class="embed-frame"
            height="300"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2688.4986520151565!2d10.387887000000006!3d47.635876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479c7d1116c1d7f5%3A0x2778ffdd5f58de93!2sPetersthal%2C%20Ortsmitte!5e0!3m2!1sde!2sde!4v1758310587219!5m2!1sde!2sde"
          ></iframe>
        </section>

        <section class="panel">
          <h3 class="card-title">Petersthal Kirche</h3>
          <iframe
            class="embed-frame"
            height="300"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2687.251078404166!2d10.385418999999994!3d47.634856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479c7d11851f5a6d%3A0x64984efd1259d5a0!2sParkplatz!5e0!3m2!1sde!2sde!4v1758310642314!5m2!1sde!2sde"
          ></iframe>
        </section>
      </div>
    </section>
  </div>
</template>
