import { useApp } from "../i18n.jsx";
import { LineTitle, Reveal, RevealHtml, Counter } from "./primitives.jsx";

export function Hero() {
  const { t } = useApp();

  return (
    <section className="hero" id="hero">
      <div className="hero__bg" data-speed="-0.15" />

      <div className="hero__content">
        <Reveal as="p" className="hero__eyebrow">{t.hero.eyebrow}</Reveal>

        <LineTitle as="h1" className="hero__title" lines={t.hero.titleLines} animateOnLoad />

        <div className="hero__meta">
          <RevealHtml as="p" html={t.hero.meta} />
          <Reveal as="a" href="#join" className="btn btn--solid btn--lg" data-cursor="hover">
            <span>{t.hero.register}</span>
          </Reveal>
        </div>
      </div>

      <div className="hero__counter" data-speed="0.08">
        <div className="counter-big">
          <Counter target={35000000} />
        </div>
        <p>{t.hero.counterCaption}</p>
      </div>

      <a href="#how" className="scroll-cue" data-cursor="hover">
        <span>{t.hero.scroll}</span>
        <span className="scroll-cue__line" />
      </a>
    </section>
  );
}
