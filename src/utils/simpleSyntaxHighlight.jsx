import { Fragment } from 'react'

const C = {
  comment: 'text-[var(--hub-muted)] italic',
  keyword: 'font-semibold text-sky-500 dark:text-sky-400',
  string: 'text-emerald-600 dark:text-emerald-400',
  number: 'text-amber-600 dark:text-amber-300',
  plain: 'text-[var(--hub-code-text)]',
}

function span(cls, text, key) {
  return (
    <span key={key} className={cls}>
      {text}
    </span>
  )
}

/** Dockerfile: instruction vs comment vs rest */
function highlightDockerfileLine(line, i) {
  const t = line.trimStart()
  if (t.startsWith('#')) {
    return span(C.comment, line, i)
  }
  const m = line.match(/^(\s*)([A-Z][A-Z0-9_]*)(\s*)(.*)$/)
  if (m) {
    return (
      <Fragment key={i}>
        {m[1]}
        {span(C.keyword, m[2], `${i}-k`)}
        {m[3]}
        {highlightRest(m[4], `${i}-r`)}
      </Fragment>
    )
  }
  return span(C.plain, line, i)
}

function highlightRest(s, keyPrefix) {
  if (!s) return null
  const parts = s.split(/('[^']*'|"[^"]*")/g)
  return parts.map((p, j) => {
    if ((p.startsWith("'") && p.endsWith("'")) || (p.startsWith('"') && p.endsWith('"'))) {
      return span(C.string, p, `${keyPrefix}-${j}`)
    }
    return span(C.plain, p, `${keyPrefix}-${j}`)
  })
}

/** YAML-ish: key:, comments, strings */
function highlightYamlLine(line, i) {
  if (/^\s*#/.test(line)) return span(C.comment, line, i)
  const km = line.match(/^(\s*)([a-zA-Z0-9_.-]+)(:\s*)(.*)$/)
  if (km) {
    return (
      <Fragment key={i}>
        {km[1]}
        {span(C.keyword, km[2], `${i}-k`)}
        {span(C.plain, km[3], `${i}-c`)}
        {highlightRest(km[4], `${i}-r`)}
      </Fragment>
    )
  }
  return span(C.plain, line, i)
}

/** Bash / shell one-liners */
function highlightBashLine(line, i) {
  if (/^\s*#/.test(line)) return span(C.comment, line, i)
  const tokens = line.split(/(\|\||&&|\||'[^']*'|"[^"]*"|\$[a-zA-Z_][a-zA-Z0-9_]*)/g)
  return (
    <Fragment key={i}>
      {tokens.map((tok, j) => {
        if (tok === '||' || tok === '&&' || tok === '|') return span(C.keyword, tok, `${i}-${j}`)
        if (/^['"]/.test(tok)) return span(C.string, tok, `${i}-${j}`)
        if (/^\$/.test(tok)) return span(C.number, tok, `${i}-${j}`)
        return span(C.plain, tok, `${i}-${j}`)
      })}
    </Fragment>
  )
}

/** HCL-ish: comments + block keywords */
function highlightHclLine(line, i) {
  if (/^\s*#/.test(line)) return span(C.comment, line, i)
  const bm = line.match(/^(\s*)(resource|data|variable|output|module|provider|terraform)\s+/)
  if (bm) {
    const rest = line.slice(bm[0].length)
    return (
      <Fragment key={i}>
        {bm[1]}
        {span(C.keyword, bm[2], `${i}-k`)}
        {' '}
        {highlightRest(rest, `${i}-r`)}
      </Fragment>
    )
  }
  return span(C.plain, line, i)
}

/**
 * @param {string} code
 * @param {string} lang dockerfile | yaml | bash | hcl
 */
export function highlightCode(code, lang = 'bash') {
  const lines = code.split('\n')
  const fn =
    lang === 'dockerfile'
      ? highlightDockerfileLine
      : lang === 'yaml'
        ? highlightYamlLine
        : lang === 'hcl'
          ? highlightHclLine
          : highlightBashLine

  return lines.map((line, i) => (
    <Fragment key={i}>
      {i > 0 ? '\n' : null}
      {fn(line, i)}
    </Fragment>
  ))
}
