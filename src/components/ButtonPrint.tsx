import { PrinterIcon } from "lucide-react";


function ButtonPrint() {
    return (
        <div className="print:hidden fixed top-4 right-4 z-50">
            <button
                onClick={() => window.print()}
                className="cv-control"
                aria-label="Imprimer"
                type="button"
            >
                <PrinterIcon className="w-6 h-6" />
            </button>
        </div>
    );
}

export default ButtonPrint;