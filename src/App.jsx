import { useState, useMemo, useCallback, useEffect, lazy, Suspense } from 'react'
import { COMMANDS_DATA } from './data/commands'
import { COMMAND_EXTRAS } from './data/commandExtras'
import { orderedCategorySummaries } from './data/categoryOrder'
import CommandListByLevel from './components/CommandListByLevel'
import CategoryHub from './components/CategoryHub'
import CategoryBreadcrumb from './components/CategoryBreadcrumb'
import Header from './components/Header'
import SidebarNav from './components/SidebarNav'
import SidebarToolTree from './components/SidebarToolTree'
import MainWorkspaceHeader from './components/MainWorkspaceHeader'
import MainLayout from './components/layout/MainLayout'
import Card from './components/ui/Card'
import ScriptingGuides from './components/ScriptingGuides'
import RoadmapFlow from './components/RoadmapFlow'

const CommandPanel = lazy(() => import('./components/CommandPanel'))

function toolLabel(t) {
  const labels = {
    git: 'Git',
    linux: 'Linux',
    nginx: 'Nginx',
    apache: 'Apache',
    haproxy: 'HAProxy',
    tomcat: 'Tomcat',
    postgresql: 'PostgreSQL',
    redis: 'Redis',
    aws: 'AWS',
    helm: 'Helm',
    'github-actions': 'GitHub Actions',
    kubernetes: 'Kubernetes',
    terraform: 'Terraform',
    docker: 'Docker',
    ansible: 'Ansible',
    prometheus: 'Prometheus',
    grafana: 'Grafana',
    maven: 'Maven',
    shell: 'Shell',
  }
  return labels[t] || t
}

function levelLabel(l) {
  const labels = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' }
  return labels[l] || l
}

const COUNT_TOOL_IDS = [
  'all',
  'git',
  'linux',
  'nginx',
  'apache',
  'haproxy',
  'tomcat',
  'postgresql',
  'redis',
  'aws',
  'helm',
  'github-actions',
  'kubernetes',
  'terraform',
  'docker',
  'ansible',
  'prometheus',
  'grafana',
  'maven',
  'shell',
]

function rowMatchesQuery(c, q) {
  if (!q) return true
  return [c.name, c.command, c.description, c.tool, c.level, c.category].some((s) => s && String(s).toLowerCase().includes(q))
}

export default function App() {
  const level = 'all'
  const [tool, setTool] = useState('all')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const [browseKey, setBrowseKey] = useState(null)
  const [preferredCategory, setPreferredCategory] = useState(null)
  const [workspaceMode, setWorkspaceMode] = useState('commands')

  useEffect(() => {
    setBrowseKey(null)
  }, [tool])

  useEffect(() => {
    if (workspaceMode !== 'commands') setSelected(null)
  }, [workspaceMode])

  const handleToolChange = useCallback(
    (nextTool) => {
      if (nextTool === tool && browseKey != null) {
        setBrowseKey(null)
        return
      }
      setPreferredCategory(null)
      setTool(nextTool)
    },
    [tool, browseKey]
  )

  const backToAllTools = useCallback(() => {
    setTool('all')
    setPreferredCategory(null)
    setBrowseKey(null)
  }, [])

  const handlePickCategoryFromHub = useCallback(({ tool: nextTool, category }) => {
    setWorkspaceMode('commands')
    setBrowseKey(null)
    setTool(nextTool)
    setPreferredCategory(category)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return COMMANDS_DATA.filter((c) => {
      const matchLevel = level === 'all' || c.level === level
      const matchTool = tool === 'all' || c.tool === tool
      if (!matchLevel || !matchTool) return false
      return rowMatchesQuery(c, q)
    })
  }, [tool, query])

  const toolCounts = useMemo(() => {
    const q = query.trim().toLowerCase()
    const base = COMMANDS_DATA.filter((c) => {
      const matchLevel = level === 'all' || c.level === level
      if (!matchLevel) return false
      return rowMatchesQuery(c, q)
    })
    const counts = { all: base.length }
    for (const id of COUNT_TOOL_IDS) {
      if (id === 'all') continue
      counts[id] = base.filter((c) => c.tool === id).length
    }
    return counts
  }, [query])

  const categorySummaries = useMemo(() => orderedCategorySummaries(filtered), [filtered])
  const hasCategoryBrowse = categorySummaries.length > 0

  const displayCommands = useMemo(() => {
    if (!browseKey) return filtered
    return filtered.filter((c) => c.tool === browseKey.tool && c.category === browseKey.category)
  }, [filtered, browseKey])

  const commandsByLevel = useMemo(() => {
    const groups = { beginner: [], intermediate: [], advanced: [] }
    displayCommands.forEach((c) => {
      if (groups[c.level]) groups[c.level].push(c)
    })
    return groups
  }, [displayCommands])

  const suggestedCommands = useMemo(() => {
    if (!selected) return []
    const ids = COMMAND_EXTRAS[selected.id]?.suggestedNext || []
    return ids.map((id) => COMMANDS_DATA.find((c) => c.id === id)).filter(Boolean)
  }, [selected?.id])

  const singleToolSidebarMode = tool !== 'all'

  const showCategoryHub = hasCategoryBrowse && browseKey === null && !singleToolSidebarMode

  const workspaceVisibleCount = singleToolSidebarMode
    ? filtered.length
    : showCategoryHub
      ? filtered.length
      : displayCommands.length

  const mainContentKey = `${level}-${tool}-${browseKey?.tool ?? ''}-${browseKey?.category ?? ''}`

  return (
    <MainLayout className="overflow-hidden">
      <a
        href="#main-content"
        className="skip-link"
        onClick={(e) => {
          const el = document.getElementById('main-content')
          if (!el) return
          e.preventDefault()
          el.focus({ preventScroll: true })
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }}
      >
        Skip to main content
      </a>
      <Header
        query={query}
        onQueryChange={setQuery}
        tool={tool}
        onToolChange={handleToolChange}
        toolCounts={toolCounts}
        toolLabel={toolLabel}
        visibleCommandCount={filtered.length}
        workspaceMode={workspaceMode}
        onWorkspaceModeChange={setWorkspaceMode}
      />

      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <aside
          className="hidden h-full min-h-0 w-[min(220px,30vw)] max-w-[260px] shrink-0 flex-col overflow-visible border-r border-[var(--hub-line)] bg-[var(--hub-sidebar)] md:flex"
          aria-label="Tools"
        >
          <div className="flex min-h-0 flex-1 flex-col overflow-visible py-2.5">
            <div
              className="mx-2 mb-2 grid shrink-0 grid-cols-3 gap-1 rounded-lg border border-[var(--hub-border2)] bg-[var(--hub-surface)] p-0.5 md:mx-3"
              role="group"
              aria-label="Commands, scripting, or roadmap"
            >
              <button
                type="button"
                onClick={() => setWorkspaceMode('commands')}
                className={`min-h-[36px] rounded-md px-1 py-1.5 text-center text-[8px] font-bold uppercase leading-tight tracking-wide transition-colors sm:text-[9px] ${
                  workspaceMode === 'commands'
                    ? 'bg-[var(--hub-tool-dim)] text-[var(--hub-text)] ring-1 ring-[var(--hub-tool)]/35'
                    : 'text-[var(--hub-muted)] hover:bg-[var(--hub-tool-dim2)] hover:text-[var(--hub-text)]'
                }`}
                aria-pressed={workspaceMode === 'commands'}
              >
                Commands
              </button>
              <button
                type="button"
                onClick={() => setWorkspaceMode('scripting')}
                className={`min-h-[36px] rounded-md px-1 py-1.5 text-center text-[8px] font-bold uppercase leading-tight tracking-wide transition-colors sm:text-[9px] ${
                  workspaceMode === 'scripting'
                    ? 'bg-[var(--hub-tool-dim)] text-[var(--hub-text)] ring-1 ring-[var(--hub-tool)]/35'
                    : 'text-[var(--hub-muted)] hover:bg-[var(--hub-tool-dim2)] hover:text-[var(--hub-text)]'
                }`}
                aria-pressed={workspaceMode === 'scripting'}
              >
                Scripting
              </button>
              <button
                type="button"
                onClick={() => setWorkspaceMode('roadmap')}
                className={`min-h-[36px] rounded-md px-1 py-1.5 text-center text-[8px] font-bold uppercase leading-tight tracking-wide transition-colors sm:text-[9px] ${
                  workspaceMode === 'roadmap'
                    ? 'bg-[var(--hub-tool-dim)] text-[var(--hub-text)] ring-1 ring-[var(--hub-tool)]/35'
                    : 'text-[var(--hub-muted)] hover:bg-[var(--hub-tool-dim2)] hover:text-[var(--hub-text)]'
                }`}
                aria-pressed={workspaceMode === 'roadmap'}
              >
                Roadmap
              </button>
            </div>
            {workspaceMode === 'commands' ? (
              <SidebarNav
                tool={tool}
                onToolChange={handleToolChange}
                toolCounts={toolCounts}
                toolLabel={toolLabel}
              />
            ) : (
              <div className="mx-2 mt-1 rounded-lg border border-dashed border-[var(--hub-border2)] bg-[var(--hub-surface)] px-3 py-3 text-[11px] leading-relaxed text-[var(--hub-muted)] md:mx-3">
                {workspaceMode === 'scripting'
                  ? 'Scripting mode is focused. Pick topics from the main panel.'
                  : 'Roadmap mode is focused. Follow the learning flow in the main panel.'}
              </div>
            )}
          </div>
        </aside>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <MainWorkspaceHeader
            tool={tool}
            toolLabel={toolLabel}
            visibleCount={workspaceVisibleCount}
            browseKey={browseKey}
            workspaceMode={workspaceMode}
          />
          <main
            id="main-content"
            tabIndex={-1}
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-[max(1rem,env(safe-area-inset-bottom,0px))] pl-[max(0.5rem,env(safe-area-inset-left,0px))] pr-[max(0.5rem,env(safe-area-inset-right,0px))] pt-3 outline-none sm:pl-[max(1rem,env(safe-area-inset-left,0px))] sm:pr-[max(1rem,env(safe-area-inset-right,0px))] sm:pt-4 md:pb-6 md:pl-5 md:pr-4 lg:pl-6 lg:pr-5"
          >
            <div className="mx-auto w-full max-w-[1600px]">
              <div key={workspaceMode === 'scripting' ? 'scripting' : mainContentKey} className="hub-fade-in">
                {workspaceMode === 'scripting' && <ScriptingGuides />}
                {workspaceMode === 'roadmap' && <RoadmapFlow />}

                {workspaceMode === 'commands' && showCategoryHub && (
                  <CategoryHub
                    summaries={categorySummaries}
                    onPickCategory={handlePickCategoryFromHub}
                    toolLabel={toolLabel}
                    toolFilter={tool}
                    onBackToAllTools={backToAllTools}
                  />
                )}

                {workspaceMode === 'commands' && hasCategoryBrowse && browseKey && !singleToolSidebarMode && (
                  <CategoryBreadcrumb
                    toolLabel={toolLabel}
                    browseKey={browseKey}
                    toolFilter={tool}
                    onBackToCategories={() => setBrowseKey(null)}
                    onBackToAllTools={backToAllTools}
                    query={query}
                  />
                )}

                {workspaceMode === 'commands' && filtered.length === 0 && !singleToolSidebarMode && (
                  <Card className="border-dashed border-[var(--hub-line)] bg-[var(--hub-card)] px-8 py-16 text-center">
                    <p className="text-base leading-relaxed text-[var(--hub-sub)]">
                      No commands match your search. Try different filters or keywords.
                    </p>
                  </Card>
                )}

                {workspaceMode === 'commands' && singleToolSidebarMode && (
                  <div className="min-w-0">
                    {filtered.length === 0 ? (
                      <Card className="border-dashed border-[var(--hub-line)] bg-[var(--hub-card)] px-8 py-12 text-center">
                        <p className="text-base leading-relaxed text-[var(--hub-sub)]">
                          No commands match your search or level filter. Adjust filters or try different keywords.
                        </p>
                      </Card>
                    ) : (
                      <SidebarToolTree
                        variant="main"
                        tool={tool}
                        commands={filtered}
                        onSelectCommand={setSelected}
                        levelLabel={levelLabel}
                        preferredCategory={preferredCategory}
                      />
                    )}
                  </div>
                )}

                {workspaceMode === 'commands' &&
                  !singleToolSidebarMode &&
                  !showCategoryHub &&
                  browseKey &&
                  displayCommands.length === 0 &&
                  filtered.length > 0 && (
                  <Card className="border-dashed border-[var(--hub-line)] bg-[var(--hub-card)] px-8 py-16 text-center">
                    <p className="text-base leading-relaxed text-[var(--hub-sub)]">
                      No commands in this category for the current filters. Go back or adjust level / search.
                    </p>
                  </Card>
                )}

                {workspaceMode === 'commands' &&
                  !singleToolSidebarMode &&
                  !showCategoryHub &&
                  displayCommands.length > 0 && (
                  <CommandListByLevel
                    commandsByLevel={commandsByLevel}
                    onSelect={setSelected}
                    toolLabel={toolLabel}
                    levelLabel={levelLabel}
                  />
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      {selected && (
        <Suspense fallback={null}>
          <CommandPanel
            command={{
              ...selected,
              ...(COMMAND_EXTRAS[selected.id] || {}),
            }}
            suggestedCommands={suggestedCommands}
            onSelectCommand={setSelected}
            onClose={() => setSelected(null)}
            toolLabel={toolLabel}
            levelLabel={levelLabel}
          />
        </Suspense>
      )}
    </MainLayout>
  )
}
