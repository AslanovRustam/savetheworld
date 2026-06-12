import { useState } from "react";
import { useApp } from "../i18n.jsx";
import { Reveal } from "./primitives.jsx";

export function Newsletter() {
  const { t } = useApp();
  const [msg, setMsg] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setMsg(t.news.success);
    e.target.reset();
  };

  return (
    <section className="news">
      <div className="news__inner">
        <Reveal as="h3">{t.news.title}</Reveal>
        <Reveal as="form" className="news__form" onSubmit={submit}>
          <input type="email" placeholder="your@email.com" required />
          <button type="submit" data-cursor="hover">{t.news.subscribe}</button>
        </Reveal>
        <p className="news__msg">{msg}</p>
      </div>
    </section>
  );
}
