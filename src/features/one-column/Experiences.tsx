import CvSection from "./CvSection";

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
    <CvSection title="Expériences">
      <div className="space-y-5">
        {experiences.map((experience, index) => (
          <div className="space-y-3 print:break-inside-avoid" key={index}>
            <div className="flex flex-col gap-1">
              <div>
                <h3 className="text-sm font-bold uppercase leading-tight tracking-normal text-gray-900">
                  {experience.title}
                </h3>
                <p className="mt-0.5 text-sm font-semibold uppercase leading-tight tracking-normal text-gray-700">
                  {experience.company} -  {experience.location}
                </p>
              </div>
              <p className="text-xs font-bold uppercase leading-tight tracking-normal text-gray-900">
                {experience.period}
              </p>
            </div>
            {experience.intro && (
              <p className="mt-1 text-xs leading-relaxed text-gray-700">{experience.intro}</p>
            )}
            {experience.achievements.length > 0 && (
              <ul className="mt-2 space-y-1 text-xs text-gray-700">
                {experience.achievements.map((achievement, achievementIndex) => (
                  <li key={achievementIndex} className="flex gap-2.5">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gray-800" />
                    <span className="flex-1 leading-snug text-xs text-gray-900">{achievement}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </CvSection>
  );
}

export default Experiences;
