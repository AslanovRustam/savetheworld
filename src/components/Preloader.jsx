import { useEffect, useRef, useState } from "react";
import { useApp } from "../i18n.jsx";

export function Preloader({ onDone }) {
  const { reduced } = useApp();
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const barRef = useRef(null);

  useEffect(() => {
    if (reduced) {
      setCount(100);
      setDone(true);
      onDone();
      return;
    }
    let p = 0, timer;
    const tick = () => {
      p += Math.random() * 9 + 3;
      if (p >= 100) p = 100;
      setCount(Math.floor(p));
      if (barRef.current) barRef.current.style.width = p + "%";
      if (p < 100) {
        timer = setTimeout(tick, 90 + Math.random() * 90);
      } else {
        timer = setTimeout(() => {
          setDone(true);
          onDone();
        }, 450);
      }
    };
    tick();
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`preloader${done ? " done" : ""}`}>
      <div className="preloader__inner">
        <div className="preloader__counter">
          <span>{count}</span>
          <span className="preloader__pct">%</span>
        </div>
        <div className="preloader__word">
          <span>SAVE</span><span>THE</span><span>WORLD</span>
        </div>
      </div>
      <div className="preloader__bar"><span ref={barRef} /></div>
    </div>
  );
}
