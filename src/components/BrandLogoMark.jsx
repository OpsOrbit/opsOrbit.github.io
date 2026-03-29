import { useState } from 'react'
import { BRAND_NAME } from '../brand'

/** Public asset: add `public/logo.mp4` in the project root (Vite serves it at /logo.mp4). */
function logoUrl() {
  const base = import.meta.env.BASE_URL || '/'
  return `${base.endsWith('/') ? base : `${base}/`}logo.mp4`
}

/**
 * Header mark: video scaled past the frame so pillarboxing in the file is cropped away.
 * Wrapper uses theme surface (not black) for any sub-pixel gaps.
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
      className={`relative shrink-0 overflow-hidden rounded-lg border border-[var(--hub-tool)]/35 bg-[var(--hub-surface)] shadow-sm dark:bg-[var(--hub-elevated)] ${className}`}
    >
      <video
        className="pointer-events-none absolute left-1/2 top-1/2 block min-h-[155%] min-w-[155%] -translate-x-1/2 -translate-y-1/2 object-cover object-center"
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
