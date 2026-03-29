import { useState } from 'react'
import { BRAND_NAME } from '../brand'

/** Public asset: add `public/logo1.mp4` (Vite serves it at /logo1.mp4). */
function logoUrl() {
  const base = import.meta.env.BASE_URL || '/'
  return `${base.endsWith('/') ? base : `${base}/`}logo1.mp4`
}

/**
 * Header mark: video fills the frame with object-cover (no side letterboxing).
 * Uses normal scale only — avoids the old 155% zoom that clipped the wordmark.
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
      className={`relative shrink-0 overflow-hidden rounded-lg border border-[var(--hub-tool)]/35 bg-[#060a10] shadow-sm ${className}`}
    >
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
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
