const apiBase = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000'

export const endpoints = [
  '/api/activities/',
  '/api/leaderboard/',
  '/api/teams/',
  '/api/users/',
  '/api/workouts/',
].map((path) => `${apiBase}${path}`)

export function getApiUrl(resourcePath) {
  return `${apiBase}${resourcePath}`
}

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  if (Array.isArray(payload?.items)) {
    return payload.items
  }

  return []
}

export { apiBase }
