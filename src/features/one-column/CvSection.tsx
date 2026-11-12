import type { ReactNode } from "react";

function CvSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="py-3">
      <h2 className="mb-3 border-b border-gray-300 pb-2 text-sm font-bold uppercase leading-tight tracking-normal text-gray-900 print:break-after-avoid">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default CvSection;
