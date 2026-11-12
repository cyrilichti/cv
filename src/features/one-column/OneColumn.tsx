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

function OneColumn() {
  useCvDocumentMeta();

  return (
    <div className="min-h-screen bg-gray-50 p-4 print:h-auto print:p-0 print:bg-white">
      <A4>
        <Identity identity={executiveData.identity} />
        <main className="grid grid-cols-1 gap-x-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] print:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <Profile profile={executiveData.profile} />
            <Experiences experiences={executiveData.experiences} />
          </div>
          <div className="min-w-0 md:border-l md:border-gray-300 md:pl-6 print:border-l print:border-gray-300 print:pl-6">
            <Skills skills={executiveData.skills} />
            <Certifications certifications={executiveData.certifications} />
            <Educations educations={executiveData.educations} />
          </div>
        </main>
      </A4>
      <ButtonPrint />
    </div>
  );
}

export default OneColumn;
