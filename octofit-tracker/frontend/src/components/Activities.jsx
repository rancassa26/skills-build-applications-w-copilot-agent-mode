import { useEffect, useState } from 'react'
import { getApiUrl, normalizeCollection } from '../api.js'

export default function Activities() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    fetch(getApiUrl('/api/activities/'), { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load activities (${response.status})`)
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
          <h2 className="h4 mb-1">Activities</h2>
          <p className="text-muted mb-0">Recent movement and training data</p>
        </div>
        <span className="badge badge-soft rounded-pill px-3 py-2">{items.length} records</span>
      </div>

      {loading ? (
        <div className="alert alert-info mb-0">Loading activities…</div>
      ) : error ? (
        <div className="alert alert-danger mb-0">{error}</div>
      ) : (
        <div className="card card-table border-0">
          <table className="table table-striped mb-0">
            <thead>
              <tr>
                <th>Type</th>
                <th>User</th>
                <th>Duration</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {items.map((activity) => (
                <tr key={activity._id ?? `${activity.type}-${activity.date}`}>
                  <td>{activity.type}</td>
                  <td>{activity.user}</td>
                  <td>{activity.duration} min</td>
                  <td>{activity.calories ?? 0}</td>
                  <td>{new Date(activity.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
