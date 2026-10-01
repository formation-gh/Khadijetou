const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'https://aouzgaga.github.io/formation-gh-api/',
    ignoreHTTPSErrors: true,
    screenshot: 'on',
  },
});
