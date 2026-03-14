<template>
  <footer class="site-footer">
    <div class="container site-footer__inner">
      <p class="muted">
        © {{ new Date().getFullYear() }} Petersthal
      </p>

      <div class="site-footer__links">
        <a class="button-ghost" href="http://www.archiv-petersthal.de" rel="noopener noreferrer" target="_blank">
          Dorfarchive
        </a>
        <a class="button-ghost" href="http://www.rottachsee.info" rel="noopener noreferrer" target="_blank">
          Rottachsee
        </a>
        <a class="button-ghost" href="mailto:infomoodpic@gmail.com">
          Kontakt
        </a>
        <NuxtLink class="button" to="/admin/login">
          Admin
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>
