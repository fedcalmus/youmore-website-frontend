import { getAboutGoals } from "@/lib/about";
import { getLocale } from "@/lib/locale";

export async function AboutGoals() {
  const lang = await getLocale();
  const goals = await getAboutGoals(lang);

  if (goals.length === 0) {
    return null;
  }

  return (
    <div className="about-goals__list">
      {goals.map((g, i) => (
        <div key={g.id} className="about-goal">
          <div className="disp about-goal__index">{String(i + 1).padStart(2, "0")}</div>
          <h3 className="disp about-goal__title">{g.title}</h3>
          <p className="about-goal__text">{g.text}</p>
        </div>
      ))}
    </div>
  );
}
