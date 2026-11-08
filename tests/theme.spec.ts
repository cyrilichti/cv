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

test("switches the full CV with pointer and keyboard and persists across reloads", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/cv/");
  const cv = page.locator("[data-theme]");
  const toggle = page.getByRole("button", { name: "Thème sombre", exact: true });
  const content = await page.locator("header, main").allTextContents();
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await expect(cv).toHaveCSS("background-color", "rgb(17, 24, 39)");
  await expect(page.locator("h1")).toHaveCSS("color", "rgb(165, 180, 252)");
  await expect(page.locator("main h2").first()).toHaveCSS("color", "rgb(243, 244, 246)");
  await page.reload();
  await expect(cv).toHaveAttribute("data-theme", "dark");
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await page.keyboard.press("Tab");
  // Reach the theme button using the document's native keyboard order.
  for (let i = 0; i < 10 && !(await toggle.evaluate(el => el === document.activeElement)); i++) {
    await page.keyboard.press("Tab");
  }
  await expect(toggle).toBeFocused();
  await page.keyboard.press("Space");
  await expect(cv).toHaveAttribute("data-theme", "light");
  await page.emulateMedia({ colorScheme: "dark" });
  await page.reload();
  await expect(cv).toHaveAttribute("data-theme", "light");
  await expect(page.locator("header, main")).toHaveCount(2);
  expect(await page.locator("header, main").allTextContents()).toEqual(content);
});
