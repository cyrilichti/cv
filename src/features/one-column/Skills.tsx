type SkillsProps = {
  skills: {
    title: string;
    items: string[];
  }[];
};

function Skills({ skills }: SkillsProps) {
  return (
    <section className="py-4">
      <div className="flex items-start gap-5">
        <div className="w-[120px] shrink-0 text-right">
          <h2 className="text-sm font-bold uppercase leading-tight tracking-normal text-cv-primary">
            Compétences
          </h2>
        </div>
        <div className="flex-1 border-b border-cv-border pb-5">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
            {skills.map((skill, index) => (
              <li key={index} className="flex flex-col gap-1.5">
                <span className="text-sm font-bold uppercase leading-tight tracking-normal text-cv-primary">
                  {skill.title}
                </span>
                <div className="flex flex-wrap gap-1">
                  {skill.items.map((item, i) => (
                    <span
                      key={i}
                      className="inline-flex max-w-full rounded border border-cv-border-soft bg-cv-chip px-1.5 py-0.5 text-xs leading-tight text-cv-secondary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Skills;
