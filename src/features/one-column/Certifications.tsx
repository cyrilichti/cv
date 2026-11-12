import CvSection from "./CvSection";
import type { ComponentType } from "react";

type CertificationsProps = {
  certifications: {
    icon: ComponentType<{ className?: string }>;
    title: string;
    delivery: string;
    date: string;
    id: string;
  }[];
};

function Certifications({ certifications }: CertificationsProps) {
  return (
    <CvSection title="Certifications">
      <ul className="grid grid-cols-1 gap-y-3">
        {certifications.map((certification, index) => (
          <li key={index}>
            <p className="text-sm font-bold uppercase leading-tight tracking-normal text-gray-900">{certification.title}</p>
            <div className="mt-0.5 flex items-center gap-1.5 text-xs leading-relaxed text-gray-700">
              <certification.icon className="h-3.5 w-3.5 shrink-0 text-blue-dark" />
              <p>
                {certification.delivery} - {certification.date} - ID {certification.id}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </CvSection>
  );
}

export default Certifications;
