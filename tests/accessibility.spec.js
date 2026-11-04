// Automated accessibility checks for Cheaper Vegan (axe-core, WCAG 2.1 A and AA).
// These catch roughly a third of real-world problems. Always finish with an NVDA spot-check.
const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;
const path = require('path');
const { pathToFileURL } = require('url');

const APP = pathToFileURL(path.join(__dirname, '..', 'index.html')).href;
const WCAG = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

async function scan(page, label) {
  const { violations } = await new AxeBuilder({ page }).withTags(WCAG).analyze();
  const summary = violations.map(v =>
    `[${v.impact}] ${v.id}: ${v.help}\n` +
    v.nodes.slice(0, 5).map(n => `    ${n.target.join(' ')}`).join('\n') +
    (v.nodes.length > 5 ? `\n    ...and ${v.nodes.length - 5} more` : '')
  ).join('\n');
  expect(summary, `${label} has accessibility problems`).toBe('');
}

test.beforeEach(async ({ page }) => {
  await page.goto(APP);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await expect(page.locator('#panel-plan')).not.toBeEmpty();
});

for (const [tab, name] of [['plan', 'Plan meals'], ['list', 'Shopping list'], ['compare', 'Compare prices']]) {
  test(`${name} tab passes axe`, async ({ page }) => {
    await page.click(`#tab-${tab}`);
    await expect(page.locator(`#panel-${tab}`)).toBeVisible();
    await scan(page, `${name} tab`);
  });
}

test('Ingredient search results pass axe', async ({ page }) => {
  await page.fill('#q', 'beans');
  await page.click('#qGo');
  await expect(page.locator('#searchResults')).not.toBeEmpty();
  await scan(page, 'Search results');
});

test('Open theme menu passes axe', async ({ page }) => {
  await page.click('#themeMenu summary');
  await scan(page, 'Theme menu');
});

test('Every background theme passes color contrast', async ({ page }) => {
  await page.click('#themeMenu summary');
  const bgs = await page.locator('#bgOpts [data-bg]').evaluateAll(els => els.map(e => e.dataset.bg));
  for (const bg of bgs) {
    await page.click(`#bgOpts [data-bg="${bg}"]`);
    await scan(page, `Background "${bg}"`);
  }
});

test('Tabs follow the screen reader tab pattern', async ({ page }) => {
  const tabs = page.getByRole('tab');
  await expect(tabs).toHaveCount(3);
  for (const t of ['plan', 'list', 'compare']) {
    await expect(page.locator(`#tab-${t}`)).toHaveAttribute('aria-controls', `panel-${t}`);
    await expect(page.locator(`#panel-${t}`)).toHaveAttribute('role', 'tabpanel');
    await expect(page.locator(`#panel-${t}`)).toHaveAttribute('aria-labelledby', `tab-${t}`);
  }
  // Only the selected tab is in the Tab order; arrow keys move between tabs.
  await page.click('#tab-plan');
  await expect(page.locator('#tab-plan')).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('#tab-list')).toHaveAttribute('tabindex', '-1');
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#tab-list')).toBeFocused();
  await expect(page.locator('#tab-list')).toHaveAttribute('aria-selected', 'true');
  await page.keyboard.press('End');
  await expect(page.locator('#tab-compare')).toBeFocused();
  await page.keyboard.press('Home');
  await expect(page.locator('#tab-plan')).toBeFocused();
});
