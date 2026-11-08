import { expect, test } from "@playwright/test";

for (const colorScheme of ["light", "dark"] as const) {
  test(`follows ${colorScheme} device preference and subsequent changes`, async ({ page }) => {
    await page.emulateMedia({ colorScheme });
    await page.goto("/cv/");
    const cv = page.locator("[data-theme]");
    await expect(cv).toHaveAttribute("data-theme", colorScheme);
    const opposite = colorScheme === "light" ? "dark" : "light";
    await page.emulateMedia({ colorScheme: opposite });
    await expect(cv).toHaveAttribute("data-theme", opposite);
  });
}

test("restores a saved choice ahead of device preference", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.addInitScript(() => localStorage.setItem("cv-theme-v1", "dark"));
  await page.goto("/cv/");
  await expect(page.locator("[data-theme]")).toHaveAttribute("data-theme", "dark");
  await page.emulateMedia({ colorScheme: "dark" });
  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("[data-theme]")).toHaveAttribute("data-theme", "dark");
});

test("ignores invalid stored values and tolerates unavailable storage", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.addInitScript(() => {
    localStorage.setItem("cv-theme-v1", "invalid");
  });
  await page.goto("/cv/");
  await expect(page.locator("[data-theme]")).toHaveAttribute("data-theme", "dark");
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", { get() { throw new Error("Storage blocked"); } });
  });
  await page.reload();
  await expect(page.locator("[data-theme]")).toHaveAttribute("data-theme", "dark");
});
