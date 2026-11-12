import CvSection from "./CvSection";

type EducationsProps = {
  educations: {
    title: string;
    school: string;
    period: string;
  }[];
};

function Eductions({ educations }: EducationsProps) {
  return (
    <CvSection title="Formations">
      <ul className="grid grid-cols-1 gap-y-3">
        {educations.map((education, index) => (
          <li key={index} className="print:break-inside-avoid">
            <h3 className="text-sm font-bold uppercase leading-tight tracking-normal text-gray-900">
              {education.title}
            </h3>
            <p className="mt-0.5 text-xs leading-relaxed text-gray-700">
              {education.school}{" "}
              <span className="text-gray-500">• {education.period}</span>
            </p>
          </li>
        ))}
      </ul>
    </CvSection>
  );
}

export default Eductions;
