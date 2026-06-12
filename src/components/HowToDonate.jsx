import { useApp } from "../i18n.jsx";
import { Reveal, RevealHtml } from "./primitives.jsx";

const VISUALS = ["🧬", "🌍", "❤️"];

export function HowToDonate() {
  const { t } = useApp();

  return (
    <section className="how" id="how">
      <div className="how__head">
        <Reveal as="p" className="section-tag">{t.how.tag}</Reveal>
        <RevealHtml as="h2" html={t.how.titleHtml} />
      </div>

      <div className="steps">
        {t.steps.map((step, i) => (
          <Reveal as="article" className="step" key={i}>
            <div className="step__num">{String(i + 1).padStart(2, "0")}</div>
            <div className="step__body">
              <h3>{step.h}</h3>
              <p>{step.p}</p>
              <a href={step.href} className="link-arrow" data-cursor="hover">{step.link}</a>
            </div>
            <div className="step__visual"><span>{VISUALS[i]}</span></div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
