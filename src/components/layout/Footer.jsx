import { BRAND_NAME, CREATOR_LINKEDIN_URL, CREATOR_NAME } from '../../brand'

/** Official LinkedIn mark — single-color for hover/currentColor styling */
function LinkedInIcon({ className = 'h-4 w-4 sm:h-[1.125rem] sm:w-[1.125rem]' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer
      className="mt-4 shrink-0 border-t border-[var(--hub-line)] bg-[var(--hub-surface)]/90 pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] pt-3 backdrop-blur-md dark:bg-[var(--hub-elevated)]/50 sm:mt-5 sm:pb-[calc(4.8rem+env(safe-area-inset-bottom,0px))] sm:pt-4 lg:mt-6 lg:pb-5"
      role="contentinfo"
    >
      <div className="mx-auto max-w-[1600px] px-3 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-1.5 text-center sm:gap-2">
          <p className="flex max-w-md flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-[13px] leading-snug text-[var(--hub-muted)] sm:max-w-none sm:text-sm sm:text-[15px]">
            <span className="text-[var(--hub-sub)]">Developed by</span>
            <a
              href={CREATOR_LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex max-w-full items-center gap-2 rounded-md font-semibold text-[var(--hub-text)] outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[var(--hub-tool)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hub-surface)] dark:focus-visible:ring-offset-[var(--hub-bg)]"
            >
              <span className="text-[#0A66C2] transition-colors duration-200 group-hover:text-[#004182] dark:text-[#70b5f9] dark:group-hover:text-[#a8d4ff]">
                <LinkedInIcon />
              </span>
              <span className="underline-offset-[3px] transition-colors duration-200 group-hover:text-[var(--hub-tool)] group-hover:underline group-hover:decoration-[var(--hub-tool)]">
                {CREATOR_NAME}
              </span>
              <span className="sr-only">(opens LinkedIn in a new tab)</span>
            </a>
          </p>
          <p className="text-[11px] text-[var(--hub-muted)] sm:text-xs">
            © {new Date().getFullYear()} {BRAND_NAME}
          </p>
        </div>
      </div>
    </footer>
  )
}
