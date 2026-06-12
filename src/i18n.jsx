import { createContext, useContext, useEffect, useState } from "react";

/* ============================================================
   TRANSLATIONS  (EN / FR / UK)
   Title lines are arrays (one entry per masked .line span);
   *Html fields may contain inline <em>/<strong>/<br>/rainbow.
============================================================ */
export const translations = {
  en: {
    nav: { how: "How it works", cells: "Stem Cells 101", world: "Why it matters", patients: "Patients" },
    becomeDonor: "Become a donor",
    hero: {
      eyebrow: "Stem cell donor registry",
      titleLines: ["We're all created", "equal <em>until blood</em>", "cancer strikes."],
      meta: "When it comes to finding a stem cell match, <strong>ethnicity matters.</strong> Swab your cheek, join the registry, and you could save a life anywhere in the world.",
      register: "Register as a donor",
      counterCaption: "people are waiting for a match right now",
      scroll: "Scroll",
    },
    marquee: {
      one: "One swab • One match • One life saved ✺ ",
      alt: "Let's keep it that way ✺ ",
      footer: "Become a donor ✺ Save a life ✺ ",
    },
    how: {
      tag: "— How to donate",
      titleHtml: "Three simple steps<br>between you and<br><em>saving a life.</em>",
    },
    steps: [
      { h: "Swab your cheeks & join the registry", p: "Order a free kit, gently swab the inside of your cheek, and send it back. That's it — you're officially a potential donor.", link: "Order a kit →", href: "#join" },
      { h: "Wait to be matched with a patient", p: "Your tissue type is added to a global database. You might match someone next month, next year, or never — every entry widens the odds for someone, somewhere.", link: "Why matching is hard →", href: "#world" },
      { h: "Donate your stem cells & save a life", p: "If you're a match, donating is usually as simple as giving blood. Your healthy stem cells can rebuild someone's entire immune system.", link: "How donation works →", href: "#cells" },
    ],
    cells: {
      tag: "— Stem Cells 101",
      titleLines: ["What is a", "stem cell?"],
      lead: "So tiny, yet so crucial. Stem cells are the body's master cells — they can become blood cells, rebuild a broken immune system, and quite literally bring a patient back from the edge.",
    },
    world: {
      titleHtml: "The world is a <span class='rainbow'>colourful</span> place.",
      statL1: "of all registered donors are white —",
      statL2a: "even though roughly",
      statL2b: "of the world's population is not.",
      note: "Your match is far more likely to come from someone who shares your ethnic background. The registry needs everyone.",
      pieLabel: "Donor registry",
      legend: { white: "White / European", asian: "Asian", black: "Black / African", latin: "Latin American", other: "Indigenous / Other" },
    },
    patients: {
      tag: "— Patients & survivors",
      titleHtml: "Real people,<br><em>still looking.</em>",
      more: "Meet more patients →",
      status: "Looking for a match",
      diagnosis: "Diagnosis",
      background: "Background",
      diseases: { acuteLeukemia: "Acute leukemia", aplasticAnemia: "Aplastic anemia", sickleCell: "Sickle cell", lymphoma: "Lymphoma", myeloma: "Myeloma" },
      backgrounds: { southAsian: "South Asian", indian: "Indian", gujarati: "Gujarati", italianCanadian: "Italian-Canadian", northAfrican: "North African", westAfrican: "West African" },
    },
    join: {
      tag: "— Become a donor",
      titleLines: ["Could you be", "someone's <em>match?</em>"],
      p: "It takes two minutes and a cheek swab. Come to one of our Swab Drives or order a kit from home.",
      btn: "Join the registry",
    },
    news: { title: "Stay in the loop.", subscribe: "Subscribe →", success: "✺ Thanks — you're on the list!" },
    footer: {
      exploreH: "Explore", donorStories: "Donor stories",
      aboutH: "About", mission: "Our mission", reports: "Annual reports", sponsors: "Sponsors",
      connectH: "Connect", copyright: "© 2026 Save The World",
    },
  },

  fr: {
    nav: { how: "Comment ça marche", cells: "Cellules souches 101", world: "Pourquoi c'est important", patients: "Patients" },
    becomeDonor: "Devenir donneur",
    hero: {
      eyebrow: "Registre des donneurs de cellules souches",
      titleLines: ["Nous sommes tous", "<em>égaux</em> jusqu'à ce que", "le cancer du sang", "frappe."],
      meta: "Pour trouver une compatibilité de cellules souches, <strong>l'origine ethnique compte.</strong> Faites un prélèvement, inscrivez-vous au registre, et vous pourriez sauver une vie partout dans le monde.",
      register: "S'inscrire comme donneur",
      counterCaption: "personnes attendent une compatibilité en ce moment",
      scroll: "Défiler",
    },
    marquee: {
      one: "Un prélèvement • Une compatibilité • Une vie sauvée ✺ ",
      alt: "Gardons-le ainsi ✺ ",
      footer: "Devenir donneur ✺ Sauver une vie ✺ ",
    },
    how: {
      tag: "— Comment faire un don",
      titleHtml: "Trois étapes simples<br>entre vous et<br><em>sauver une vie.</em>",
    },
    steps: [
      { h: "Faites un prélèvement et inscrivez-vous", p: "Commandez une trousse gratuite, prélevez délicatement l'intérieur de votre joue et renvoyez-la. C'est tout — vous êtes officiellement un donneur potentiel.", link: "Commander une trousse →", href: "#join" },
      { h: "Attendez d'être jumelé à un patient", p: "Votre type tissulaire est ajouté à une base de données mondiale. Vous pourriez être compatible le mois prochain, l'an prochain, ou jamais — chaque inscription augmente les chances de quelqu'un, quelque part.", link: "Pourquoi la compatibilité est difficile →", href: "#world" },
      { h: "Faites don de vos cellules souches et sauvez une vie", p: "Si vous êtes compatible, le don est généralement aussi simple qu'un don de sang. Vos cellules souches saines peuvent reconstruire tout le système immunitaire d'une personne.", link: "Comment se déroule le don →", href: "#cells" },
    ],
    cells: {
      tag: "— Cellules souches 101",
      titleLines: ["Qu'est-ce qu'une", "cellule souche ?"],
      lead: "Si petites, et pourtant si essentielles. Les cellules souches sont les cellules maîtresses du corps — elles peuvent devenir des cellules sanguines, reconstruire un système immunitaire endommagé et, littéralement, ramener un patient du bord du gouffre.",
    },
    world: {
      titleHtml: "Le monde est un endroit <span class='rainbow'>coloré</span>.",
      statL1: "de tous les donneurs inscrits sont blancs —",
      statL2a: "alors qu'environ",
      statL2b: "de la population mondiale ne l'est pas.",
      note: "Votre compatibilité a beaucoup plus de chances de venir d'une personne partageant votre origine ethnique. Le registre a besoin de tout le monde.",
      pieLabel: "Registre des donneurs",
      legend: { white: "Blanc / Européen", asian: "Asiatique", black: "Noir / Africain", latin: "Latino-américain", other: "Autochtone / Autre" },
    },
    patients: {
      tag: "— Patients et survivants",
      titleHtml: "De vraies personnes,<br><em>toujours en attente.</em>",
      more: "Rencontrer plus de patients →",
      status: "En quête d'une compatibilité",
      diagnosis: "Diagnostic",
      background: "Origine",
      diseases: { acuteLeukemia: "Leucémie aiguë", aplasticAnemia: "Anémie aplasique", sickleCell: "Drépanocytose", lymphoma: "Lymphome", myeloma: "Myélome" },
      backgrounds: { southAsian: "Sud-asiatique", indian: "Indien", gujarati: "Gujarati", italianCanadian: "Italo-canadien", northAfrican: "Nord-africain", westAfrican: "Ouest-africain" },
    },
    join: {
      tag: "— Devenir donneur",
      titleLines: ["Pourriez-vous être", "la <em>compatibilité</em> de quelqu'un ?"],
      p: "Cela prend deux minutes et un prélèvement de joue. Venez à l'une de nos collectes ou commandez une trousse à domicile.",
      btn: "Rejoindre le registre",
    },
    news: { title: "Restez informé.", subscribe: "S'abonner →", success: "✺ Merci — vous êtes inscrit !" },
    footer: {
      exploreH: "Explorer", donorStories: "Histoires de donneurs",
      aboutH: "À propos", mission: "Notre mission", reports: "Rapports annuels", sponsors: "Commanditaires",
      connectH: "Nous suivre", copyright: "© 2026 Save The World",
    },
  },

  uk: {
    nav: { how: "Як це працює", cells: "Стовбурові клітини 101", world: "Чому це важливо", patients: "Пацієнти" },
    becomeDonor: "Стати донором",
    hero: {
      eyebrow: "Реєстр донорів стовбурових клітин",
      titleLines: ["Ми всі рівні,", "<em>поки</em> рак крові", "не вдарить."],
      meta: "Коли йдеться про пошук сумісного донора стовбурових клітин, <strong>етнічне походження має значення.</strong> Зробіть мазок, приєднайтеся до реєстру — і ви зможете врятувати життя будь-де у світі.",
      register: "Зареєструватися донором",
      counterCaption: "людей просто зараз чекають на сумісного донора",
      scroll: "Гортати",
    },
    marquee: {
      one: "Один мазок • Одна сумісність • Одне врятоване життя ✺ ",
      alt: "Збережімо його таким ✺ ",
      footer: "Стати донором ✺ Врятувати життя ✺ ",
    },
    how: {
      tag: "— Як стати донором",
      titleHtml: "Три прості кроки<br>між вами та<br><em>врятованим життям.</em>",
    },
    steps: [
      { h: "Зробіть мазок зі щоки та приєднайтеся до реєстру", p: "Замовте безкоштовний набір, обережно проведіть по внутрішній стороні щоки та надішліть його назад. Ось і все — ви офіційно потенційний донор.", link: "Замовити набір →", href: "#join" },
      { h: "Очікуйте на збіг із пацієнтом", p: "Ваш тип тканини додається до глобальної бази даних. Ви можете збігтися з кимось наступного місяця, наступного року або ніколи — кожен запис підвищує шанси для когось, десь.", link: "Чому знайти збіг важко →", href: "#world" },
      { h: "Віддайте свої стовбурові клітини та врятуйте життя", p: "Якщо ви сумісні, донорство зазвичай таке ж просте, як здати кров. Ваші здорові стовбурові клітини можуть відновити цілу імунну систему людини.", link: "Як відбувається донорство →", href: "#cells" },
    ],
    cells: {
      tag: "— Стовбурові клітини 101",
      titleLines: ["Що таке", "стовбурова клітина?"],
      lead: "Такі крихітні, але такі важливі. Стовбурові клітини — це головні клітини організму: вони можуть ставати клітинами крові, відновлювати зруйновану імунну систему й буквально повертати пацієнта з краю прірви.",
    },
    world: {
      titleHtml: "Світ — це <span class='rainbow'>барвисте</span> місце.",
      statL1: "усіх зареєстрованих донорів — білі,",
      statL2a: "хоча приблизно",
      statL2b: "населення світу — ні.",
      note: "Ваш сумісний донор набагато ймовірніше буде людиною того ж етнічного походження. Реєстру потрібні всі.",
      pieLabel: "Реєстр донорів",
      legend: { white: "Білі / Європейці", asian: "Азійці", black: "Чорношкірі / Африканці", latin: "Латиноамериканці", other: "Корінні народи / Інші" },
    },
    patients: {
      tag: "— Пацієнти та ті, хто вижив",
      titleHtml: "Справжні люди,<br><em>досі в пошуку.</em>",
      more: "Познайомитися з іншими пацієнтами →",
      status: "Шукає сумісного донора",
      diagnosis: "Діагноз",
      background: "Походження",
      diseases: { acuteLeukemia: "Гострий лейкоз", aplasticAnemia: "Апластична анемія", sickleCell: "Серповидноклітинна анемія", lymphoma: "Лімфома", myeloma: "Мієлома" },
      backgrounds: { southAsian: "Південноазійське", indian: "Індійське", gujarati: "Гуджаратське", italianCanadian: "Італо-канадське", northAfrican: "Північноафриканське", westAfrican: "Західноафриканське" },
    },
    join: {
      tag: "— Стати донором",
      titleLines: ["Можливо, саме ви —", "чийсь <em>збіг?</em>"],
      p: "Це займає дві хвилини й один мазок зі щоки. Завітайте на одну з наших акцій або замовте набір додому.",
      btn: "Приєднатися до реєстру",
    },
    news: { title: "Будьте в курсі.", subscribe: "Підписатися →", success: "✺ Дякуємо — вас додано до списку!" },
    footer: {
      exploreH: "Огляд", donorStories: "Історії донорів",
      aboutH: "Про нас", mission: "Наша місія", reports: "Річні звіти", sponsors: "Спонсори",
      connectH: "Зв'язок", copyright: "© 2026 Save The World",
    },
  },
};

export const LANGS = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "uk", label: "Українська" },
];

/* ============================================================
   APP CONTEXT  (language + global flags)
============================================================ */
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem("stw-lang");
      return translations[saved] ? saved : "en";
    } catch {
      return "en";
    }
  });
  const [loaded, setLoaded] = useState(false);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const setLang = (code) => {
    if (!translations[code]) return;
    setLangState(code);
    try { localStorage.setItem("stw-lang", code); } catch {}
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = { lang, setLang, loaded, setLoaded, reduced, t: translations[lang] };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
