import { useState, useMemo, useCallback, useEffect, useRef, lazy, Suspense } from 'react'
import { AnimatePresence } from 'motion/react'
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
import LearningModeBar from './components/layout/LearningModeBar'
import GlobalSearchModal from './components/search/GlobalSearchModal'
import FavoritesHubModal from './components/favorites/FavoritesHubModal'
import Footer from './components/layout/Footer'
import DockMagnify from './components/DockMagnify'
import Card from './components/ui/Card'
import ScriptingGuides from './components/ScriptingGuides'
import ScriptingTopicsNav from './components/ScriptingTopicsNav'
import RoadmapFlow from './components/RoadmapFlow'
import { SCRIPTING_GUIDES } from './data/scriptingGuides'
import { ROADMAP_FLOW_STEPS, ROADMAP_FINAL_ORDER } from './data/roadmapData'
import { filterScriptingGuides, filterRoadmapFlowSteps, filterRoadmapFinalOrder } from './utils/workspaceSearch'
import { useLabProgress } from './hooks/useLabProgress'
import { useCommandFavorites } from './hooks/useCommandFavorites'
import { useToolFavorites } from './hooks/useToolFavorites'
import { useCommandLearned } from './hooks/useCommandLearned'
import { parseWorkspaceHash, buildWorkspaceHash } from './utils/siteHashNavigation'
import { commandMatchesQuery } from './utils/commandIntentSearch'
import { mergeRelatedIds } from './utils/commandPanelBreakdown'
import { filterDevopsTools } from './utils/toolsFilter'
import { CommandsWorkspaceContext } from './context/CommandsWorkspaceContext'
import ToolsPage from './components/tools/ToolsPage'
import TechWordsPage from './components/techwords/TechWordsPage'
import CommandsHero from './components/commands/CommandsHero'
import MobileWorkspaceBottomNav from './components/MobileWorkspaceBottomNav'
import { filterTechWords } from './utils/techWordsFilter'
import { useTechWordFavorites } from './hooks/useTechWordFavorites'

const CommandPanel = lazy(() => import('./components/CommandPanel'))

function readInitialWorkspaceState() {
  const defaults = {
    workspaceMode: 'tools',
    tool: 'all',
    scriptingTopicId: SCRIPTING_GUIDES[0]?.id ?? 'dockerfile',
    toolsCategoryId: 'all',
    techWordsCategoryId: 'all',
  }
  if (typeof window === 'undefined') return defaults
  const parsed = parseWorkspaceHash(window.location.hash)
  if (!parsed) return defaults
  if (parsed.mode === 'roadmap') return { ...defaults, workspaceMode: 'roadmap' }
  if (parsed.mode === 'techwords')
    return { ...defaults, workspaceMode: 'techwords', techWordsCategoryId: parsed.category || 'all' }
  if (parsed.mode === 'tools')
    return { ...defaults, workspaceMode: 'tools', toolsCategoryId: parsed.category || 'all' }
  if (parsed.mode === 'scripting') return { ...defaults, workspaceMode: 'scripting', scriptingTopicId: parsed.topic }
  return { ...defaults, workspaceMode: 'commands', tool: parsed.tool }
}

function toolLabel(t) {
  const labels = {
    aws: 'AWS',
    helm: 'Helm',
    ansible: 'Ansible',
    azure: 'Azure',
    gcp: 'GCP',
    git: 'Git',
    linux: 'Linux',
    nginx: 'Nginx',
    apache: 'Apache',
    haproxy: 'HAProxy',
    tomcat: 'Tomcat',
    postgresql: 'PostgreSQL',
    redis: 'Redis',
    'github-actions': 'Jenkins / CI',
    kubernetes: 'Kubernetes',
    terraform: 'Terraform',
    docker: 'Docker',
    prometheus: 'Prometheus',
    grafana: 'Grafana',
    maven: 'Maven',
    shell: 'Shell',
  }
  if (t === 'all') return 'All tools'
  return labels[t] || t
}

function levelLabel(l) {
  const labels = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' }
  return labels[l] || l
}

const COUNT_TOOL_IDS = [
  'all',
  'aws',
  'azure',
  'gcp',
  'linux',
  'git',
  'github-actions',
  'docker',
  'terraform',
  'kubernetes',
  'helm',
  'ansible',
  'nginx',
  'apache',
  'tomcat',
  'haproxy',
  'prometheus',
  'grafana',
  'postgresql',
  'redis',
  'maven',
  'shell',
]

export default function App() {
  const [tool, setTool] = useState(() => readInitialWorkspaceState().tool)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const [browseKey, setBrowseKey] = useState(null)
  const [preferredCategory, setPreferredCategory] = useState(null)
  const [workspaceMode, setWorkspaceMode] = useState(() => readInitialWorkspaceState().workspaceMode)
  const [scriptingTopicId, setScriptingTopicId] = useState(() => readInitialWorkspaceState().scriptingTopicId)
  const [toolsCategoryId, setToolsCategoryId] = useState(() => readInitialWorkspaceState().toolsCategoryId)
  const [techWordsCategoryId, setTechWordsCategoryId] = useState(
    () => readInitialWorkspaceState().techWordsCategoryId
  )
  const [commandsLearnMode, setCommandsLearnMode] = useState('learn')
  const [expandedCommandId, setExpandedCommandId] = useState(null)
  const searchInputRef = useRef(null)
  const [globalSearchOpen, setGlobalSearchOpen] = useState(false)
  const [favoritesOpen, setFavoritesOpen] = useState(false)
  const labProgress = useLabProgress()
  const { isFavorite, toggleFavorite, favoriteIds: commandFavoriteIds } = useCommandFavorites()
  const {
    isFavorite: isToolFavorite,
    toggleFavorite: toggleToolFavorite,
    favoriteIds: toolFavoriteIds,
  } = useToolFavorites()
  const {
    isFavorite: isTechWordFavorite,
    toggleFavorite: toggleTechWordFavorite,
    favoriteIds: techWordFavoriteIds,
  } = useTechWordFavorites()
  const { isLearned, toggleLearned } = useCommandLearned()

  const commandsWorkspaceValue = useMemo(
    () => ({
      isFavorite,
      toggleFavorite,
      isLearned,
      toggleLearned,
      learnMode: commandsLearnMode,
      setLearnMode: setCommandsLearnMode,
      expandedCommandId,
      setExpandedCommandId,
    }),
    [
      isFavorite,
      toggleFavorite,
      isLearned,
      toggleLearned,
      commandsLearnMode,
      expandedCommandId,
    ]
  )

  const openCommandsForLabTool = useCallback((nextTool) => {
    setWorkspaceMode('commands')
    setTool(nextTool || 'all')
    setBrowseKey(null)
    setPreferredCategory(null)
  }, [])

  const onLogoHomeClick = useCallback(() => {
    setQuery('')
    setSelected(null)
    setBrowseKey(null)
    setPreferredCategory(null)
  }, [])

  const handleGlobalNavigate = useCallback(({ type, payload }) => {
    if (type === 'command') {
      const c = payload
      setWorkspaceMode('commands')
      setTool(c.tool || 'all')
      setQuery('')
      setBrowseKey(null)
      setPreferredCategory(null)
      setSelected(c)
      return
    }
    if (type === 'tool') {
      const t = payload
      setWorkspaceMode('tools')
      setToolsCategoryId(t.categoryId || 'all')
      setQuery(t.name)
      setSelected(null)
      return
    }
    if (type === 'lab') {
      const g = payload
      setWorkspaceMode('scripting')
      setScriptingTopicId(g.id)
      setQuery('')
      setSelected(null)
      return
    }
    if (type === 'techword') {
      const w = payload
      setWorkspaceMode('techwords')
      setTechWordsCategoryId(w.categoryId || 'all')
      setQuery(w.term)
      setSelected(null)
    }
  }, [])

  useEffect(() => {
    const onHashChange = () => {
      const parsed = parseWorkspaceHash(window.location.hash)
      if (!parsed) return
      setWorkspaceMode(parsed.mode)
      setSelected(null)
      if (parsed.mode === 'commands') {
        setTool(parsed.tool)
        setBrowseKey(null)
        setPreferredCategory(null)
      }
      if (parsed.mode === 'tools') {
        setToolsCategoryId(parsed.category || 'all')
      }
      if (parsed.mode === 'techwords') {
        setTechWordsCategoryId(parsed.category || 'all')
      }
      if (parsed.mode === 'scripting' && parsed.topic) {
        setScriptingTopicId(parsed.topic)
      }
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    const next = buildWorkspaceHash({
      mode: workspaceMode,
      tool,
      topic: scriptingTopicId,
      toolsCategory: toolsCategoryId,
      techWordsCategory: techWordsCategoryId,
    })
    if (typeof window === 'undefined') return
    const cur = window.location.hash
    if (cur !== next) {
      window.history.replaceState(
        null,
        '',
        `${window.location.pathname}${window.location.search}${next}`
      )
    }
  }, [workspaceMode, tool, scriptingTopicId, toolsCategoryId, techWordsCategoryId])

  useEffect(() => {
    setBrowseKey(null)
  }, [tool])

  useEffect(() => {
    if (workspaceMode !== 'commands') setSelected(null)
  }, [workspaceMode])

  useEffect(() => {
    setExpandedCommandId(null)
  }, [tool, browseKey, query, workspaceMode])

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setGlobalSearchOpen(true)
        return
      }
      if (
        e.key !== '/' ||
        (workspaceMode !== 'commands' && workspaceMode !== 'tools' && workspaceMode !== 'techwords')
      )
        return
      const t = e.target
      if (t?.tagName === 'INPUT' || t?.tagName === 'TEXTAREA' || t?.isContentEditable) return
      e.preventDefault()
      searchInputRef.current?.focus()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
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
    const q = query.trim()
    return COMMANDS_DATA.filter((c) => {
      // With an active search, match across every tool; empty query keeps sidebar tool filter.
      const matchTool = q ? true : tool === 'all' || c.tool === tool
      if (!matchTool) return false
      const extras = COMMAND_EXTRAS[c.id] || {}
      return commandMatchesQuery(c, q, extras)
    })
  }, [tool, query])

  const filteredScriptingGuides = useMemo(
    () => filterScriptingGuides(SCRIPTING_GUIDES, query),
    [query]
  )

  useEffect(() => {
    if (workspaceMode !== 'scripting') return
    if (filteredScriptingGuides.length === 0) return
    const ids = new Set(filteredScriptingGuides.map((g) => g.id))
    if (ids.has(scriptingTopicId)) return
    setScriptingTopicId(filteredScriptingGuides[0].id)
  }, [workspaceMode, filteredScriptingGuides, scriptingTopicId])

  const filteredRoadmapSteps = useMemo(
    () => filterRoadmapFlowSteps(ROADMAP_FLOW_STEPS, query),
    [query]
  )

  const filteredRoadmapFinalOrder = useMemo(
    () => filterRoadmapFinalOrder(ROADMAP_FINAL_ORDER, query),
    [query]
  )

  const toolsSearchCount = useMemo(() => {
    if (workspaceMode !== 'tools') return 0
    return filterDevopsTools(query, toolsCategoryId, {
      openSource: false,
      paid: false,
      cloudNative: false,
    }).length
  }, [workspaceMode, query, toolsCategoryId])

  const techWordsSearchCount = useMemo(() => {
    if (workspaceMode !== 'techwords') return 0
    return filterTechWords(query, techWordsCategoryId).length
  }, [workspaceMode, query, techWordsCategoryId])

  const toolCounts = useMemo(() => {
    const q = query.trim()
    const base = COMMANDS_DATA.filter((c) => {
      const extras = COMMAND_EXTRAS[c.id] || {}
      return commandMatchesQuery(c, q, extras)
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

  const searchCommandsGlobal = query.trim().length > 0

  /** While searching, do not keep a category drill-down filter on the main list. */
  const effectiveBrowseKey = searchCommandsGlobal ? null : browseKey

  const displayCommands = useMemo(() => {
    if (!effectiveBrowseKey) return filtered
    return filtered.filter((c) => c.tool === effectiveBrowseKey.tool && c.category === effectiveBrowseKey.category)
  }, [filtered, effectiveBrowseKey])

  const commandsByLevel = useMemo(() => {
    const groups = { beginner: [], intermediate: [], advanced: [] }
    displayCommands.forEach((c) => {
      if (groups[c.level]) groups[c.level].push(c)
    })
    return groups
  }, [displayCommands])

  const suggestedCommands = useMemo(() => {
    if (!selected) return []
    const e = COMMAND_EXTRAS[selected.id] || {}
    const ids = mergeRelatedIds(e.suggestedNext || [], e.relatedCommandIds || [])
    return ids.map((id) => COMMANDS_DATA.find((c) => c.id === id)).filter(Boolean)
  }, [selected?.id])

  const resolveCommandByLine = useCallback((line) => {
    const t = (line || '').trim()
    if (!t) return undefined
    return COMMANDS_DATA.find((c) => (c.command || '').trim() === t)
  }, [])

  const singleToolSidebarMode = tool !== 'all'

  const showCategoryHub = hasCategoryBrowse && browseKey === null && !singleToolSidebarMode

  const workspaceVisibleCount = useMemo(() => {
    if (workspaceMode === 'tools') return toolsSearchCount
    if (workspaceMode === 'techwords') return techWordsSearchCount
    if (workspaceMode === 'scripting') return filteredScriptingGuides.length
    if (workspaceMode === 'roadmap') return filteredRoadmapSteps.length
    if (singleToolSidebarMode) return filtered.length
    if (showCategoryHub) return filtered.length
    return displayCommands.length
  }, [
    workspaceMode,
    toolsSearchCount,
    techWordsSearchCount,
    filteredScriptingGuides.length,
    filteredRoadmapSteps.length,
    singleToolSidebarMode,
    showCategoryHub,
    filtered.length,
    displayCommands.length,
  ])

  const headerBadge = useMemo(() => {
    if (workspaceMode === 'tools') {
      return { count: toolsSearchCount, noun: 'tools' }
    }
    if (workspaceMode === 'techwords') {
      return { count: techWordsSearchCount, noun: 'terms' }
    }
    if (workspaceMode === 'scripting') {
      return { count: filteredScriptingGuides.length, noun: 'topics' }
    }
    if (workspaceMode === 'roadmap') {
      return { count: filteredRoadmapSteps.length, noun: 'modules' }
    }
    return { count: filtered.length, noun: 'commands' }
  }, [
    workspaceMode,
    toolsSearchCount,
    techWordsSearchCount,
    filtered.length,
    filteredScriptingGuides.length,
    filteredRoadmapSteps.length,
  ])

  const mainContentKey = `${tool}-${browseKey?.tool ?? ''}-${browseKey?.category ?? ''}`

  return (
    <CommandsWorkspaceContext.Provider value={commandsWorkspaceValue}>
    <MainLayout>
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
        headerBadgeCount={headerBadge.count}
        headerBadgeNoun={headerBadge.noun}
        workspaceMode={workspaceMode}
        onWorkspaceModeChange={setWorkspaceMode}
        searchInputRef={searchInputRef}
        onLogoHomeClick={onLogoHomeClick}
        toolsCategoryId={toolsCategoryId}
        onSelectToolsCategory={setToolsCategoryId}
        techWordsCategoryId={techWordsCategoryId}
        onSelectTechWordsCategory={setTechWordsCategoryId}
        onOpenGlobalSearch={() => setGlobalSearchOpen(true)}
        onOpenFavorites={() => setFavoritesOpen(true)}
      />

      <LearningModeBar workspaceMode={workspaceMode} onWorkspaceModeChange={setWorkspaceMode} />

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row">
        <aside
          className="hidden h-full min-h-0 w-[min(220px,30vw)] max-w-[260px] shrink-0 flex-col overflow-x-hidden overflow-y-visible border-r border-[var(--hub-line)] bg-[var(--hub-sidebar)] lg:flex"
          aria-label={
            workspaceMode === 'scripting'
              ? 'LAB workspace'
              : workspaceMode === 'tools' ||
                  workspaceMode === 'roadmap' ||
                  workspaceMode === 'techwords'
                ? 'Workspace navigation'
                : 'Commands tools'
          }
        >
          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-x-hidden overflow-y-visible py-2.5">
            <DockMagnify
              className="mx-2 mb-2 flex min-w-0 shrink-0 flex-col gap-1 overflow-hidden rounded-lg border border-[var(--hub-border2)] bg-[var(--hub-surface)] p-1 lg:mx-3"
              itemClipClassName="flex w-full min-w-0 overflow-hidden rounded-md"
              itemWrapperClassName="flex w-full min-w-0 justify-center origin-center"
              role="group"
              aria-label="Tools, Commands, LAB, Roadmap, or Tech Words"
            >
              <button
                type="button"
                onClick={() => setWorkspaceMode('tools')}
                className={`flex min-h-[38px] w-full min-w-0 items-center justify-center rounded-md px-2 py-2 text-center text-[11px] font-bold uppercase leading-tight tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--hub-sidebar)] ${
                  workspaceMode === 'tools'
                    ? 'bg-[var(--hub-tool-dim)] text-[var(--hub-text)] shadow-[inset_0_0_0_1.5px_var(--hub-tool)]'
                    : 'text-[var(--hub-muted)] hover:bg-[var(--hub-tool-dim2)] hover:text-[var(--hub-text)]'
                }`}
                aria-pressed={workspaceMode === 'tools'}
              >
                Tools
              </button>
              <button
                type="button"
                onClick={() => setWorkspaceMode('commands')}
                className={`flex min-h-[38px] w-full min-w-0 items-center justify-center rounded-md px-2 py-2 text-center text-[11px] font-bold uppercase leading-tight tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--hub-sidebar)] ${
                  workspaceMode === 'commands'
                    ? 'bg-[var(--hub-tool-dim)] text-[var(--hub-text)] shadow-[inset_0_0_0_1.5px_var(--hub-tool)]'
                    : 'text-[var(--hub-muted)] hover:bg-[var(--hub-tool-dim2)] hover:text-[var(--hub-text)]'
                }`}
                aria-pressed={workspaceMode === 'commands'}
              >
                Commands
              </button>
              <button
                type="button"
                onClick={() => setWorkspaceMode('scripting')}
                className={`flex min-h-[38px] w-full min-w-0 items-center justify-center rounded-md px-2 py-2 text-center text-[11px] font-bold uppercase leading-tight tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--hub-sidebar)] ${
                  workspaceMode === 'scripting'
                    ? 'bg-[var(--hub-tool-dim)] text-[var(--hub-text)] shadow-[inset_0_0_0_1.5px_var(--hub-tool)]'
                    : 'text-[var(--hub-muted)] hover:bg-[var(--hub-tool-dim2)] hover:text-[var(--hub-text)]'
                }`}
                aria-pressed={workspaceMode === 'scripting'}
                title="Interactive lab modules"
              >
                LAB
              </button>
              <button
                type="button"
                onClick={() => setWorkspaceMode('roadmap')}
                className={`flex min-h-[38px] w-full min-w-0 items-center justify-center rounded-md px-2 py-2 text-center text-[11px] font-bold uppercase leading-tight tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--hub-sidebar)] ${
                  workspaceMode === 'roadmap'
                    ? 'bg-[var(--hub-tool-dim)] text-[var(--hub-text)] shadow-[inset_0_0_0_1.5px_var(--hub-tool)]'
                    : 'text-[var(--hub-muted)] hover:bg-[var(--hub-tool-dim2)] hover:text-[var(--hub-text)]'
                }`}
                aria-pressed={workspaceMode === 'roadmap'}
              >
                Roadmap
              </button>
              <button
                type="button"
                onClick={() => setWorkspaceMode('techwords')}
                className={`flex min-h-[38px] w-full min-w-0 items-center justify-center rounded-md px-1.5 py-2 text-center text-[10px] font-bold uppercase leading-tight tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--hub-sidebar)] ${
                  workspaceMode === 'techwords'
                    ? 'bg-[var(--hub-tool-dim)] text-[var(--hub-text)] shadow-[inset_0_0_0_1.5px_var(--hub-tool)]'
                    : 'text-[var(--hub-muted)] hover:bg-[var(--hub-tool-dim2)] hover:text-[var(--hub-text)]'
                }`}
                aria-pressed={workspaceMode === 'techwords'}
                title="Technical dictionary"
              >
                Tech Words
              </button>
            </DockMagnify>
            {workspaceMode === 'commands' ? (
              <SidebarNav
                tool={tool}
                onToolChange={handleToolChange}
                toolCounts={toolCounts}
                toolLabel={toolLabel}
              />
            ) : workspaceMode === 'scripting' ? (
              <div className="mx-2 flex min-h-0 min-w-0 flex-1 flex-col lg:mx-3">
                <ScriptingTopicsNav
                  variant="asideStack"
                  guides={filteredScriptingGuides}
                  activeId={scriptingTopicId}
                  onSelectTopic={setScriptingTopicId}
                  isTopicLearned={labProgress.isLearned}
                  className="min-h-0 flex-1"
                />
              </div>
            ) : null}
          </div>
        </aside>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <MainWorkspaceHeader
            tool={tool}
            toolLabel={toolLabel}
            visibleCount={workspaceVisibleCount}
            browseKey={effectiveBrowseKey}
            workspaceMode={workspaceMode}
            onBackToAllTools={backToAllTools}
            commandsSearchGlobal={searchCommandsGlobal}
          />
          <main
            id="main-content"
            tabIndex={-1}
            className="min-h-0 min-w-0 flex-1 touch-pan-y overflow-x-hidden overflow-y-auto overscroll-y-contain pb-[calc(4.75rem+env(safe-area-inset-bottom,0px))] pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] pt-3 outline-none [-webkit-overflow-scrolling:touch] sm:pl-[max(1.5rem,env(safe-area-inset-left,0px))] sm:pr-[max(1.5rem,env(safe-area-inset-right,0px))] sm:pt-4 lg:pb-6 lg:pl-[max(2rem,env(safe-area-inset-left,0px))] lg:pr-[max(2rem,env(safe-area-inset-right,0px))] lg:pt-6"
          >
            <div
              className={
                workspaceMode === 'scripting' || workspaceMode === 'roadmap'
                  ? 'w-full min-w-0'
                  : 'mx-auto w-full min-w-0 max-w-[1600px]'
              }
            >
              <div
                key={
                  workspaceMode === 'scripting'
                    ? 'scripting'
                    : workspaceMode === 'tools'
                      ? `tools-${toolsCategoryId}`
                      : workspaceMode === 'techwords'
                        ? `techwords-${techWordsCategoryId}`
                        : mainContentKey
                }
                className="hub-fade-in min-w-0 w-full"
              >
                {workspaceMode === 'commands' && <CommandsHero />}
                {workspaceMode === 'scripting' && (
                  <ScriptingGuides
                    activeId={scriptingTopicId}
                    onSelectTopic={setScriptingTopicId}
                    guides={filteredScriptingGuides}
                    labProgress={labProgress}
                    resolveToolLabel={toolLabel}
                    onOpenCommandsTool={openCommandsForLabTool}
                  />
                )}
                {workspaceMode === 'roadmap' && (
                  <RoadmapFlow steps={filteredRoadmapSteps} finalOrderLines={filteredRoadmapFinalOrder} />
                )}

                {workspaceMode === 'tools' && (
                  <ToolsPage
                    query={query}
                    onQueryChange={setQuery}
                    activeCategoryId={toolsCategoryId}
                    onSelectCategory={setToolsCategoryId}
                    isFavorite={isToolFavorite}
                    toggleFavorite={toggleToolFavorite}
                  />
                )}

                {workspaceMode === 'techwords' && (
                  <TechWordsPage
                    query={query}
                    onQueryChange={setQuery}
                    activeCategoryId={techWordsCategoryId}
                    onSelectCategory={setTechWordsCategoryId}
                    isFavorite={isTechWordFavorite}
                    toggleFavorite={toggleTechWordFavorite}
                  />
                )}

                {workspaceMode === 'commands' && showCategoryHub && (
                  <CategoryHub
                    summaries={categorySummaries}
                    onPickCategory={handlePickCategoryFromHub}
                    toolLabel={toolLabel}
                    toolFilter={tool}
                    onBackToAllTools={backToAllTools}
                  />
                )}

                {workspaceMode === 'commands' &&
                  hasCategoryBrowse &&
                  browseKey &&
                  !singleToolSidebarMode &&
                  !searchCommandsGlobal && (
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
                          No commands match your search. Adjust the tool filter or try different keywords.
                        </p>
                      </Card>
                    ) : searchCommandsGlobal ? (
                      <CommandListByLevel
                        commandsByLevel={commandsByLevel}
                        onSelect={setSelected}
                        toolLabel={toolLabel}
                        levelLabel={levelLabel}
                      />
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
                      No commands in this category for the current search. Go back or try different keywords.
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

      <Footer />

      <MobileWorkspaceBottomNav workspaceMode={workspaceMode} onWorkspaceModeChange={setWorkspaceMode} />

      <GlobalSearchModal
        open={globalSearchOpen}
        onClose={() => setGlobalSearchOpen(false)}
        onNavigate={handleGlobalNavigate}
      />
      <FavoritesHubModal
        open={favoritesOpen}
        onClose={() => setFavoritesOpen(false)}
        commandFavoriteIds={commandFavoriteIds}
        toolFavoriteIds={toolFavoriteIds}
        techWordFavoriteIds={techWordFavoriteIds}
        labLearned={labProgress.learned}
        onNavigate={handleGlobalNavigate}
      />

      <AnimatePresence>
        {selected ? (
          <Suspense fallback={null}>
            <CommandPanel
              key={selected.id}
              command={{
                ...selected,
                ...(COMMAND_EXTRAS[selected.id] || {}),
              }}
              suggestedCommands={suggestedCommands}
              onSelectCommand={setSelected}
              onClose={() => setSelected(null)}
              toolLabel={toolLabel}
              levelLabel={levelLabel}
              resolveCommandByLine={resolveCommandByLine}
            />
          </Suspense>
        ) : null}
      </AnimatePresence>
    </MainLayout>
    </CommandsWorkspaceContext.Provider>
  )
}
