import { useEffect, useState } from 'react'
import { getApiUrl, normalizeCollection } from '../api.js'

export default function Leaderboard() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    fetch(getApiUrl('/api/leaderboard/'), { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load leaderboard (${response.status})`)
        }

        return response.json()
      })
      .then((payload) => setItems(normalizeCollection(payload)))
      .catch((fetchError) => {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message)
        }
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [])

  return (
    <section className="page-shell">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h2 className="h4 mb-1">Leaderboard</h2>
          <p className="text-muted mb-0">Rankings across the training community</p>
        </div>
        <span className="badge badge-soft rounded-pill px-3 py-2">{items.length} entries</span>
      </div>

      {loading ? (
        <div className="alert alert-info mb-0">Loading leaderboard…</div>
      ) : error ? (
        <div className="alert alert-danger mb-0">{error}</div>
      ) : (
        <div className="card card-table border-0">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {items.map((entry) => (
                <tr key={entry._id ?? `${entry.user}-${entry.rank}`}>
                  <td>#{entry.rank}</td>
                  <td>{entry.user}</td>
                  <td>{entry.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
