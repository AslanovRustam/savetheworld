import { useEffect, useRef, useState } from "react";
import { useApp, LANGS } from "../i18n.jsx";

export function Header() {
  const { t, lang, setLang } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [hide, setHide] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);

  // hide on scroll-down, reveal on scroll-up, translucent bg past 40px
  useEffect(() => {
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHide(y > lastY && y > 400);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close dropdown on outside click
  useEffect(() => {
    const onDoc = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  const navItems = [
    { href: "#how", label: t.nav.how },
    { href: "#cells", label: t.nav.cells },
    { href: "#world", label: t.nav.world },
    { href: "#patients", label: t.nav.patients },
  ];

  const pick = (code) => {
    setLang(code);
    setLangOpen(false);
    setMenuOpen(false);
  };

  return (
    <>
      <header className={`header${scrolled ? " scrolled" : ""}${hide ? " hide" : ""}`}>
        <a href="#hero" className="logo" data-cursor="hover">
          <span className="logo__mark">✺</span>
          <span className="logo__text">Save&nbsp;The&nbsp;World</span>
        </a>

        <nav className="nav">
          <ul className="nav__list">
            {navItems.map((it) => (
              <li key={it.href}>
                <a href={it.href} data-cursor="hover">{it.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <div className={`lang${langOpen ? " open" : ""}`} ref={langRef}>
            <button
              className="lang__btn"
              data-cursor="hover"
              aria-haspopup="true"
              aria-expanded={langOpen}
              onClick={(e) => { e.stopPropagation(); setLangOpen((v) => !v); }}
            >
              <span>{lang.toUpperCase()}</span>
              <svg width="10" height="6" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6" fill="none" /></svg>
            </button>
            <ul className="lang__menu">
              {LANGS.map((l) => (
                <li key={l.code}>
                  <button
                    data-cursor="hover"
                    className={lang === l.code ? "active" : ""}
                    onClick={(e) => { e.stopPropagation(); pick(l.code); }}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <a href="#join" className="btn btn--solid" data-cursor="hover">
            <span>{t.becomeDonor}</span>
          </a>

          <button
            className={`burger${menuOpen ? " open" : ""}`}
            aria-label="Menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span /><span />
          </button>
        </div>
      </header>

      <div className={`menu-overlay${menuOpen ? " open" : ""}`}>
        <ul>
          {navItems.map((it) => (
            <li key={it.href}>
              <a href={it.href} onClick={() => setMenuOpen(false)}>{it.label}</a>
            </li>
          ))}
          <li><a href="#join" onClick={() => setMenuOpen(false)}>{t.becomeDonor}</a></li>
        </ul>
        <div className="menu-overlay__lang">
          {LANGS.map((l) => (
            <button
              key={l.code}
              className={lang === l.code ? "active" : ""}
              onClick={() => pick(l.code)}
            >
              {l.code.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
