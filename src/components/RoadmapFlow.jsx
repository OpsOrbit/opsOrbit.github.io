import Card from './ui/Card'
import { ROADMAP_LANES, ROADMAP_FINAL_ORDER } from '../data/roadmapData'

function LaneCard({ lane, idx }) {
  return (
    <article
      className="relative min-w-[280px] rounded-xl border border-[var(--hub-line)] bg-[var(--hub-card)] p-4 shadow-[var(--hub-shadow-card)]"
    >
      <h3 className="text-[12px] font-bold uppercase tracking-wide text-[var(--hub-tool)]">{lane.title}</h3>
      <p className="mt-1 text-[11px] font-semibold text-[var(--hub-muted)]">{lane.tools}</p>
      <ol className="mt-3 list-disc space-y-1.5 pl-4 text-[12px] leading-relaxed text-[var(--hub-sub)]">
        {lane.topics.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ol>
      <span className="mt-3 inline-flex rounded-md border border-[var(--hub-border2)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[var(--hub-muted)]">
        Module {idx + 1}
      </span>
    </article>
  )
}

/**
 * @param {typeof ROADMAP_LANES} [lanes]
 * @param {typeof ROADMAP_FINAL_ORDER} [finalOrderLines]
 * @param {boolean} [searchFiltered] When true, use a wrapped layout instead of the wide horizontal strip.
 */
export default function RoadmapFlow({
  lanes = ROADMAP_LANES,
  finalOrderLines = ROADMAP_FINAL_ORDER,
  searchFiltered = false,
}) {
  const showWideStrip = !searchFiltered

  return (
    <section className="space-y-4 pb-8">
      <header className="rounded-xl border border-[var(--hub-line)] bg-[var(--hub-card)] p-4 sm:p-5">
        <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--hub-tool)]">Roadmap</p>
        <p className="mt-1 text-[14px] leading-relaxed text-[var(--hub-sub)]">
          Tool-by-tool topics to cover. Complete module 1 to 18, then follow the final learning order.
        </p>
      </header>

      {lanes.length === 0 ? (
        <Card className="border-dashed border-[var(--hub-line)] bg-[var(--hub-card)] px-8 py-14 text-center">
          <p className="text-base leading-relaxed text-[var(--hub-sub)]">
            No roadmap modules match your search. Try different keywords.
          </p>
        </Card>
      ) : showWideStrip ? (
        <div className="overflow-x-auto pb-2 [scrollbar-width:thin]">
          <div className="min-w-[5200px]">
            <div
              className="grid gap-3"
              style={{ gridTemplateColumns: `repeat(${lanes.length}, minmax(280px, 1fr))` }}
            >
              {lanes.map((lane) => {
                const idx = ROADMAP_LANES.findIndex((l) => l.id === lane.id)
                return <LaneCard key={lane.id} lane={lane} idx={idx >= 0 ? idx : 0} />
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {lanes.map((lane) => {
            const idx = ROADMAP_LANES.findIndex((l) => l.id === lane.id)
            return <LaneCard key={lane.id} lane={lane} idx={idx >= 0 ? idx : 0} />
          })}
        </div>
      )}

      <section className="rounded-xl border border-[var(--hub-line)] bg-[var(--hub-card)] p-4 sm:p-5">
        <h3 className="text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--hub-tool)]">Final learning order</h3>
        {finalOrderLines.length === 0 ? (
          <p className="mt-2 text-[13px] leading-relaxed text-[var(--hub-sub)]">
            No items match your search in this list.
          </p>
        ) : (
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-[13px] leading-relaxed text-[var(--hub-sub)]">
            {finalOrderLines.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        )}
      </section>
    </section>
  )
}
