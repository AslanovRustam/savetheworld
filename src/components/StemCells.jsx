import { useApp } from "../i18n.jsx";
import { LineTitle, Reveal } from "./primitives.jsx";

export function StemCells() {
  const { t } = useApp();

  return (
    <section className="cells" id="cells">
      <div className="cells__orb" data-speed="0.1" />
      <div className="cells__inner">
        <Reveal as="p" className="section-tag">{t.cells.tag}</Reveal>
        <LineTitle as="h2" className="cells__title" lines={t.cells.titleLines} />
        <Reveal as="p" className="cells__lead">{t.cells.lead}</Reveal>
        <Reveal as="a" href="#join" className="btn btn--ghost" data-cursor="hover">
          <span>{t.becomeDonor}</span>
        </Reveal>
      </div>
    </section>
  );
}
