import { useEffect } from "react";

/**
 * Lerp-based smooth scroll (à la Locomotive — lite) on desktop, plus parallax
 * for [data-speed] elements. A ResizeObserver keeps the scroll range synced to
 * the container height, so content/height changes (e.g. switching language)
 * never leave the footer unreachable.
 */
export function useSmoothScroll(containerRef) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const smooth =
      !reduced &&
      window.matchMedia("(hover: hover)").matches &&
      window.innerWidth >= 900;

    const parallaxEls = [...container.querySelectorAll("[data-speed]")].map((el) => ({
      el,
      speed: parseFloat(el.getAttribute("data-speed")),
      baseY: 0,
    }));
    const getDocTop = (el) => {
      let y = 0, node = el;
      while (node) { y += node.offsetTop; node = node.offsetParent; }
      return y;
    };
    const cacheParallax = () =>
      parallaxEls.forEach((p) => { p.baseY = getDocTop(p.el) + p.el.offsetHeight / 2; });
    const applyParallax = (scroll) => {
      const viewCenter = scroll + window.innerHeight / 2;
      parallaxEls.forEach((p) => {
        const offset = (viewCenter - p.baseY) * p.speed;
        p.el.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
    };

    let raf, ro, onScroll, current = 0;

    if (smooth) {
      Object.assign(container.style, {
        position: "fixed", top: "0", left: "0", width: "100%", willChange: "transform",
      });
      const setHeight = () => {
        document.body.style.height = container.getBoundingClientRect().height + "px";
      };
      setHeight();
      cacheParallax();
      ro = new ResizeObserver(() => { setHeight(); cacheParallax(); });
      ro.observe(container);

      const render = () => {
        current += (window.scrollY - current) * 0.085;
        container.style.transform = `translate3d(0, ${-current}px, 0)`;
        applyParallax(current);
        raf = requestAnimationFrame(render);
      };
      render();
    } else {
      cacheParallax();
      applyParallax(window.scrollY);
      onScroll = () => applyParallax(window.scrollY);
      window.addEventListener("scroll", onScroll, { passive: true });
      ro = new ResizeObserver(() => cacheParallax());
      ro.observe(container);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      if (onScroll) window.removeEventListener("scroll", onScroll);
      document.body.style.height = "";
      Object.assign(container.style, { position: "", top: "", left: "", width: "", transform: "", willChange: "" });
    };
  }, []);
}
