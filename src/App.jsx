import { useState, useMemo, useCallback, useEffect, useRef, lazy, Suspense } from 'react'
import { AnimatePresence } from 'motion/react'
import { COMMANDS_DATA } from './data/commands'
import { COMMAND_EXTRAS } from './data/commandExtras'
import { orderedCategorySummaries } from './data/categoryOrder'
import CommandListByLevel from './components/CommandListByLevel'
import CategoryBreadcrumb from './components/CategoryBreadcrumb'
import Header from './components/Header'
import SidebarToolTree from './components/SidebarToolTree'
import MainWorkspaceHeader from './components/MainWorkspaceHeader'
import MainLayout from './components/layout/MainLayout'
import ScrollEdgeButtons from './components/layout/ScrollEdgeButtons'
import WorkspaceModeNav from './components/layout/WorkspaceModeNav'
import FavoritesHubModal from './components/favorites/FavoritesHubModal'
import Footer from './components/layout/Footer'
import Card from './components/ui/Card'
import ScriptingGuides from './components/ScriptingGuides'
import LabTopicChipBar from './components/lab/LabTopicChipBar'
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
import { TOOL_CATEGORY_IDS } from './data/toolsData'
import { CommandsWorkspaceContext } from './context/CommandsWorkspaceContext'
import ToolsPage from './components/tools/ToolsPage'
import TechWordsPage from './components/techwords/TechWordsPage'
import CommandsExplorerHub from './components/commands/CommandsExplorerHub'
import CommandsToolChipBar from './components/commands/CommandsToolChipBar'
import MobileWorkspaceBottomNav from './components/MobileWorkspaceBottomNav'
import { filterTechWords } from './utils/techWordsFilter'
import { filterConcepts } from './utils/conceptsFilter'
import { useTechWordFavorites } from './hooks/useTechWordFavorites'
import ConceptsPage from './components/concepts/ConceptsPage'
import PortsPage from './components/ports/PortsPage'
import ScenariosPage from './components/scenarios/ScenariosPage'
import { filterPorts } from './utils/portsFilter'
import { filterScenarios } from './utils/scenariosFilter'
import PlaygroundPage from './components/playground/PlaygroundPage'
import { PLAYGROUND_SIMULATION_COUNT } from './data/playgroundData'
import ArchitecturePage from './components/architecture/ArchitecturePage'
import { ARCHITECTURES } from './data/architectureData'
import CheatsheetsPage from './components/cheatsheets/CheatsheetsPage'
import { countCheatsheetRows } from './data/cheatsheetsData'
import UtilitiesPage from './components/utilities/UtilitiesPage'
import { countVisibleUtilityTools } from './data/utilitiesData'
import DailyPage from './components/daily/DailyPage'
import { stepWorkspaceMode } from './constants/workspaceModes'

const CommandPanel = lazy(() => import('./components/CommandPanel'))

/** Previous workspace: `<` or `,` — next: `>` or `.` (when not typing in a field). */
const WORKSPACE_PREV_KEYS = new Set(['<', ','])
const WORKSPACE_NEXT_KEYS = new Set(['>', '.'])

function readInitialWorkspaceState() {
  const defaults = {
    workspaceMode: 'tools',
    tool: 'all',
    scriptingTopicId: SCRIPTING_GUIDES[0]?.id ?? 'dockerfile',
    toolsCategoryId: 'all',
    techWordsCategoryId: 'all',
    conceptsCategoryId: 'all',
    portsCategoryId: 'all',
    playgroundTabId: 'kubernetes',
    architectureId: null,
    cheatsheetTabId: 'git',
    utilitiesTabId: 'cidr',
  }
  if (typeof window === 'undefined') return defaults
  const parsed = parseWorkspaceHash(window.location.hash)
  if (!parsed) return defaults
  if (parsed.mode === 'roadmap') return { ...defaults, workspaceMode: 'roadmap' }
  if (parsed.mode === 'techwords')
    return { ...defaults, workspaceMode: 'techwords', techWordsCategoryId: parsed.category || 'all' }
  if (parsed.mode === 'concepts')
    return { ...defaults, workspaceMode: 'concepts', conceptsCategoryId: parsed.category || 'all' }
  if (parsed.mode === 'ports')
    return { ...defaults, workspaceMode: 'ports', portsCategoryId: parsed.category || 'all' }
  if (parsed.mode === 'scenarios') return { ...defaults, workspaceMode: 'scenarios' }
  if (parsed.mode === 'playground')
    return {
      ...defaults,
      workspaceMode: 'playground',
      playgroundTabId: parsed.tab || 'kubernetes',
    }
  if (parsed.mode === 'architecture')
    return {
      ...defaults,
      workspaceMode: 'architecture',
      architectureId: parsed.architectureId ?? null,
    }
  if (parsed.mode === 'cheatsheets')
    return {
      ...defaults,
      workspaceMode: 'cheatsheets',
      cheatsheetTabId: parsed.tab || 'git',
    }
  if (parsed.mode === 'utilities')
    return {
      ...defaults,
      workspaceMode: 'utilities',
      utilitiesTabId: parsed.tab || 'cidr',
    }
  if (parsed.mode === 'daily') return { ...defaults, workspaceMode: 'daily' }
  if (parsed.mode === 'tools') {
    let toolsCategoryId = parsed.category || 'all'
    const sp = new URLSearchParams(window.location.search || '')
    const qDomain = (sp.get('domain') || '').toLowerCase()
    if (
      (!toolsCategoryId || toolsCategoryId === 'all') &&
      qDomain &&
      TOOL_CATEGORY_IDS.has(qDomain)
    ) {
      toolsCategoryId = qDomain
    }
    return { ...defaults, workspaceMode: 'tools', toolsCategoryId }
  }
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

const ARCHITECTURE_PATTERN_COUNT = ARCHITECTURES.length

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
  const [conceptsCategoryId, setConceptsCategoryId] = useState(
    () => readInitialWorkspaceState().conceptsCategoryId
  )
  const [portsCategoryId, setPortsCategoryId] = useState(() => readInitialWorkspaceState().portsCategoryId)
  const [playgroundTabId, setPlaygroundTabId] = useState(() => readInitialWorkspaceState().playgroundTabId)
  const [architectureId, setArchitectureId] = useState(() => readInitialWorkspaceState().architectureId)
  const [cheatsheetTabId, setCheatsheetTabId] = useState(() => readInitialWorkspaceState().cheatsheetTabId)
  const [utilitiesTabId, setUtilitiesTabId] = useState(() => readInitialWorkspaceState().utilitiesTabId)
  const [commandsLearnMode, setCommandsLearnMode] = useState('learn')
  const [expandedCommandId, setExpandedCommandId] = useState(null)
  const searchBarRef = useRef(/** @type {{ focus: () => void } | null} */ (null))
  const playgroundInputRef = useRef(null)
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
      return
    }
    if (type === 'concept') {
      const c = payload
      setWorkspaceMode('concepts')
      setConceptsCategoryId(c.categoryId || 'all')
      setQuery(c.title || '')
      setSelected(null)
      return
    }
    if (type === 'port') {
      const p = payload
      setWorkspaceMode('ports')
      setPortsCategoryId(p.categoryId || 'all')
      setQuery(String(p.port))
      setSelected(null)
      return
    }
    if (type === 'scenario') {
      const s = payload
      setWorkspaceMode('scenarios')
      setQuery(s.title || '')
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
      if (parsed.mode === 'concepts') {
        setConceptsCategoryId(parsed.category || 'all')
      }
      if (parsed.mode === 'ports') {
        setPortsCategoryId(parsed.category || 'all')
      }
      if (parsed.mode === 'playground') {
        setPlaygroundTabId(parsed.tab || 'kubernetes')
      }
      if (parsed.mode === 'architecture') {
        setArchitectureId(parsed.architectureId ?? null)
      } else {
        setArchitectureId(null)
      }
      if (parsed.mode === 'cheatsheets') {
        setCheatsheetTabId(parsed.tab || 'git')
      }
      if (parsed.mode === 'utilities') {
        setUtilitiesTabId(parsed.tab || 'cidr')
      }
      if (parsed.mode === 'scripting' && parsed.topic) {
        setScriptingTopicId(parsed.topic)
      }
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    const nextHash = buildWorkspaceHash({
      mode: workspaceMode,
      tool,
      topic: scriptingTopicId,
      toolsCategory: toolsCategoryId,
      techWordsCategory: techWordsCategoryId,
      conceptsCategory: conceptsCategoryId,
      portsCategory: portsCategoryId,
      playgroundTab: playgroundTabId,
      architectureId,
      cheatsheetTab: cheatsheetTabId,
      utilitiesTab: utilitiesTabId,
    })
    if (typeof window === 'undefined') return
    const url = new URL(window.location.href)
    if (workspaceMode === 'tools') {
      if (!toolsCategoryId || toolsCategoryId === 'all') {
        url.searchParams.delete('domain')
      } else if (TOOL_CATEGORY_IDS.has(toolsCategoryId)) {
        url.searchParams.set('domain', toolsCategoryId)
      }
    } else {
      url.searchParams.delete('domain')
    }
    url.hash = nextHash
    const next = `${url.pathname}${url.search}${url.hash}`
    const cur = `${window.location.pathname}${window.location.search}${window.location.hash}`
    if (cur !== next) {
      window.history.replaceState(null, '', next)
    }
  }, [
    workspaceMode,
    tool,
    scriptingTopicId,
    toolsCategoryId,
    techWordsCategoryId,
    conceptsCategoryId,
    portsCategoryId,
    playgroundTabId,
    architectureId,
    cheatsheetTabId,
    utilitiesTabId,
  ])

  useEffect(() => {
    setBrowseKey(null)
  }, [tool])

  useEffect(() => {
    if (workspaceMode !== 'commands') setSelected(null)
  }, [workspaceMode])

  useEffect(() => {
    if (workspaceMode !== 'architecture') setArchitectureId(null)
  }, [workspaceMode])

  useEffect(() => {
    setExpandedCommandId(null)
  }, [tool, browseKey, query, workspaceMode])

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        searchBarRef.current?.focus()
        return
      }

      if (!e.metaKey && !e.ctrlKey && !e.altKey) {
        if (WORKSPACE_PREV_KEYS.has(e.key) || WORKSPACE_NEXT_KEYS.has(e.key)) {
          if (favoritesOpen) return
          const t = /** @type {HTMLElement | null} */ (e.target)
          if (t?.closest?.('[role="dialog"]')) return
          if (t?.closest?.('[data-skip-workspace-hotkeys]')) return
          const tag = t?.tagName
          if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || t?.isContentEditable) return

          if (WORKSPACE_PREV_KEYS.has(e.key)) {
            e.preventDefault()
            setWorkspaceMode((m) => stepWorkspaceMode(m, -1))
            return
          }
          if (WORKSPACE_NEXT_KEYS.has(e.key)) {
            e.preventDefault()
            setWorkspaceMode((m) => stepWorkspaceMode(m, 1))
            return
          }
        }
      }

      if (e.key !== '/') return
      const t = e.target
      if (t?.tagName === 'INPUT' || t?.tagName === 'TEXTAREA' || t?.isContentEditable) return
      e.preventDefault()
      if (workspaceMode === 'playground') {
        playgroundInputRef.current?.focus()
        return
      }
      searchBarRef.current?.focus()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [workspaceMode, favoritesOpen])

  const handleToolChange = useCallback(
    (nextTool) => {
      const normalized = !nextTool || nextTool === 'all' ? 'all' : nextTool
      if (normalized === tool && browseKey != null) {
        setBrowseKey(null)
        return
      }
      if (normalized === tool && tool !== 'all' && browseKey == null) {
        setPreferredCategory(null)
        setTool('all')
        return
      }
      if (normalized !== tool) {
        setBrowseKey(null)
      }
      setPreferredCategory(null)
      setTool(normalized)
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

  const conceptsSearchCount = useMemo(() => {
    if (workspaceMode !== 'concepts') return 0
    return filterConcepts(query, conceptsCategoryId).length
  }, [workspaceMode, query, conceptsCategoryId])

  const portsSearchCount = useMemo(() => {
    if (workspaceMode !== 'ports') return 0
    return filterPorts(query, portsCategoryId).length
  }, [workspaceMode, query, portsCategoryId])

  const scenariosSearchCount = useMemo(() => {
    if (workspaceMode !== 'scenarios') return 0
    return filterScenarios(query, 'all', 'all').length
  }, [workspaceMode, query])

  const cheatsheetsVisibleCount = useMemo(
    () => countCheatsheetRows(cheatsheetTabId, query),
    [cheatsheetTabId, query]
  )

  const utilitiesVisibleCount = useMemo(() => countVisibleUtilityTools(query), [query])

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
    if (workspaceMode === 'concepts') return conceptsSearchCount
    if (workspaceMode === 'ports') return portsSearchCount
    if (workspaceMode === 'scenarios') return scenariosSearchCount
    if (workspaceMode === 'playground') return PLAYGROUND_SIMULATION_COUNT
    if (workspaceMode === 'architecture') return ARCHITECTURE_PATTERN_COUNT
    if (workspaceMode === 'cheatsheets') return cheatsheetsVisibleCount
    if (workspaceMode === 'utilities') return utilitiesVisibleCount
    if (workspaceMode === 'daily') return 3
    if (workspaceMode === 'scripting') return filteredScriptingGuides.length
    if (workspaceMode === 'roadmap') return filteredRoadmapSteps.length
    if (singleToolSidebarMode) return filtered.length
    if (showCategoryHub) return filtered.length
    return displayCommands.length
  }, [
    workspaceMode,
    toolsSearchCount,
    techWordsSearchCount,
    conceptsSearchCount,
    portsSearchCount,
    scenariosSearchCount,
    PLAYGROUND_SIMULATION_COUNT,
    ARCHITECTURE_PATTERN_COUNT,
    cheatsheetsVisibleCount,
    utilitiesVisibleCount,
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
    if (workspaceMode === 'concepts') {
      return { count: conceptsSearchCount, noun: 'ideas' }
    }
    if (workspaceMode === 'ports') {
      return { count: portsSearchCount, noun: 'ports' }
    }
    if (workspaceMode === 'scenarios') {
      return { count: scenariosSearchCount, noun: 'scenarios' }
    }
    if (workspaceMode === 'playground') {
      return { count: PLAYGROUND_SIMULATION_COUNT, noun: 'commands' }
    }
    if (workspaceMode === 'architecture') {
      return { count: ARCHITECTURE_PATTERN_COUNT, noun: 'patterns' }
    }
    if (workspaceMode === 'cheatsheets') {
      return { count: cheatsheetsVisibleCount, noun: 'cmds' }
    }
    if (workspaceMode === 'utilities') {
      return { count: utilitiesVisibleCount, noun: 'tools' }
    }
    if (workspaceMode === 'daily') {
      return { count: 3, noun: 'picks' }
    }
    return { count: filtered.length, noun: 'commands' }
  }, [
    workspaceMode,
    toolsSearchCount,
    techWordsSearchCount,
    conceptsSearchCount,
    portsSearchCount,
    scenariosSearchCount,
    PLAYGROUND_SIMULATION_COUNT,
    ARCHITECTURE_PATTERN_COUNT,
    cheatsheetsVisibleCount,
    utilitiesVisibleCount,
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
        tool={tool}
        onToolChange={handleToolChange}
        toolCounts={toolCounts}
        toolLabel={toolLabel}
        headerBadgeCount={headerBadge.count}
        headerBadgeNoun={headerBadge.noun}
        workspaceMode={workspaceMode}
        onWorkspaceModeChange={setWorkspaceMode}
        onLogoHomeClick={onLogoHomeClick}
        toolsCategoryId={toolsCategoryId}
        onSelectToolsCategory={setToolsCategoryId}
        techWordsCategoryId={techWordsCategoryId}
        onSelectTechWordsCategory={setTechWordsCategoryId}
        conceptsCategoryId={conceptsCategoryId}
        onSelectConceptsCategory={setConceptsCategoryId}
        portsCategoryId={portsCategoryId}
        onSelectPortsCategory={setPortsCategoryId}
        onOpenFavorites={() => setFavoritesOpen(true)}
        searchQuery={query}
        onSearchQueryChange={setQuery}
        onGlobalSearchNavigate={handleGlobalNavigate}
        searchBarRef={searchBarRef}
      />

      <WorkspaceModeNav workspaceMode={workspaceMode} onWorkspaceModeChange={setWorkspaceMode} />

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
          className="min-h-0 min-w-0 flex-1 touch-pan-y overflow-x-hidden overflow-y-auto overscroll-y-contain pb-[calc(4.65rem+env(safe-area-inset-bottom,0px))] pl-[max(0.75rem,env(safe-area-inset-left,0px))] pr-[max(0.75rem,env(safe-area-inset-right,0px))] pt-2 outline-none [-webkit-overflow-scrolling:touch] sm:pb-[calc(4.8rem+env(safe-area-inset-bottom,0px))] sm:pl-[max(1rem,env(safe-area-inset-left,0px))] sm:pr-[max(1rem,env(safe-area-inset-right,0px))] sm:pt-3 md:pl-[max(1.25rem,env(safe-area-inset-left,0px))] md:pr-[max(1.25rem,env(safe-area-inset-right,0px))] lg:pb-6 lg:pl-[max(2rem,env(safe-area-inset-left,0px))] lg:pr-[max(2rem,env(safe-area-inset-right,0px))] lg:pt-6"
        >
            <div
              className={
                workspaceMode === 'roadmap' ? 'w-full min-w-0' : 'mx-auto w-full min-w-0 max-w-[1600px]'
              }
            >
              {workspaceMode === 'scripting' ? (
                <div className="sticky top-0 z-[12] -mx-0.5 mb-1 bg-[var(--hub-bg)]/95 pb-0.5 backdrop-blur-md dark:bg-[var(--hub-bg)]/90">
                  <LabTopicChipBar
                    guides={filteredScriptingGuides}
                    activeId={scriptingTopicId}
                    onSelectTopic={setScriptingTopicId}
                    isTopicLearned={labProgress.isLearned}
                  />
                </div>
              ) : null}
              {workspaceMode === 'commands' ? (
                <div className="sticky top-0 z-[12] -mx-0.5 mb-1 bg-[var(--hub-bg)]/95 pb-0.5 backdrop-blur-md dark:bg-[var(--hub-bg)]/90">
                  <CommandsToolChipBar
                    activeToolId={tool}
                    toolCounts={toolCounts}
                    toolLabel={toolLabel}
                    onSelectTool={handleToolChange}
                  />
                </div>
              ) : null}
              <div
                key={
                  workspaceMode === 'scripting'
                    ? `scripting-${scriptingTopicId}`
                    : workspaceMode === 'tools'
                      ? `tools-${toolsCategoryId}`
                      : workspaceMode === 'techwords'
                        ? `techwords-${techWordsCategoryId}`
                        : workspaceMode === 'concepts'
                          ? `concepts-${conceptsCategoryId}`
                          : workspaceMode === 'ports'
                            ? `ports-${portsCategoryId}`
                            : workspaceMode === 'scenarios'
                              ? 'scenarios'
                              : workspaceMode === 'playground'
                                ? `playground-${playgroundTabId}`
                                : workspaceMode === 'architecture'
                                  ? `architecture-${architectureId ?? 'grid'}`
                                  : workspaceMode === 'cheatsheets'
                                    ? `cheatsheets-${cheatsheetTabId}`
                                    : workspaceMode === 'utilities'
                                      ? `utilities-${utilitiesTabId}`
                                      : workspaceMode === 'daily'
                                        ? 'daily'
                                        : mainContentKey
                }
                className="hub-fade-in min-w-0 w-full"
              >
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
                    activeCategoryId={toolsCategoryId}
                    onSelectCategory={setToolsCategoryId}
                    isFavorite={isToolFavorite}
                    toggleFavorite={toggleToolFavorite}
                  />
                )}

                {workspaceMode === 'techwords' && (
                  <TechWordsPage
                    query={query}
                    activeCategoryId={techWordsCategoryId}
                    onSelectCategory={setTechWordsCategoryId}
                    isFavorite={isTechWordFavorite}
                    toggleFavorite={toggleTechWordFavorite}
                  />
                )}

                {workspaceMode === 'concepts' && (
                  <ConceptsPage
                    query={query}
                    activeCategoryId={conceptsCategoryId}
                    onSelectCategory={setConceptsCategoryId}
                  />
                )}

                {workspaceMode === 'ports' && (
                  <PortsPage
                    query={query}
                    activeCategoryId={portsCategoryId}
                    onSelectCategory={setPortsCategoryId}
                  />
                )}

                {workspaceMode === 'scenarios' && <ScenariosPage query={query} />}

                {workspaceMode === 'playground' && (
                  <PlaygroundPage
                    activeTabId={playgroundTabId}
                    onSelectTab={setPlaygroundTabId}
                    inputRef={playgroundInputRef}
                  />
                )}

                {workspaceMode === 'architecture' && (
                  <ArchitecturePage selectedArchitectureId={architectureId} onSelectArchitecture={setArchitectureId} />
                )}

                {workspaceMode === 'cheatsheets' && (
                  <CheatsheetsPage
                    query={query}
                    activeTabId={cheatsheetTabId}
                    onSelectTab={setCheatsheetTabId}
                  />
                )}

                {workspaceMode === 'utilities' && (
                  <UtilitiesPage
                    query={query}
                    activeToolId={utilitiesTabId}
                    onSelectTool={setUtilitiesTabId}
                  />
                )}

                {workspaceMode === 'daily' && <DailyPage toolLabel={toolLabel} />}

                {workspaceMode === 'commands' && showCategoryHub && (
                  <CommandsExplorerHub summaries={categorySummaries} toolLabel={toolLabel} onSelectTool={handleToolChange} />
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
              <Footer />
            </div>
          </main>
      </div>

      <ScrollEdgeButtons />

      <MobileWorkspaceBottomNav workspaceMode={workspaceMode} onWorkspaceModeChange={setWorkspaceMode} />

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
