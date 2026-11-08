import Identity from "./Identity";
import Skills from "./Skills";
import Certifications from "./Certifications";
import Profile from "./Profile";
import Experiences from "./Experiences";
import Educations from "./Educations";
import A4 from "../../components/A4";
import ButtonTheme from "../../components/ButtonTheme";
import ButtonPrint from "../../components/ButtonPrint";
import { executiveData } from "./data/executive";
import { useCvDocumentMeta } from "../../hooks/useCvDocumentMeta";
import { useCvTheme } from "../../hooks/useCvTheme";

function OneColumn() {
  useCvDocumentMeta();
  const { theme, toggleTheme } = useCvTheme();

  return (
    <div data-theme={theme} className="cv-page min-h-screen bg-cv-canvas p-4 print:h-auto print:p-0 print:bg-white">
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
      <ButtonTheme dark={theme === "dark"} onToggle={toggleTheme} />
      <ButtonPrint />
    </div>
  );
}

export default OneColumn;
