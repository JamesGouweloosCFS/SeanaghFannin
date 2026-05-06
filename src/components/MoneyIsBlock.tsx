import { useEffect, useRef, useState, type RefObject } from "react";
import { Link } from "react-router-dom";
import heroLionBg from "@assets/Carrick_Catalyst_Hero_Baner_19200x800 1 (1).png";
import "./money-is-block.css";

/** Rotating headline sequence (normal spaces so long phrases can wrap inside the disc). */
const ROTATING_PHRASES = [
  { id: "freedom", text: "Freedom" },
  { id: "peace", text: "Peace of Mind" },
  { id: "independence", text: "Independence" },
  { id: "opportunity", text: "Opportunity" },
  { id: "security", text: "Security" },
  { id: "equality", text: "Equality" },
  { id: "power", text: "Power" },
] as const;

type StatDef =
  | { id: string; type: "count"; end: number; suffix: string; label: string }
  | { id: string; type: "text"; value: string; label: string };

const STATS: readonly StatDef[] = [
  { id: "single", type: "count", end: 74, suffix: "%", label: "of women die single" },
  { id: "earn", type: "count", end: 16, suffix: "%", label: "less in earnings than male counterparts" },
  { id: "peak", type: "count", end: 11, suffix: " year", label: "earlier peak in salaries than men" },
  { id: "cost", type: "text", value: "R100,000s", label: "the cost of this reality over a woman's lifetime" },
];

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = () => setReduced(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduced;
}

function useInViewOnce(ref: RefObject<HTMLElement | null>): boolean {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const ob = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          ob.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, [ref, seen]);
  return seen;
}

function useCountUp(
  end: number,
  active: boolean,
  reducedMotion: boolean,
  durationMs: number,
  startDelayMs: number,
): number {
  const [value, setValue] = useState(() => (reducedMotion && active ? end : 0));

  useEffect(() => {
    if (!active) return;
    if (reducedMotion) {
      setValue(end);
      return;
    }
    let raf = 0;
    const startAt = performance.now() + startDelayMs;

    const tick = (now: number) => {
      if (now < startAt) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const elapsed = now - startAt;
      const t = Math.min(1, elapsed / durationMs);
      const eased = 1 - (1 - t) ** 3;
      setValue(Math.round(eased * end));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, end, reducedMotion, durationMs, startDelayMs]);

  return value;
}

function CountStat({
  end,
  suffix,
  label,
  active,
  reducedMotion,
  startDelayMs,
}: {
  end: number;
  suffix: string;
  label: string;
  active: boolean;
  reducedMotion: boolean;
  startDelayMs: number;
}) {
  const n = useCountUp(end, active, reducedMotion, 1100, startDelayMs);
  return (
    <div className="money-block__stat">
      <p className="money-block__value">
        {n}
        {suffix}
      </p>
      <p className="money-block__label">{label}</p>
    </div>
  );
}

function TextStat({
  value,
  label,
  active,
  reducedMotion,
  startDelayMs,
}: {
  value: string;
  label: string;
  active: boolean;
  reducedMotion: boolean;
  startDelayMs: number;
}) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!active) return;
    if (reducedMotion) {
      setShown(true);
      return;
    }
    const t = window.setTimeout(() => setShown(true), startDelayMs);
    return () => clearTimeout(t);
  }, [active, reducedMotion, startDelayMs]);

  return (
    <div className="money-block__stat">
      <p className={`money-block__value money-block__value--reveal ${shown ? "money-block__value--shown" : ""}`}>{value}</p>
      <p className={`money-block__label money-block__label--reveal ${shown ? "money-block__value--shown" : ""}`}>{label}</p>
    </div>
  );
}

export function MoneyIsBlock() {
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useInViewOnce(sectionRef);
  const reducedMotion = usePrefersReducedMotion();
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [statsActive, setStatsActive] = useState(false);

  const activePhraseIndex = reducedMotion ? 0 : phraseIdx;

  useEffect(() => {
    if (!visible) return;
    if (reducedMotion) {
      setStatsActive(true);
      return;
    }
    const t = window.setTimeout(() => setStatsActive(true), 650);
    return () => clearTimeout(t);
  }, [visible, reducedMotion]);

  useEffect(() => {
    if (!visible || reducedMotion) return;
    const id = window.setInterval(() => {
      setPhraseIdx((i) => (i + 1) % ROTATING_PHRASES.length);
    }, 3400);
    return () => clearInterval(id);
  }, [visible, reducedMotion]);

  return (
    <section ref={sectionRef} className="money-block" aria-labelledby="money-block-title">
      <h2 id="money-block-title" className="visually-hidden">
        Money is: perspectives on wealth and women
      </h2>
      <div className="money-block__hero">
        <img className="money-block__bg" src={heroLionBg} alt="" decoding="async" />
        <div className="money-block__fade" aria-hidden />
        <div className="money-block__circle-wrap">
          <div className={`money-block__circle ${visible ? "money-block__circle--in" : ""}`}>
            <div className="money-block__circle-inner">
              <p className="money-block__kicker">Money is</p>
              <div
                className="money-block__headline money-heading__dynamic-wrapper"
                aria-live="polite"
                aria-atomic="true"
              >
                {ROTATING_PHRASES.map((p, i) => (
                  <span
                    key={p.id}
                    className={
                      i === activePhraseIndex
                        ? "money-heading__dynamic-text money-heading__dynamic-text--active"
                        : "money-heading__dynamic-text money-heading__dynamic-text--inactive"
                    }
                  >
                    {p.text}
                  </span>
                ))}
              </div>
              <p className="money-block__sub">
                What do you want yours to do for you?
                <br />
                <strong>Together</strong> we&apos;ll get you there.
              </p>
              <Link className="money-block__cta" to="/booking">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="money-block__stats">
        <div className="money-block__stats-inner">
          {STATS.map((stat, i) => {
            const stagger = i * 100;
            if (stat.type === "text") {
              return (
                <TextStat
                  key={stat.id}
                  value={stat.value}
                  label={stat.label}
                  active={statsActive}
                  reducedMotion={reducedMotion}
                  startDelayMs={450 + stagger}
                />
              );
            }
            return (
              <CountStat
                key={stat.id}
                end={stat.end}
                suffix={stat.suffix}
                label={stat.label}
                active={statsActive}
                reducedMotion={reducedMotion}
                startDelayMs={stagger}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
