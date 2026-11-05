import { test, expect } from "@playwright/test";

test.describe("JivOra smoke", () => {
  test("home loads", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/insurance guidance/i);
    await expect(page.locator("body")).not.toHaveJSProperty("scrollWidth", 99999);
  });

  test("signup quote reminder admin", async ({ page }) => {
    const email = `user_${Date.now()}@example.com`;
    await page.goto("/signup");
    await page.getByLabel("Name").fill("E2E User");
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password (min 8)").fill("password99");
    await page.getByRole("button", { name: /sign up/i }).click();
    await expect(page).toHaveURL(/dashboard/);

    await page.goto("/quote");
    await page.getByRole("button", { name: /continue/i }).click();
    await page.getByRole("button", { name: /see estimate/i }).click();
    await page.getByLabel("Name").fill("E2E User");
    await page.getByLabel("Email").fill(email);
    await page.getByRole("button", { name: /save & email me/i }).click();
    await expect(page.getByText(/request received/i)).toBeVisible();

    await page.goto("/tools/renewal-reminder");
    await page.getByLabel("Label").fill("E2E policy");
    await page.getByLabel("Expiry date").fill("2027-06-01");
    await page.getByLabel("Email for reminder").fill(email);
    await page.getByRole("button", { name: /save reminder/i }).click();
    await expect(page.getByText(/reminder saved/i)).toBeVisible();

    await page.goto("/login");
    await page.getByLabel("Email").fill("admin@jivora.local");
    await page.getByLabel("Password").fill("admin1234");
    await page.getByRole("button", { name: /sign in/i }).click();
    await expect(page).toHaveURL(/admin/);
    await expect(page.getByText(/maintainer dashboard/i)).toBeVisible();
  });

  for (const width of [375, 768, 1280]) {
    test(`no horizontal overflow at ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/");
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
      expect(overflow).toBe(false);
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.goto("/services/motor-car");
      await page.goto("/tools/premium-calculator");
      expect(errors).toEqual([]);
    });
  }
});
