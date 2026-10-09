"use client";

import { useMemo, useState } from "react";
import { HOME_PIN, LAND, PINS, pos } from "@/lib/map";

export function CountryMap() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const dots = useMemo(() => {
    const out: { key: string; x: number; y: number; delay: number }[] = [];
    for (let lat = 61; lat >= 26; lat--) {
      (LAND[lat] || []).forEach((range) => {
        for (let lon = range[0]; lon <= range[1]; lon++) {
          const p = pos(lat, lon);
          out.push({ key: `${lat}-${lon}`, x: p.x, y: p.y, delay: (lon + 11) * 0.012 + (61 - lat) * 0.006 });
        }
      });
    }
    return out;
  }, []);

  const home = pos(HOME_PIN.lat, HOME_PIN.lon);

  return (
    <div className="map" id="map" role="group" aria-label="Mappa dei paesi in cui abbiamo realizzato progetti">
      {dots.map((d) => (
        <span key={d.key} className="mdot" style={{ left: `${d.x.toFixed(3)}%`, top: `${d.y.toFixed(3)}%`, animationDelay: `${d.delay.toFixed(3)}s` }} />
      ))}

      <div className="home-pin" style={{ left: `${home.x}%`, top: `${home.y}%` }}>
        <div className="home-pin__marker">
          <span className="home-pin__dot">
            <span className="home-pin__dot-core" />
          </span>
          <span className="home-pin__label">{HOME_PIN.label}</span>
        </div>
      </div>

      {PINS.map((p, i) => {
        const q = pos(p.lat, p.lon);
        const label = p.n === 1 ? "progetto realizzato" : "progetti realizzati";
        const on = activeId === p.id;
        const tipPos: React.CSSProperties = q.x > 78 ? { right: 4 } : q.x < 14 ? { left: 4 } : { left: "50%", transform: "translateX(-50%)" };
        return (
          <button
            key={p.id}
            type="button"
            className={`pin${on ? " on" : ""}`}
            style={{ left: `${q.x}%`, top: `${q.y}%`, animationDelay: `${(0.9 + i * 0.07).toFixed(2)}s` }}
            aria-label={`${p.name}: ${p.n} ${label}`}
            onMouseEnter={() => setActiveId(p.id)}
            onMouseLeave={() => setActiveId((cur) => (cur === p.id ? null : cur))}
            onFocus={() => setActiveId(p.id)}
            onBlur={() => setActiveId((cur) => (cur === p.id ? null : cur))}
            onClick={() => setActiveId((cur) => (cur === p.id ? null : p.id))}
          >
            <span className="ring" style={{ animationDelay: `${(i * 0.17).toFixed(2)}s` }} />
            <span className="core" />
            <span className="tip" style={tipPos}>
              <span className="pin__tip-name">{p.name}</span>
              <span className="disp pin__tip-count">
                {p.n} <span className="pin__tip-count-label">{label}</span>
              </span>
              {p.last && <span className="pin__tip-last">Ultimo: {p.last}</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}
