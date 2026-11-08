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

test("keeps print colors, content, and geometry identical from either theme", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/cv/");
  const snapshot = () => page.locator("header, main, main *").evaluateAll(elements =>
    elements.map(el => {
      const style = getComputedStyle(el);
      const { x, y, width, height } = el.getBoundingClientRect();
      return { text: el.textContent, color: style.color, background: style.backgroundColor,
        border: style.borderColor, x, y, width, height };
    })
  );
  await page.emulateMedia({ media: "print" });
  const light = await snapshot();
  await page.emulateMedia({ media: "screen" });
  await page.getByRole("button", { name: "Thème sombre", exact: true }).click();
  await page.emulateMedia({ media: "print" });
  expect(await snapshot()).toEqual(light);
  await expect(page.locator(".cv-page")).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await expect(page.locator(".bg-cv-paper")).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await expect(page.locator("h1")).toHaveCSS("color", "rgb(30, 42, 94)");
  await expect(page.getByRole("button", { name: "Thème sombre", exact: true })).toBeHidden();
  await expect(page.getByRole("button", { name: "Imprimer", exact: true })).toBeHidden();
});

for (const colorScheme of ["light", "dark"] as const) {
  test(`preserves content geometry and readable text in ${colorScheme} mode`, async ({ page }, testInfo) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/cv/");
    const geometry = () => page.locator("header, main, main *").evaluateAll(elements =>
      elements.map(el => {
        const { x, y, width, height } = el.getBoundingClientRect();
        return { text: el.textContent, x, y, width, height };
      })
    );
    const light = await geometry();
    await page.emulateMedia({ colorScheme });
    await expect(page.locator("[data-theme]")).toHaveAttribute("data-theme", colorScheme);
    expect(await geometry()).toEqual(light);
    const lowContrast = await page.locator("header, main").evaluateAll(roots => {
      function luminance(color: string) {
        const channels = color.match(/[\d.]+/g)!.slice(0, 3).map(Number).map(value => {
          const channel = value / 255;
          return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
        });
        return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
      }
      return roots.flatMap(root => Array.from(root.querySelectorAll("*"))).flatMap(el => {
        if (!Array.from(el.childNodes).some(node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim())) return [];
        let surface: Element | null = el;
        while (surface && getComputedStyle(surface).backgroundColor === "rgba(0, 0, 0, 0)") surface = surface.parentElement;
        const foreground = luminance(getComputedStyle(el).color);
        const background = luminance(surface ? getComputedStyle(surface).backgroundColor : "rgb(255, 255, 255)");
        const ratio = (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05);
        return ratio < 4.5 ? [{ text: el.textContent, ratio }] : [];
      });
    });
    expect(lowContrast).toEqual([]);
    expect(errors).toEqual([]);
    await testInfo.attach(`${colorScheme}-cv`, { body: await page.screenshot({ fullPage: true }), contentType: "image/png" });
  });
}
