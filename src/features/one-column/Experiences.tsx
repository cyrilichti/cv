import { Fragment } from "react/jsx-runtime";

type ExperiencesProps = {
  experiences: {
    title: string;
    company: string;
    location: string;
    period: string;
    intro?: string;
    achievements: string[];
  }[];
};

function Experiences({ experiences }: ExperiencesProps) {
  return (
    <section className="py-4">
      <div className="flex items-start gap-5">
        <div className="w-[120px] shrink-0 text-right">
          <h2 className="text-sm font-bold uppercase leading-tight tracking-normal text-cv-foreground">
            Expériences
          </h2>
        </div>
        <div className="flex-1 space-y-6 border-b border-cv-border pb-5">
          {experiences.map((experience, index) => (
            <div className="space-y-3" key={index}>
              <div className="flex items-baseline justify-between">
                <div>
                  <h3 className="text-sm font-bold uppercase leading-tight tracking-normal text-cv-foreground">
                    {experience.title}
                  </h3>
                  <p className="mt-0.5 text-sm font-semibold uppercase leading-tight tracking-normal text-cv-secondary">
                    {experience.company} -  {experience.location}
                  </p>
                </div>
                <p className="whitespace-nowrap text-sm font-bold uppercase leading-tight tracking-normal text-cv-foreground">
                  {experience.period}
                </p>
              </div>
              {experience.intro && (
                <p className="mt-1 text-xs leading-relaxed text-cv-secondary">{experience.intro}</p>
              )}
              {experience.achievements.length > 0 && (
                <ul className="mt-2 space-y-1 text-xs text-cv-secondary">
                  {experience.achievements.map((achievement, achievementIndex) => (
                    <li key={achievementIndex} className="flex gap-2.5">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cv-bullet" />
                      <span className="flex-1 leading-snug text-xs text-cv-foreground">{achievement}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experiences;
