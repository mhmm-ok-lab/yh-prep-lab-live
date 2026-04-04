import { chromium, devices } from 'playwright';
import fs from 'node:fs';

const mainTs = fs.readFileSync(new URL('./src/main.ts', import.meta.url), 'utf8');
const buildMatch = mainTs.match(/const UI_BUILD = "([^"]+)";/);
const build = buildMatch ? buildMatch[1] : 'dev';
const base = `http://127.0.0.1:4173/?v=${build}`;

async function clearData(page) {
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    localStorage.removeItem('yh.active-session.guest');
    localStorage.removeItem('yh.study-sessions.guest');
    localStorage.removeItem('yh.current-user-id');
  });
}

async function runOne(name, mobile = false) {
  const browser = await chromium.launch({ headless: true });
  const context = mobile
    ? await browser.newContext({ ...devices['iPhone 13'] })
    : await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await context.newPage();

  await clearData(page);
  await page.goto(`${base}&view=overview`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `/tmp/audit-${name}-overview.png`, fullPage: true });

  await page.goto(`${base}&view=roadmap`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `/tmp/audit-${name}-roadmap.png`, fullPage: true });

  await page.goto(`${base}&view=mock`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `/tmp/audit-${name}-mock.png`, fullPage: true });

  await page.getByRole('button', { name: /Starta/i }).first().click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: `/tmp/audit-${name}-session.png`, fullPage: true });

  await page.goto(`${base}&view=roadmap`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  await page.screenshot({ path: `/tmp/audit-${name}-roadmap-during-session.png`, fullPage: true });

  const metrics = await page.evaluate(() => ({
    hasRoadmapHeading: !!Array.from(document.querySelectorAll('h3')).find((el) => /Övergripande läge/i.test(el.textContent || '')),
    hasActiveSessionNotice: !!Array.from(document.querySelectorAll('h3')).find((el) => /Aktivt pass pausat i bakgrunden/i.test(el.textContent || '')),
    hasResumeButton: !!Array.from(document.querySelectorAll('button')).find((el) => /Återgå till aktivt pass/i.test(el.textContent || '')),
    hasSessionCardInRoadmap: !!document.querySelector('.session')
  }));

  console.log(name, JSON.stringify(metrics));
  await browser.close();
}

await runOne('desktop', false);
await runOne('mobile', true);
console.log('full visual audit done');
