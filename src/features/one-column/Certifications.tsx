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
    <section className="break-inside-avoid py-4">
      <div className="flex items-start gap-5">
        <div className="w-[120px] shrink-0 text-right">
          <h2 className="text-sm font-bold uppercase leading-tight tracking-normal text-cv-foreground">
            Certifications
          </h2>
        </div>
        <div className="flex-1 border-b border-cv-border pb-5">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
            {certifications.map((certification, index) => (
              <li key={index}>
                <p className="text-sm font-bold uppercase leading-tight tracking-normal text-cv-foreground">{certification.title}</p>
                <div className="mt-0.5 flex items-center gap-1.5 text-xs leading-relaxed text-cv-secondary">
                  <certification.icon className="h-3.5 w-3.5 shrink-0 text-cv-accent" />
                  <p>
                    {certification.delivery} - {certification.date} - ID {certification.id}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Certifications;
