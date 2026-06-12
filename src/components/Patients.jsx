import { useEffect, useRef } from "react";
import { useApp } from "../i18n.jsx";
import { Reveal, RevealHtml } from "./primitives.jsx";

const PATIENTS = [
  { name: "Shahera Khan", emoji: "👩🏽", disease: "acuteLeukemia", bg: "southAsian", tint: "#ffe3ef" },
  { name: "Kriti", emoji: "🧒🏽", disease: "aplasticAnemia", bg: "indian", tint: "#e3fbf6" },
  { name: "Misha & Zoey", emoji: "👧🏽", disease: "sickleCell", bg: "gujarati", tint: "#fff3d6" },
  { name: "Domenic A.", emoji: "👨🏼", disease: "lymphoma", bg: "italianCanadian", tint: "#e7edff" },
  { name: "Anouar N-A.", emoji: "👨🏽", disease: "myeloma", bg: "northAfrican", tint: "#ffe7db" },
  { name: "Lina M.", emoji: "👩🏿", disease: "acuteLeukemia", bg: "westAfrican", tint: "#f1e7ff" },
];

export function Patients() {
  const { t } = useApp();
  const carRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const carousel = carRef.current;
    const track = trackRef.current;
    if (!carousel || !track) return;

    let posX = 0, dragging = false, startX = 0, startPos = 0, velocity = 0, lastX = 0, raf;
    const maxDrag = () => Math.max(0, track.scrollWidth - carousel.clientWidth + 40);
    const setX = (v) => {
      posX = Math.min(0, Math.max(-maxDrag(), v));
      track.style.transform = `translate3d(${posX}px,0,0)`;
    };

    const down = (e) => {
      dragging = true;
      startX = e.clientX; startPos = posX; lastX = e.clientX;
      carousel.setPointerCapture(e.pointerId);
    };
    const move = (e) => {
      if (!dragging) return;
      velocity = e.clientX - lastX; lastX = e.clientX;
      setX(startPos + (e.clientX - startX));
    };
    const up = () => { dragging = false; };

    carousel.addEventListener("pointerdown", down);
    carousel.addEventListener("pointermove", move);
    carousel.addEventListener("pointerup", up);
    carousel.addEventListener("pointercancel", up);

    const loop = () => {
      if (!dragging && Math.abs(velocity) > 0.4) {
        setX(posX + velocity);
        velocity *= 0.93;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      carousel.removeEventListener("pointerdown", down);
      carousel.removeEventListener("pointermove", move);
      carousel.removeEventListener("pointerup", up);
      carousel.removeEventListener("pointercancel", up);
    };
  }, []);

  return (
    <section className="patients" id="patients">
      <div className="patients__head">
        <Reveal as="p" className="section-tag">{t.patients.tag}</Reveal>
        <RevealHtml as="h2" html={t.patients.titleHtml} />
      </div>

      <div className="carousel" ref={carRef} data-cursor="drag">
        <div className="carousel__track" ref={trackRef}>
          {PATIENTS.map((p, i) => (
            <article className="p-card" key={i}>
              <div className="p-card__photo" style={{ background: p.tint }}>{p.emoji}</div>
              <span className="p-card__status">{t.patients.status}</span>
              <h3>{p.name}</h3>
              <dl>
                <dt>{t.patients.diagnosis}</dt>
                <dd>{t.patients.diseases[p.disease]}</dd>
                <dt>{t.patients.background}</dt>
                <dd>{t.patients.backgrounds[p.bg]}</dd>
              </dl>
            </article>
          ))}
        </div>
      </div>

      <div className="patients__foot">
        <a href="#" className="link-arrow" data-cursor="hover">{t.patients.more}</a>
      </div>
    </section>
  );
}
