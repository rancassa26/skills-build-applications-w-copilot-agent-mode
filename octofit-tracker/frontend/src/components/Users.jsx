import { useEffect, useState } from 'react'
import { getApiUrl, normalizeCollection } from '../api.js'

export default function Users() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    fetch(getApiUrl('/api/users/'), { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load users (${response.status})`)
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
          <h2 className="h4 mb-1">Users</h2>
          <p className="text-muted mb-0">Athletes and training profiles</p>
        </div>
        <span className="badge badge-soft rounded-pill px-3 py-2">{items.length} users</span>
      </div>

      {loading ? (
        <div className="alert alert-info mb-0">Loading users…</div>
      ) : error ? (
        <div className="alert alert-danger mb-0">{error}</div>
      ) : (
        <div className="card card-table border-0">
          <table className="table table-striped mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Fitness level</th>
              </tr>
            </thead>
            <tbody>
              {items.map((user) => (
                <tr key={user._id ?? user.username}>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.fitnessLevel || 'beginner'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
