import { useApp } from "../i18n.jsx";
import { Reveal, RevealHtml, Counter, Marquee } from "./primitives.jsx";
import { useInView } from "../hooks/useInView";

const PIE = [
  { key: "white", value: 70, color: "#5b2be0" },
  { key: "asian", value: 11, color: "#1fc7b6" },
  { key: "black", value: 8, color: "#ff5da2" },
  { key: "latin", value: 5, color: "#ffc83d" },
  { key: "other", value: 6, color: "#ff7a3c" },
];

function Pie() {
  const { t } = useApp();
  const [ref, inView] = useInView({ threshold: 0.4 });

  let acc = 0;
  const stops = PIE.map((d) => {
    const from = acc;
    acc += d.value;
    return `${d.color} ${from * 3.6}deg ${acc * 3.6}deg`;
  });
  const background = inView ? `conic-gradient(${stops.join(",")})` : "conic-gradient(#eee 0 100%)";

  return (
    <Reveal className="stat__chart">
      <div className="pie" ref={ref} style={{ background }}>
        <div className="pie__center">
          <span>2022</span>
          <small>{t.world.pieLabel}</small>
        </div>
      </div>
      <ul className="legend">
        {PIE.map((d) => (
          <li key={d.key}>
            <i style={{ background: d.color }} />
            <span>{t.world.legend[d.key]}</span>
            <b>{d.value}%</b>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export function World() {
  const { t } = useApp();

  return (
    <section className="world" id="world">
      <div className="world__head">
        <RevealHtml as="h2" html={t.world.titleHtml} />
      </div>

      <Marquee text={t.marquee.alt} variant="alt" index={1} />

      <div className="stat">
        <Reveal className="stat__text">
          <p>
            <Counter target={70} suffix="%" /> <span>{t.world.statL1}</span>
          </p>
          <p>
            <span>{t.world.statL2a}</span> <Counter target={85} suffix="%" /> <span>{t.world.statL2b}</span>
          </p>
          <p className="stat__note">{t.world.note}</p>
        </Reveal>

        <Pie />
      </div>
    </section>
  );
}
