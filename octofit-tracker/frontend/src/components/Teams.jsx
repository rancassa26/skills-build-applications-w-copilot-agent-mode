import { useEffect, useState } from 'react'
import { getApiUrl, normalizeCollection } from '../api.js'

export default function Teams() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    fetch(getApiUrl('/api/teams/'), { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load teams (${response.status})`)
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
          <h2 className="h4 mb-1">Teams</h2>
          <p className="text-muted mb-0">Groups by training focus and goals</p>
        </div>
        <span className="badge badge-soft rounded-pill px-3 py-2">{items.length} teams</span>
      </div>

      {loading ? (
        <div className="alert alert-info mb-0">Loading teams…</div>
      ) : error ? (
        <div className="alert alert-danger mb-0">{error}</div>
      ) : (
        <div className="card card-table border-0">
          <table className="table table-striped mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Members</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {items.map((team) => (
                <tr key={team._id ?? team.name}>
                  <td>{team.name}</td>
                  <td>{Array.isArray(team.members) ? team.members.length : 0}</td>
                  <td>{team.description || 'No description yet'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
