import { PrinterIcon } from "lucide-react";


function ButtonPrint() {
    return (
        <div className="print:hidden mx-auto mb-3 flex max-w-[210mm] justify-end" role="group" aria-label="Actions du CV">
            <button
                onClick={() => window.print()}
                className="inline-flex min-h-11 items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-blue-dark shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-dark"
                type="button"
            >
                <PrinterIcon className="h-4 w-4" aria-hidden="true" />
                Imprimer le CV
            </button>
        </div>
    );
}

export default ButtonPrint;
