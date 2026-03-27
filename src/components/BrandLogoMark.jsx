import { useState } from 'react'
import { BRAND_NAME } from '../brand'

/** Public asset: add `public/logo.mp4` in the project root (Vite serves it at /logo.mp4). */
function logoUrl() {
  const base = import.meta.env.BASE_URL || '/'
  return `${base.endsWith('/') ? base : `${base}/`}logo.mp4`
}

/**
 * Header / nav mark: looping muted video, with gradient + initial fallback if the file is missing.
 */
export default function BrandLogoMark({ className = 'h-7 w-7' }) {
  const [videoFailed, setVideoFailed] = useState(false)
  const src = logoUrl()

  if (videoFailed) {
    return (
      <div
        className={`flex shrink-0 items-center justify-center rounded-lg border border-[var(--hub-tool)]/35 text-sm font-bold text-white shadow-sm ${className}`}
        style={{
          background: 'linear-gradient(135deg, var(--hub-primary-hover), var(--hub-primary))',
        }}
        aria-hidden
      >
        {BRAND_NAME.charAt(0).toUpperCase()}
      </div>
    )
  }

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-lg border border-[var(--hub-tool)]/35 shadow-sm ${className}`}
      style={{
        /* Match typical logo video backdrop so encoded pillarboxing blends away */
        background: 'linear-gradient(180deg, #0f172a 0%, #0c1222 50%, #0a1628 100%)',
      }}
    >
      <video
        className="h-full w-full min-h-full min-w-full object-cover object-center scale-[1.18] sm:scale-[1.22]"
        style={{ backgroundColor: 'transparent' }}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onError={() => setVideoFailed(true)}
        aria-label={BRAND_NAME}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  )
}
