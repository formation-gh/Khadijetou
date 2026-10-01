const { test, expect } = require('@playwright/test');

test('the application loads without errors', async ({ page }) => {
  const errors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));

  const response = await page.goto('./');

  expect(response).not.toBeNull();
  expect(response.status()).toBeLessThan(400);
  expect(errors).toEqual([]);
});
