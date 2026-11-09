import { useState } from "react";
import { CopyIcon, PrinterIcon } from "lucide-react";

const buttonClassName = "inline-flex min-h-11 items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-blue-dark shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-dark";

function CvActions() {
    const [copyFeedback, setCopyFeedback] = useState<"success" | "error" | null>(null);

    async function copyLink() {
        if (!navigator.clipboard?.writeText) {
            setCopyFeedback("error");
            return;
        }

        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopyFeedback("success");
        } catch {
            setCopyFeedback("error");
        }
    }

    return (
        <div className="print:hidden mx-auto mb-3 flex max-w-[210mm] flex-wrap items-center justify-end gap-2" role="group" aria-label="Actions du CV">
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
                type="button"
            >
                <CopyIcon className="h-4 w-4" aria-hidden="true" />
                Copier le lien
            </button>
            <span
                className={copyFeedback
                    ? `basis-full text-right text-sm ${copyFeedback === "error" ? "text-red-700" : "text-blue-dark"}`
                    : "sr-only"}
                role={copyFeedback === "error" ? "alert" : "status"}
                aria-live={copyFeedback === "error" ? "assertive" : "polite"}
                aria-atomic="true"
            >
                {copyFeedback === "success"
                    ? "Lien copié."
                    : copyFeedback === "error"
                      ? "Copie impossible. Copiez l’adresse dans la barre du navigateur."
                      : ""}
            </span>
        </div>
    );
}

export default CvActions;
