import { useEffect, useRef, useState } from "react";
import { useInView } from "../hooks/useInView";
import { useApp } from "../i18n.jsx";

/* Scroll-reveal wrapper (fade + rise). Renders the real element via `as`. */
export function Reveal({ as: Tag = "div", className = "", children, ...rest }) {
  const [ref, inView] = useInView();
  const cls = `reveal-up${inView ? " in" : ""}${className ? " " + className : ""}`;
  return (
    <Tag ref={ref} className={cls} {...rest}>
      {children}
    </Tag>
  );
}

/* Scroll-reveal element whose content is rich HTML (em / br / rainbow). */
export function RevealHtml({ as: Tag = "h2", className = "", html, ...rest }) {
  const [ref, inView] = useInView();
  const cls = `reveal-up${inView ? " in" : ""}${className ? " " + className : ""}`;
  return <Tag ref={ref} className={cls} dangerouslySetInnerHTML={{ __html: html }} {...rest} />;
}

/*
 * Masked, line-by-line title reveal. Each line slides up from behind a clip.
 * - animateOnLoad: hero plays on initial load (after preloader)
 * - otherwise:     plays when the title scrolls into view
 * State persists across re-renders, so switching language never re-hides it.
 */
export function LineTitle({ as: Tag = "h2", className = "", lines, animateOnLoad = false }) {
  const [ref, inView] = useInView({ threshold: 0.2, rootMargin: "0px 0px -5% 0px" });
  const { loaded, reduced } = useApp();
  const show = reduced || (animateOnLoad ? loaded : inView);

  return (
    <Tag ref={ref} className={className}>
      {lines.map((html, i) => (
        <span className="line" key={i}>
          <span
            style={{
              transform: show ? "translateY(0)" : "translateY(110%)",
              transitionDelay: `${0.1 + i * 0.12}s`,
            }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </span>
      ))}
    </Tag>
  );
}

/* Count-up number that animates once when it scrolls into view. */
export function Counter({ target, suffix = "" }) {
  const [ref, inView] = useInView({ threshold: 0.6 });
  const { reduced } = useApp();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) { setVal(target); return; }
    let raf, start;
    const dur = 2000;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(step);
      else setVal(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, reduced]);

  const display = target >= 10000 ? Math.floor(val).toLocaleString("en-US") : Math.floor(val);
  return <span className="counter" ref={ref}>{display}{suffix}</span>;
}

/*
 * Infinite marquee. Direction alternates by index; speed reacts to scroll
 * velocity. Re-reads the first span's width each frame so it adapts when the
 * text changes length (language switch).
 */
export function Marquee({ text, variant = "lg", index = 0 }) {
  const trackRef = useRef(null);
  const firstRef = useRef(null);
  const { reduced } = useApp();

  useEffect(() => {
    if (reduced) return;
    let offset = 0, extra = 0, prevY = window.scrollY, raf;
    const baseSpeed = variant === "lg" ? 1.1 : 0.7;
    const dir = index % 2 === 0 ? -1 : 1;

    const onScroll = () => {
      extra = (window.scrollY - prevY) * 0.15;
      prevY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const move = () => {
      const w = firstRef.current ? firstRef.current.offsetWidth : 1;
      offset += (baseSpeed + Math.abs(extra) * 0.4) * dir;
      if (dir < 0 && offset <= -w) offset += w;
      if (dir > 0 && offset >= 0) offset -= w;
      if (trackRef.current) trackRef.current.style.transform = `translate3d(${offset}px,0,0)`;
      extra *= 0.9;
      raf = requestAnimationFrame(move);
    };
    move();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [variant, index, reduced]);

  return (
    <div className={`marquee marquee--${variant}`}>
      <div className="marquee__track" ref={trackRef}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} ref={i === 0 ? firstRef : null}>{text}</span>
        ))}
      </div>
    </div>
  );
}
