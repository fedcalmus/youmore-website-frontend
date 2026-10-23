"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Project, ProjectScope } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";
import { SearchIcon } from "./icons";

const TYPES = ["Scambio giovanile", "Training course", "Volontariato", "Formazione"];
const PAGE_SIZE = 6;

export function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const params = useSearchParams();
  const [scope, setScope] = useState<ProjectScope>(params.get("ambito") === "naz" ? "naz" : "int");
  const [status, setStatus] = useState<"open" | "ended">(params.get("stato") === "terminati" ? "ended" : "open");
  const [type, setType] = useState("all");
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(PAGE_SIZE);

  const inScope = useMemo(() => projects.filter((p) => p.scope === scope), [projects, scope]);
  const q = query.trim().toLowerCase();
  const list = useMemo(
    () =>
      inScope.filter(
        (p) =>
          p.state === status &&
          (type === "all" || p.type === type) &&
          (!q || `${p.title} ${p.location ?? ""}`.toLowerCase().includes(q))
      ),
    [inScope, status, type, q]
  );

  const visible = list.slice(0, limit);
  const rest = list.length - limit;

  function resetFilters() {
    setType("all");
    setQuery("");
    setLimit(PAGE_SIZE);
  }

  return (
    <>
      <section className="explorer__filters">
        <div className="explorer__scope" role="tablist" aria-label="Ambito">
          {(["int", "naz"] as const).map((k) => (
            <button
              key={k}
              type="button"
              role="tab"
              className="big"
              aria-selected={scope === k}
              onClick={() => {
                setScope(k);
                setLimit(PAGE_SIZE);
              }}
            >
              <span className="big__info">
                <span className="disp big__info-title">{k === "int" ? "Internazionali" : "Nazionali"}</span>
                <span className="big__info-sub">{k === "int" ? "Scambi, training, volontariato all'estero" : "Attività e formazione in Italia"}</span>
              </span>
              <span className="disp big__count">{projects.filter((p) => p.scope === k).length}</span>
            </button>
          ))}
        </div>

        <div className="explorer__toolbar">
          <div className="explorer__segtrack">
            <button
              type="button"
              className="seg"
              aria-pressed={status === "open"}
              onClick={() => {
                setStatus("open");
                setLimit(PAGE_SIZE);
              }}
            >
              <span className="seg__dot" />
              In corso · <span>{inScope.filter((p) => p.state === "open").length}</span>
            </button>
            <button
              type="button"
              className="seg"
              aria-pressed={status === "ended"}
              onClick={() => {
                setStatus("ended");
                setLimit(PAGE_SIZE);
              }}
            >
              Terminati · <span>{inScope.filter((p) => p.state === "ended").length}</span>
            </button>
          </div>
          <div className="explorer__chips">
            <button
              type="button"
              className="chip"
              aria-pressed={type === "all"}
              onClick={() => {
                setType("all");
                setLimit(PAGE_SIZE);
              }}
            >
              Tutti
            </button>
            {TYPES.map((t) => (
              <button
                key={t}
                type="button"
                className="chip"
                aria-pressed={type === t}
                onClick={() => {
                  setType(t);
                  setLimit(PAGE_SIZE);
                }}
              >
                {t}
              </button>
            ))}
          </div>
          <label className="explorer__search">
            <span className="explorer__search-icon">
              <SearchIcon />
            </span>
            <span className="sr">Cerca un progetto o un paese</span>
            <input
              className="search"
              type="search"
              placeholder="Cerca titolo o paese"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setLimit(PAGE_SIZE);
              }}
            />
          </label>
        </div>
      </section>

      <section className="explorer__results-section">
        <div className="explorer__count" aria-live="polite">
          {list.length === 1 ? "1 progetto" : `${list.length} progetti`}
        </div>
        {list.length > 0 ? (
          <div className="explorer__grid">
            {visible.map((p, i) => (
              <ProjectCard key={p.slug} project={p} delay={(i % 6) * 0.06} />
            ))}
          </div>
        ) : (
          <div className="explorer__empty">
            <div className="disp explorer__empty-title">Nessun progetto qui, per ora.</div>
            <p className="explorer__empty-text">Prova a modificare i filtri di ricerca.</p>
            <div className="explorer__empty-actions">
              <button type="button" className="btn btn-panel" onClick={resetFilters}>
                Azzera filtri
              </button>
            </div>
          </div>
        )}
        {rest > 0 && (
          <div className="explorer__more">
            <button type="button" className="btn btn-outline" onClick={() => setLimit((l) => l + PAGE_SIZE)}>
              Mostra altri {Math.min(PAGE_SIZE, rest)}
            </button>
          </div>
        )}
      </section>
    </>
  );
}
