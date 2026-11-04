// Playwright settings for the accessibility checks. Run with: npm test
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: 'tests',
  reporter: [['list']],
  // Reduced motion turns off color fades, so contrast is measured on final colors, not mid-fade.
  use: { browserName: 'chromium', reducedMotion: 'reduce' },
});
