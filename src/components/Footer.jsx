import { useApp } from "../i18n.jsx";
import { Marquee } from "./primitives.jsx";

export function Footer() {
  const { t } = useApp();

  return (
    <footer className="footer">
      <div className="footer__top">
        <a href="#hero" className="footer__logo">Save&nbsp;The&nbsp;World&nbsp;✺</a>
        <div className="footer__cols">
          <ul>
            <li className="footer__h">{t.footer.exploreH}</li>
            <li><a href="#how" data-cursor="hover">{t.nav.how}</a></li>
            <li><a href="#cells" data-cursor="hover">{t.nav.cells}</a></li>
            <li><a href="#patients" data-cursor="hover">{t.footer.donorStories}</a></li>
          </ul>
          <ul>
            <li className="footer__h">{t.footer.aboutH}</li>
            <li><a href="#" data-cursor="hover">{t.footer.mission}</a></li>
            <li><a href="#" data-cursor="hover">{t.footer.reports}</a></li>
            <li><a href="#" data-cursor="hover">{t.footer.sponsors}</a></li>
          </ul>
          <ul>
            <li className="footer__h">{t.footer.connectH}</li>
            <li><a href="#" data-cursor="hover">Instagram</a></li>
            <li><a href="#" data-cursor="hover">Facebook</a></li>
            <li><a href="#" data-cursor="hover">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      <Marquee text={t.footer.marquee} variant="footer" index={0} />

      <div className="footer__bottom">
        <span>{t.footer.copyright}</span>
        <span>Built by ARustam</span>
      </div>
    </footer>
  );
}
