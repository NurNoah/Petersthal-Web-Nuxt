export default defineEventHandler(async () => {
  try {
    const response = await $fetch<{
      current_weather?: {
        temperature: number
        weathercode: number
      }
    }>(
      'https://api.open-meteo.com/v1/forecast?latitude=47.45&longitude=10.1167&current_weather=true&timezone=Europe/Berlin',
    )

    return response.current_weather ?? null
  } catch {
    return null
  }
})
