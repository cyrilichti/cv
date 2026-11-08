import { PrinterIcon } from "lucide-react";

function CvActions() {
    return (
        <div className="print:hidden mx-auto mb-4 flex max-w-[210mm] flex-wrap justify-end gap-2" role="group" aria-label="Actions du CV">
            <button
                onClick={() => window.print()}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                type="button"
            >
                <PrinterIcon className="h-4 w-4" aria-hidden="true" />
                Imprimer le CV
            </button>
        </div>
    );
}

export default CvActions;
