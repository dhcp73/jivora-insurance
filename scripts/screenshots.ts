import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const base = process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:3200";
const out = path.join(process.cwd(), "screenshots");
fs.mkdirSync(out, { recursive: true });

const pages = [
  ["home", "/"],
  ["services", "/services"],
  ["motor-car", "/services/motor-car"],
  ["quote", "/quote"],
  ["tools", "/tools"],
  ["premium", "/tools/premium-calculator"],
  ["reminder", "/tools/renewal-reminder"],
  ["compare", "/compare"],
  ["knowledge", "/knowledge"],
  ["about", "/about"],
  ["contact", "/contact"],
  ["login", "/login"],
];

async function shoot(width: number, suffix: string) {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await context.newPage();
  for (const [name, url] of pages) {
    await page.goto(base + url, { waitUntil: "networkidle" });
    await page.screenshot({ path: path.join(out, `${name}-${suffix}.png`), fullPage: true });
    console.log("saved", name, suffix);
  }
  await browser.close();
}

async function main() {
  await shoot(1280, "desktop");
  await shoot(375, "mobile");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
