import { useEffect, useState } from 'react'
import { getApiUrl, normalizeCollection } from '../api.js'

export default function Workouts() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    fetch(getApiUrl('/api/workouts/'), { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load workouts (${response.status})`)
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
          <h2 className="h4 mb-1">Workouts</h2>
          <p className="text-muted mb-0">Planned sessions and exercise types</p>
        </div>
        <span className="badge badge-soft rounded-pill px-3 py-2">{items.length} plans</span>
      </div>

      {loading ? (
        <div className="alert alert-info mb-0">Loading workouts…</div>
      ) : error ? (
        <div className="alert alert-danger mb-0">{error}</div>
      ) : (
        <div className="card card-table border-0">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {items.map((workout) => (
                <tr key={workout._id ?? workout.name}>
                  <td>{workout.name}</td>
                  <td>{workout.type}</td>
                  <td>{workout.duration} min</td>
                  <td>{workout.difficulty || 'medium'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
