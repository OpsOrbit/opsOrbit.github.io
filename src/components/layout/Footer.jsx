const social = [
  {
    label: 'GitHub',
    href: 'https://github.com/',
    path: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
  },
]

export default function Footer() {
  return (
    <footer
      className="mt-auto border-t border-hub-line bg-hub-surface/80 backdrop-blur-sm dark:bg-hub-surface/60"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl py-10 pl-[max(1rem,env(safe-area-inset-left,0px))] pr-[max(1rem,env(safe-area-inset-right,0px))] sm:py-12 sm:pl-[max(1.5rem,env(safe-area-inset-left,0px))] sm:pr-[max(1.5rem,env(safe-area-inset-right,0px))] lg:pl-[max(2rem,env(safe-area-inset-left,0px))] lg:pr-[max(2rem,env(safe-area-inset-right,0px))]">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <p className="font-[family-name:Orbitron] text-xs font-bold uppercase tracking-[0.14em] text-hub-brand">thewhitetechnologies</p>
            <p className="mt-2 text-lg font-semibold tracking-tight text-hub-text">DevOps Command Hub</p>
            <p className="mt-2 text-sm leading-relaxed text-hub-sub">
              Curated commands and workflows for Git, cloud, containers, and automation — built for engineers who ship.
            </p>
          </div>
          <div className="flex flex-wrap gap-10 sm:gap-14">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-hub-muted">Navigate</h2>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a
                    href="#main-content"
                    className="text-hub-sub transition-colors duration-200 hover:text-hub-primary"
                  >
                    Commands
                  </a>
                </li>
                <li>
                  <a href="#command-filters" className="text-hub-sub transition-colors duration-200 hover:text-hub-primary">
                    Filters
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-hub-muted">Company</h2>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a
                    href="https://thewhitetechnologies.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-hub-sub transition-colors duration-200 hover:text-hub-primary"
                  >
                    thewhitetechnologies
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-hub-muted">Social</h2>
              <ul className="mt-3 flex gap-3">
                {social.map(({ label, href, path }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-hub-line bg-hub-bg text-hub-sub transition-all duration-200 hover:border-hub-primary/40 hover:bg-hub-elevated hover:text-hub-primary dark:bg-hub-elevated/50"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path
                          fillRule="evenodd"
                          d={path}
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <p className="mt-10 border-t border-hub-line/80 pt-8 text-center text-xs text-hub-muted">
          © {new Date().getFullYear()} thewhitetechnologies · DevOps Command Hub
        </p>
      </div>
    </footer>
  )
}
