import { CopyIcon, PrinterIcon } from "lucide-react";
import { useState } from "react";

const buttonClassName = "inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-wait disabled:opacity-60";

function CvActions() {
    const [copyState, setCopyState] = useState<"idle" | "copying" | "copied" | "error">("idle");

    async function copyLink() {
        setCopyState("copying");

        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopyState("copied");
        } catch {
            setCopyState("error");
        }
    }

    return (
        <div className="print:hidden mx-auto mb-4 max-w-[210mm]">
            <div className="flex flex-wrap justify-end gap-2" role="group" aria-label="Actions du CV">
                <button
                    onClick={() => window.print()}
                    className={buttonClassName}
                    type="button"
                >
                    <PrinterIcon className="h-4 w-4" aria-hidden="true" />
                    Imprimer le CV
                </button>
                <button
                    onClick={copyLink}
                    className={buttonClassName}
                    disabled={copyState === "copying"}
                    type="button"
                >
                    <CopyIcon className="h-4 w-4" aria-hidden="true" />
                    Copier le lien
                </button>
            </div>
            <p role="status" aria-atomic="true" className="mt-2 text-right text-sm text-gray-700 empty:mt-0">
                {copyState === "copied" ? "Lien copié !" : copyState === "error" ? "Copie impossible. Copiez le lien depuis la barre d’adresse." : ""}
            </p>
        </div>
    );
}

export default CvActions;
