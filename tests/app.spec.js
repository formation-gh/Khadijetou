const { test, expect } = require('@playwright/test');

// Vérifie que l’application répond et ne produit aucune erreur dans le navigateur.
test('the application authenticates and loads without errors', async ({ page }) => {
  const errors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', (error) => errors.push(error.message));

  const response = await page.goto('./');

  expect(response).not.toBeNull();
  expect(response.status()).toBeLessThan(400);

  await page.getByLabel('Mot de passe').fill(process.env.APP_PASSWORD || '1234');
  await page.getByRole('button', { name: 'Se connecter' }).click();
  await expect(page.getByRole('heading', { name: 'Les utilisateurs' })).toBeVisible();

  expect(errors).toEqual([]);
});
