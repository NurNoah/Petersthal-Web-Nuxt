export default defineNuxtRouteMiddleware(async () => {
  const headers = import.meta.server ? useRequestHeaders(['cookie']) : undefined

  try {
    await $fetch('/api/admin/session', {
      credentials: 'include',
      headers,
    })
  } catch {
    return navigateTo('/admin/login')
  }
})
