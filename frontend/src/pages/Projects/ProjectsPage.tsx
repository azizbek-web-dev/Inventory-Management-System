import { useMemo, useState } from 'react'
import downloadIcon from '../../assets/icons/download.svg'
import { Topbar } from '../../components/Topbar/Topbar'
import { PROJECTS, type ProjectSummary } from './projectData'

type ProjectsPageProps = {
  onOpenProject: (project: ProjectSummary) => void
}

function downloadProjectsCsv(rows: ProjectSummary[]) {
  const esc = (s: string) => `"${String(s).replace(/"/g, '""')}"`
  const header = ['Code', 'Client', 'Detail title', 'Progress']
  const body = rows.map((r) =>
    [r.code, r.client, r.detailTitle, String(r.progress)].map(esc).join(','),
  )
  const csv = [header.join(','), ...body].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'projects.csv'
  a.click()
  URL.revokeObjectURL(url)
}

export function ProjectsPage({ onOpenProject }: ProjectsPageProps) {
  const [search, setSearch] = useState('')
  const [pageSize, setPageSize] = useState(6)
  const [pageIndex, setPageIndex] = useState(0)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return PROJECTS
    return PROJECTS.filter(
      (p) =>
        p.code.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q) ||
        p.detailTitle.toLowerCase().includes(q),
    )
  }, [search])

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const safePage = Math.min(pageIndex, pageCount - 1)
  const sliceStart = safePage * pageSize
  const pageRows = filtered.slice(sliceStart, sliceStart + pageSize)
  const fromN = filtered.length ? sliceStart + 1 : 0
  const toN = sliceStart + pageRows.length

  return (
    <>
      <Topbar title="All Items" subtitle="Items detail Information" />

      <section className="items-card" aria-label="Projects">
        <div className="items-toolbar">
          <label className="items-search" aria-label="Search projects">
            <input
              className="items-search-input"
              placeholder="Search Item"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPageIndex(0)
              }}
            />
          </label>

          <div className="items-actions">
            <button
              type="button"
              className="items-btn items-btn--primary"
              onClick={() => downloadProjectsCsv(filtered)}
            >
              <img className="items-btn-icon" src={downloadIcon} alt="" aria-hidden="true" />
              <span>Export</span>
            </button>
          </div>
        </div>

        <div className="project-grid-wrap">
          <div className="project-grid">
            {pageRows.map((p) => (
              <button
                key={p.id}
                type="button"
                className="project-card"
                onClick={() => onOpenProject(p)}
              >
                <div className="project-card-head">
                  <div className="project-card-line">
                    <span className="project-card-k">Project:</span>{' '}
                    <span className="project-card-code">{p.code}</span>
                  </div>
                  <div className="project-card-line">
                    <span className="project-card-k">Client:</span>{' '}
                    <span className="project-card-client">{p.client}</span>
                  </div>
                </div>

                <div className="project-card-team" aria-label="Team">
                  {p.members.map((m) => (
                    <div key={m.name} className="project-card-member">
                      <span className="project-card-avatar" aria-hidden="true">
                        {m.initials}
                      </span>
                      <div className="project-card-member-meta">
                        <span className="project-card-member-name">{m.name}</span>
                        <span className="project-card-member-role">{m.role}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="project-card-progress" aria-label={`Progress ${p.progress}%`}>
                  <span
                    className="project-card-progress-fill"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="items-footer" aria-label="Pagination">
          <div className="items-footer-left">
            <span className="items-muted">Showing</span>
            <select
              className="items-select"
              value={String(pageSize)}
              aria-label="Projects per page"
              onChange={(e) => {
                setPageSize(Number(e.target.value))
                setPageIndex(0)
              }}
            >
              <option value="6">6</option>
              <option value="9">9</option>
              <option value="12">12</option>
            </select>
          </div>

          <div className="items-footer-center">
            <div className="items-footer-progress" aria-hidden="true">
              <span
                className="items-footer-progress-fill"
                style={{
                  width: `${filtered.length ? Math.min(100, Math.round((toN / filtered.length) * 100)) : 0}%`,
                }}
              />
            </div>
            <div className="items-muted items-footer-summary">
              Showing {fromN} to {toN} out of {filtered.length} projects
            </div>
          </div>

          <div className="items-footer-right">
            <button
              className="items-page-btn"
              type="button"
              aria-label="Previous page"
              disabled={safePage <= 0}
              onClick={() => setPageIndex((i) => Math.max(0, i - 1))}
            >
              ‹
            </button>
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                className={i === safePage ? 'items-page is-active' : 'items-page'}
                onClick={() => setPageIndex(i)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="items-page-btn"
              type="button"
              aria-label="Next page"
              disabled={safePage >= pageCount - 1}
              onClick={() => setPageIndex((i) => Math.min(pageCount - 1, i + 1))}
            >
              ›
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
