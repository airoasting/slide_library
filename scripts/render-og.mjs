#!/usr/bin/env node
/**
 * Renders assets/og-image.html → assets/og-image.png at 1200×630 @2x DPR.
 */

import { chromium } from 'playwright';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');
const SRC = join(REPO_ROOT, 'docs', 'assets', 'og-image.html');
const OUT = join(REPO_ROOT, 'docs', 'assets', 'og-image.png');

const VIEWPORT = { width: 1200, height: 630 };
const DPR = 2;

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: DPR });
const page = await ctx.newPage();

await page.goto(pathToFileURL(SRC).href, { waitUntil: 'networkidle', timeout: 60_000 });
await page.evaluate(async () => {
  if (document.fonts && document.fonts.ready) await document.fonts.ready;
});
await page.waitForTimeout(250);

await page.screenshot({ path: OUT, clip: { x: 0, y: 0, ...VIEWPORT }, omitBackground: false });

await ctx.close();
await browser.close();

console.log(`Wrote ${OUT}`);
