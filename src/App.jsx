import { useEffect, useRef } from "react";
import { useApp } from "./i18n.jsx";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

import { Preloader } from "./components/Preloader.jsx";
import { Cursor } from "./components/Cursor.jsx";
import { Header } from "./components/Header.jsx";
import { Hero } from "./components/Hero.jsx";
import { Marquee } from "./components/primitives.jsx";
import { HowToDonate } from "./components/HowToDonate.jsx";
import { StemCells } from "./components/StemCells.jsx";
import { World } from "./components/World.jsx";
import { Patients } from "./components/Patients.jsx";
import { Join } from "./components/Join.jsx";
import { Newsletter } from "./components/Newsletter.jsx";
import { Footer } from "./components/Footer.jsx";

export default function App() {
  const { t, setLoaded, reduced } = useApp();
  const mainRef = useRef(null);

  useSmoothScroll(mainRef);

  // in-page anchor links → smooth scroll (accounts for the custom scroller)
  useEffect(() => {
    const getDocTop = (el) => {
      let y = 0, node = el;
      while (node) { y += node.offsetTop; node = node.offsetParent; }
      return y;
    };
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (id.length < 2) { e.preventDefault(); return; }
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: getDocTop(target) - 40, behavior: reduced ? "auto" : "smooth" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [reduced]);

  return (
    <>
      <Preloader onDone={() => setLoaded(true)} />
      <Cursor />
      <Header />

      <main ref={mainRef}>
        <Hero />
        <Marquee text={t.marquee.one} variant="lg" index={0} />
        <HowToDonate />
        <StemCells />
        <World />
        <Patients />
        <Join />
        <Newsletter />
        <Footer />
      </main>
    </>
  );
}
