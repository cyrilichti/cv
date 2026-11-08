import { Moon, Sun } from "lucide-react";

type ButtonThemeProps = {
  dark: boolean;
  onToggle: () => void;
};

function ButtonTheme({ dark, onToggle }: ButtonThemeProps) {
  const Icon = dark ? Sun : Moon;
  return (
    <div className="print:hidden fixed top-4 right-20 z-50">
      <button
        className="cv-control"
        type="button"
        aria-label="Thème sombre"
        aria-pressed={dark}
        title={dark ? "Passer au thème clair" : "Passer au thème sombre"}
        onClick={onToggle}
      >
        <Icon className="w-6 h-6" aria-hidden="true" />
      </button>
    </div>
  );
}

export default ButtonTheme;
