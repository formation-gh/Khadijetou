const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://aouzgaga.github.io/formation-gh-api/',
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
  },
});
