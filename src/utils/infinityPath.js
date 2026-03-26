/**
 * Horizontal lemniscate (∞) — matches classic DevOps / DevSecOps loop geometry.
 * Parametric form: x = cos(t)/(1+sin²t), y = sin(t)cos(t)/(1+sin²t), scaled to viewBox.
 *
 * @param {number} width - viewBox width
 * @param {number} height - viewBox height
 * @param {number} [segments=140] - segments (more = smoother offset-path)
 */
export function getInfinityPathD(width, height, segments = 140) {
  const cx = width / 2
  const cy = height / 2
  /* Horizontal ∞: major extent is left–right; keep vertical swing modest so motion reads lateral + depth (with CSS tilt), not “bobbing” up/down. */
  const a = width * 0.39
  const yStretch = (height / width) * 0.36

  const parts = []
  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * Math.PI * 2
    const den = 1 + Math.sin(t) ** 2
    const x = cx + (a * Math.cos(t)) / den
    const y = cy + (a * yStretch * Math.sin(t) * Math.cos(t)) / den
    parts.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`)
  }
  return parts.join(' ')
}
