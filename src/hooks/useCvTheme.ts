import { useEffect, useState } from "react";

type Theme = "light" | "dark";
const storageKey = "cv-theme-v1";
const systemQuery = "(prefers-color-scheme: dark)";

function readChoice(): Theme | null {
  try {
    const saved = localStorage.getItem(storageKey);
    return saved === "light" || saved === "dark" ? saved : null;
  } catch {
    return null;
  }
}

export function useCvTheme() {
  const [choice, setChoice] = useState(readChoice);
  const [systemTheme, setSystemTheme] = useState<Theme>(() =>
    window.matchMedia(systemQuery).matches ? "dark" : "light"
  );

  useEffect(() => {
    if (choice !== null) return;
    const query = window.matchMedia(systemQuery);
    const update = () => setSystemTheme(query.matches ? "dark" : "light");
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [choice]);

  const theme = choice ?? systemTheme;
  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    setChoice(next);
    try {
      localStorage.setItem(storageKey, next);
    } catch {
      // The current visit can still use a manual choice when storage is blocked.
    }
  }

  return { theme, toggleTheme };
}
