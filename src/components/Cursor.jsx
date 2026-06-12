import { useEffect, useRef } from "react";

export function Cursor() {
  const cRef = useRef(null);
  const dRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let cx = mx, cy = my, raf;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener("mousemove", onMove);

    const loop = () => {
      cx += (mx - cx) * 0.18;
      cy += (my - cy) * 0.18;
      if (cRef.current) cRef.current.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      if (dRef.current) dRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    // Delegation — handles dynamically rendered [data-cursor] elements.
    const over = (e) => {
      const el = e.target.closest("[data-cursor]");
      if (el && cRef.current) cRef.current.classList.add(el.getAttribute("data-cursor"));
    };
    const out = (e) => {
      const el = e.target.closest("[data-cursor]");
      if (el && cRef.current) cRef.current.classList.remove(el.getAttribute("data-cursor"));
    };
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={cRef} />
      <div className="cursor-dot" ref={dRef} />
    </>
  );
}
