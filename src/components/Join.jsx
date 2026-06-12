import { useApp } from "../i18n.jsx";
import { LineTitle, Reveal } from "./primitives.jsx";

export function Join() {
  const { t } = useApp();

  return (
    <section className="join" id="join">
      <div className="join__inner">
        <Reveal as="p" className="section-tag">{t.join.tag}</Reveal>
        <LineTitle as="h2" className="join__title" lines={t.join.titleLines} />
        <Reveal as="p">{t.join.p}</Reveal>
        <Reveal as="a" href="#" className="btn btn--solid btn--lg" data-cursor="hover">
          <span>{t.join.btn}</span>
        </Reveal>
      </div>
      <div className="join__blob" data-speed="0.12" />
    </section>
  );
}
