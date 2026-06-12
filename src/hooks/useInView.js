import { useEffect, useRef, useState } from "react";

/**
 * Returns [ref, inView]. Once the element enters the viewport, inView flips
 * to true and stays true (the observer disconnects) — mirrors the original
 * one-shot reveal behaviour and survives re-renders (e.g. language switches).
 */
export function useInView(options) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      options || { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, inView];
}
