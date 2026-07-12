#!/usr/bin/env node
/**
 * One-off: re-capture screenshots ONLY for the listed slugs.
 * Does NOT clean up other PNGs in the screenshots dir.
 */

import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');
const TEMPLATES_DIR = join(REPO_ROOT, 'docs', 'templates');
const SHOTS_DIR = join(REPO_ROOT, 'docs', 'assets', 'screenshots');

const MANIFEST = [
  { slug: 'navy-gold',     shots: [1, 8, 18] },
  { slug: 'bw-typo',       shots: [1, 4, 12] },
  { slug: 'dark-magazine', shots: [1, 4, 13] },
  { slug: 'forest-green',  shots: [1, 4, 8] },
  { slug: 'coral',         shots: [1, 4, 8] },
  { slug: 'peach-tone',    shots: [1, 6, 8] },
  { slug: 'black-yellow',  shots: [1, 4, 8] },
];

const CONCURRENCY = 4;
const VIEWPORT = { width: 1920, height: 1200 };
const DPR = 2;

function flattenTasks(manifest) {
  return manifest.flatMap(({ slug, shots }) => shots.map((n) => ({ slug, n })));
}

async function activateAndDescribe(page, n) {
  return page.evaluate((slideNum) => {
    const targetIdx = slideNum - 1;

    // Pattern A: <deck-stage> web component
    const stage = document.querySelector('deck-stage');
    if (stage) {
      stage.setAttribute('noscale', '');
      const children = Array.from(stage.children).filter((c) => {
        const t = c.tagName;
        return t !== 'SCRIPT' && t !== 'STYLE' && t !== 'TEMPLATE';
      });
      const count = children.length;
      const idx = Math.max(0, Math.min(targetIdx, count - 1));
      if (typeof stage.goTo === 'function') {
        try { stage.goTo(idx); } catch (e) {}
      }
      children.forEach((c, i) => {
        if (i === idx) c.setAttribute('data-deck-active', '');
        else c.removeAttribute('data-deck-active');
      });
      return { kind: 'deck-stage-child', count, idx };
    }

    // Pattern B: .slide carousel — covers both `.active` and `.is-active` styles
    const slides = Array.from(document.querySelectorAll('.slide'));
    if (slides.length) {
      const count = slides.length;
      const idx = Math.max(0, Math.min(targetIdx, count - 1));

      // Kill transitions on all slides so visibility/opacity changes are instant
      slides.forEach((s) => {
        s.style.setProperty('transition', 'none', 'important');
      });

      // Toggle both common active class names
      slides.forEach((s, i) => {
        s.classList.toggle('active', i === idx);
        s.classList.toggle('is-active', i === idx);
      });

      // Force inactive slides hidden, active slide visible — overrides any
      // template CSS that uses opacity/visibility transitions.
      slides.forEach((s, i) => {
        if (i === idx) {
          s.style.setProperty('opacity', '1', 'important');
          s.style.setProperty('visibility', 'visible', 'important');
        } else {
          s.style.setProperty('opacity', '0', 'important');
          s.style.setProperty('visibility', 'hidden', 'important');
        }
      });

      // For horizontal-translate decks: shift the #deck container so the
      // target slide is in viewport. Many templates set `width: N00vw`
      // and translateX(-i00vw).
      const deckEl = document.getElementById('deck');
      if (deckEl) {
        deckEl.style.transition = 'none';
        deckEl.style.transform = `translateX(-${idx}00vw)`;
      }

      // Generic global APIs some templates expose
      for (const fn of ['showSlide', 'goTo', 'setSlide', 'goToSlide']) {
        if (typeof window[fn] === 'function') {
          try { window[fn](idx); } catch (e) {}
        }
      }

      // Force-reveal animation-gated content on the active slide
      const active = slides[idx];
      active.querySelectorAll('[data-anim]').forEach((el) => {
        el.style.setProperty('opacity', '1', 'important');
        el.style.setProperty('transform', 'none', 'important');
        el.style.setProperty('visibility', 'visible', 'important');
      });

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
  await page.waitForTimeout(180);

  const info = await activateAndDescribe(page, n);
  if (info.kind === 'unknown' || info.count === 0) {
    throw new Error(`${slug}: no recognizable slide structure`);
  }
  await page.waitForTimeout(700);

  let target;
  if (info.kind === 'deck-stage-child') {
    target = page.locator(
      'deck-stage > *:not(script):not(style):not(template)'
    ).nth(info.idx);
  } else {
    target = page.locator('.slide').nth(info.idx);
  }

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
  mkdirSync(SHOTS_DIR, { recursive: true });

  const tasks = flattenTasks(MANIFEST);
  const total = tasks.length;
  console.log(`Re-capturing ${total} screenshots from ${MANIFEST.length} templates...`);

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
