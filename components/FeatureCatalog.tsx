"use client";

import { useMemo, useState } from "react";
import { AREAS } from "@/lib/features";
import { Icon } from "./Icon";

/** Every feature Riflay has, by area: M3 filter chips, a search field, and one card per area. */
export function FeatureCatalog() {
  const [area, setArea] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return AREAS.filter((a) => !area || a.id === area)
      .map((a) => ({
        ...a,
        features: q
          ? a.features.filter((f) => `${f.name} ${f.what} ${f.where} ${a.name}`.toLowerCase().includes(q))
          : a.features,
      }))
      .filter((a) => a.features.length > 0);
  }, [area, query]);

  const count = shown.reduce((n, a) => n + a.features.length, 0);

  return (
    <div className="catalog">
      <div className="catalog__bar">
        <label className="search">
          <Icon name="search" />
          <input
            type="search"
            placeholder="Find a feature, like “FLAC” or “AirPlay”"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Find a feature"
          />
          {query && (
            <button type="button" className="icon-btn icon-btn--sm" aria-label="Clear" onClick={() => setQuery("")}>
              <Icon name="close" />
            </button>
          )}
        </label>
        <div className="catalog__chips" role="group" aria-label="Areas">
          <button type="button" className="fchip" aria-pressed={area === null} onClick={() => setArea(null)}>
            {area === null && <Icon name="check" />}
            All
          </button>
          {AREAS.map((a) => (
            <button
              key={a.id}
              type="button"
              className="fchip"
              aria-pressed={area === a.id}
              onClick={() => setArea(area === a.id ? null : a.id)}
            >
              {area === a.id ? <Icon name="check" /> : <Icon name={a.icon} />}
              {a.name}
            </button>
          ))}
        </div>
      </div>

      <p className="catalog__count body-medium muted" aria-live="polite">
        {count} {count === 1 ? "feature" : "features"}
      </p>

      <div className="catalog__grid">
        {shown.map((a) => (
          <section key={a.id} className="area" aria-labelledby={`area-${a.id}`}>
            <header className="area__head">
              <Icon name={a.icon} />
              <h3 id={`area-${a.id}`} className="title-large">
                {a.name}
              </h3>
              <span className="area__n">{a.features.length}</span>
            </header>
            <ul className="area__list">
              {a.features.map((f) => (
                <li key={f.name}>
                  <p className="title-medium">{f.name}</p>
                  <p className="body-medium muted">{f.what}</p>
                  <span className="where">{f.where}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
        {shown.length === 0 && (
          <p className="muted catalog__empty">
            Nothing matches “{query}”. Try another word, or <button type="button" className="linkish" onClick={() => { setQuery(""); setArea(null); }}>show everything</button>.
          </p>
        )}
      </div>
    </div>
  );
}
