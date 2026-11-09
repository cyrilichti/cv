import { PrinterIcon } from "lucide-react";


function ButtonPrint({ inline = false }: { inline?: boolean }) {
    return (
        <div className={inline ? "print:hidden" : "print:hidden fixed top-4 right-4 z-50"}>
            <button
                onClick={() => window.print()}
                className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg transition-colors"
                aria-label="Imprimer"
                type="button"
            >
                <PrinterIcon className="w-6 h-6" />
            </button>
        </div>
    );
}

export default ButtonPrint;
