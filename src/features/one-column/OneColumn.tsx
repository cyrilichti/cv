import Identity from "./Identity";
import Skills from "./Skills";
import Certifications from "./Certifications";
import Profile from "./Profile";
import Experiences from "./Experiences";
import Educations from "./Educations";
import A4 from "../../components/A4";
import ButtonPrint from "../../components/ButtonPrint";
import { executiveData } from "./data/executive";
import { useCvDocumentMeta } from "../../hooks/useCvDocumentMeta";
import { useCvTheme } from "../../hooks/useCvTheme";
import { Moon, Sun } from "lucide-react";

function OneColumn() {
  useCvDocumentMeta();
  const { theme, toggleTheme } = useCvTheme();
  const nextThemeLabel = theme === "dark" ? "Activer le thème clair" : "Activer le thème sombre";

  return (
    <div className="cv-theme min-h-screen bg-cv-page p-4 print:h-auto print:p-0 print:bg-white" data-theme={theme}>
      <A4>
        <Identity identity={executiveData.identity} />
        <main className="flex flex-1">
          <section className="flex w-full flex-col">
            <Profile profile={executiveData.profile} />
            <Experiences experiences={executiveData.experiences} />
            <Skills skills={executiveData.skills} />
            <Certifications certifications={executiveData.certifications} />
            <Educations educations={executiveData.educations} />
          </section>
        </main>
      </A4>
      <div className="print:hidden fixed top-4 right-4 z-50 flex gap-2">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={nextThemeLabel}
          aria-pressed={theme === "dark"}
          title={nextThemeLabel}
          className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg transition-colors"
        >
          {theme === "dark" ? <Sun className="w-6 h-6" aria-hidden="true" /> : <Moon className="w-6 h-6" aria-hidden="true" />}
        </button>
        <ButtonPrint inline />
      </div>
    </div>
  );
}

export default OneColumn;
