#!/usr/bin/env node
/**
 * Renders one PNG per (slug, slideNumber) listed in MANIFEST.
 *
 * Strategy: 1 Chromium instance, 1 BrowserContext at 1920x1200 @2x DPR,
 * a pool of N pages pulling tasks from a shared queue. Each task loads
 * the template HTML, waits for fonts, activates the target slide, and
 * screenshots that slide's bounding box.
 *
 * Templates fall into 3 patterns:
 *   1. Vertical-scroll deck — every slide stacked, all visible. Just locate.
 *   2. Carousel deck — only `.slide.active` shown. We toggle `.active` on Nth.
 *   3. <deck-stage> web component — only `[data-deck-active]` shown. We set it
 *      on Nth slotted child, plus disable scaling for authored-size capture.
 */

import { chromium } from 'playwright';
import { mkdirSync, rmSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');
const TEMPLATES_DIR = join(REPO_ROOT, 'docs', 'templates');
const SHOTS_DIR = join(REPO_ROOT, 'docs', 'assets', 'screenshots');

const MANIFEST = [
  { slug: 'mckinsey-navy',      shots: [1, 2, 3] },
  { slug: 'bain-red',           shots: [1, 2, 3] },
  { slug: 'bcg-green',          shots: [1, 2, 3] },
  { slug: 'navy-gold',          shots: [1, 8, 18] },
  { slug: 'navy-library',       shots: [1, 4, 8] },
  { slug: 'bw-typo',            shots: [1, 4, 12] },
  { slug: 'calm-classic',       shots: [1, 4, 8] },
  { slug: 'soft-classic',       shots: [4, 6, 10] },
  { slug: 'grid-blue',          shots: [1, 3, 5] },
  { slug: 'dark-magazine',      shots: [1, 4, 13] },
  { slug: 'bold-poster',        shots: [1, 4, 8] },
  { slug: 'campaign-poster',    shots: [1, 4, 8] },
  { slug: 'tri-color-magazine', shots: [1, 3, 4] },
  { slug: 'retro-magazine',     shots: [1, 4, 8] },
  { slug: 'earth-archive',      shots: [1, 3, 8] },
  { slug: 'sunshine-yellow',    shots: [1, 5, 8] },
  { slug: 'pin-note',           shots: [1, 3, 11] },
  { slug: 'night-pink',         shots: [1, 4, 8] },
  { slug: 'forest-green',       shots: [1, 4, 8] },
  { slug: 'coral',              shots: [1, 4, 8] },
  { slug: 'olive-modern',       shots: [1, 4, 8] },
  { slug: 'warm-cream',         shots: [1, 3, 7] },
  { slug: 'peach-tone',         shots: [1, 6, 8] },
  { slug: 'pastel-card',        shots: [1, 4, 8] },
  { slug: 'black-yellow',       shots: [1, 4, 8] },
  { slug: 'neon-yellow',        shots: [1, 3, 8] },
  { slug: 'color-block',        shots: [1, 4, 8] },
  { slug: 'colorful-creative',  shots: [1, 4, 6] },
  { slug: 'rough-grid',         shots: [1, 4, 8] },
  { slug: 'postit-board',       shots: [1, 4, 8] },
  { slug: 'neon-pixel',         shots: [1, 5, 6] },
  { slug: 'windows-95',         shots: [1, 4, 8] },
  { slug: 'retro-cassette',     shots: [1, 3, 4] },
  { slug: 'floral-pastel',      shots: [1, 4, 8] },
];

const CONCURRENCY = 6;
const VIEWPORT = { width: 1920, height: 1200 };
const DPR = 2;

function flattenTasks(manifest) {
  return manifest.flatMap(({ slug, shots }) => shots.map((n) => ({ slug, n })));
}

/**
 * Activate the Nth slide in whatever pattern the template uses, and return
 * the chosen target selector kind so we can screenshot it.
 *
 * Returns: { kind: 'slide-class' | 'deck-stage-child', count: number, idx: number }
 */
async function activateAndDescribe(page, n) {
  return page.evaluate((slideNum) => {
    const targetIdx = slideNum - 1;

    // ── Pattern A: <deck-stage> web component ──────────────────────────
    const deck = document.querySelector('deck-stage');
    if (deck) {
      // Disable canvas scaling so screenshot captures authored size.
      deck.setAttribute('noscale', '');

      const children = Array.from(deck.children).filter((c) => {
        const t = c.tagName;
        return t !== 'SCRIPT' && t !== 'STYLE' && t !== 'TEMPLATE';
      });
      const count = children.length;
      const idx = Math.max(0, Math.min(targetIdx, count - 1));

      // Try the component's own API first (handles its internal index + events).
      if (typeof deck.goTo === 'function') {
        try { deck.goTo(idx); } catch (e) {}
      }
      // Also set the attribute directly as a belt-and-suspenders fallback.
      children.forEach((c, i) => {
        if (i === idx) c.setAttribute('data-deck-active', '');
        else c.removeAttribute('data-deck-active');
      });
      return { kind: 'deck-stage-child', count, idx };
    }

    // ── Pattern B: carousel with .slide.active ─────────────────────────
    const slides = Array.from(document.querySelectorAll('.slide'));
    if (slides.length) {
      const count = slides.length;
      const idx = Math.max(0, Math.min(targetIdx, count - 1));
      slides.forEach((s, i) => s.classList.toggle('active', i === idx));
      // Some templates expose showSlide(idx) globally; call it if present.
      if (typeof window.showSlide === 'function') {
        try { window.showSlide(idx); } catch (e) {}
      }
      return { kind: 'slide-class', count, idx };
    }

    return { kind: 'unknown', count: 0, idx: targetIdx };
  }, n);
}

async function processOne(page, task) {
  const { slug, n } = task;
  const url = pathToFileURL(join(TEMPLATES_DIR, slug, 'template.html')).href;
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 });
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
  });
  // Settle for slot/connectedCallback in deck-stage and any post-load layout.
  await page.waitForTimeout(180);

  const info = await activateAndDescribe(page, n);
  if (info.kind === 'unknown' || info.count === 0) {
    throw new Error(`${slug}: no recognizable slide structure`);
  }
  // Wait briefly for any transition-driven repaint.
  await page.waitForTimeout(120);

  let target;
  if (info.kind === 'deck-stage-child') {
    // Slotted children remain in light DOM under <deck-stage>.
    target = page.locator(
      'deck-stage > *:not(script):not(style):not(template)'
    ).nth(info.idx);
  } else {
    target = page.locator('.slide').nth(info.idx);
  }

  // Force visibility via overrides if needed (a couple of templates set
  // opacity transitions on .slide.active that may still be 0 mid-transition).
  await target.evaluate((el) => {
    el.style.setProperty('opacity', '1', 'important');
    el.style.setProperty('visibility', 'visible', 'important');
    el.style.setProperty('display', '', '');
  });

  const outPath = join(SHOTS_DIR, `${slug}-${n}.png`);
  await target.screenshot({ path: outPath, omitBackground: false, timeout: 30_000 });
  return { outPath, slideCount: info.count, clamped: info.idx + 1 !== n };
}

async function main() {
  // Clean previous outputs (PNG, SVG, .DS_Store).
  for (const f of readdirSync(SHOTS_DIR)) {
    if (f === '.DS_Store' || f.endsWith('.png') || f.endsWith('.svg')) {
      rmSync(join(SHOTS_DIR, f));
    }
  }
  mkdirSync(SHOTS_DIR, { recursive: true });

  const tasks = flattenTasks(MANIFEST);
  const total = tasks.length;
  console.log(`Rendering ${total} screenshots from ${MANIFEST.length} templates...`);

  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: DPR,
  });

  const errors = [];
  const clamps = [];
  let done = 0;
  const t0 = Date.now();

  const queue = tasks.slice();
  const workers = Array.from({ length: CONCURRENCY }, async () => {
    const page = await ctx.newPage();
    while (queue.length) {
      const task = queue.shift();
      if (!task) break;
      try {
        const res = await processOne(page, task);
        done++;
        if (res.clamped) clamps.push({ ...task, slideCount: res.slideCount });
        process.stdout.write(`\r  [${done}/${total}] ${task.slug}-${task.n}.png`.padEnd(80));
      } catch (err) {
        errors.push({ task, message: err.message.split('\n')[0] });
        process.stdout.write(`\r  [${done}/${total}] FAIL ${task.slug}-${task.n}: ${err.message.split('\n')[0]}`.padEnd(120) + '\n');
      }
    }
    await page.close();
  });

  await Promise.all(workers);
  await ctx.close();
  await browser.close();

  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  process.stdout.write('\n');
  console.log(`Done in ${elapsed}s — ${done}/${total} screenshots written.`);

  if (clamps.length) {
    console.warn(`\n${clamps.length} shots were clamped (requested index > slide count):`);
    for (const c of clamps) console.warn(`  ${c.slug}: requested ${c.n}, has ${c.slideCount}`);
  }
  if (errors.length) {
    console.error(`\n${errors.length} errors:`);
    for (const e of errors) console.error(`  ${e.task.slug}-${e.task.n}: ${e.message}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
