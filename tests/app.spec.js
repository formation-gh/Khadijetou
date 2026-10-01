const { test, expect } = require('@playwright/test');

function collectBrowserIssues(page) {
  const issues = [];

  page.on('console', (message) => {
    if (message.type() === 'error') issues.push(message.text());
  });
  page.on('pageerror', (error) => issues.push(error.message));
  page.on('response', (response) => {
    if (response.status() >= 400) {
      issues.push(`HTTP ${response.status()} : ${response.url()}`);
    }
  });

  return issues;
}

async function openLoginPage(page) {
  const response = await page.goto('./');

  expect(response).not.toBeNull();
  expect(response.status()).toBeLessThan(400);
  await expect(page.getByRole('heading', { name: 'Bienvenue' })).toBeVisible();
  await expect(page.getByLabel('Mot de passe')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Se connecter' })).toBeVisible();
}

async function authenticate(page, password) {
  await page.getByLabel('Mot de passe').fill(password);
  await page.getByRole('button', { name: 'Se connecter' }).click();
}

test('affiche l’écran de connexion sans erreur navigateur', async ({ page }) => {
  const issues = collectBrowserIssues(page);

  await openLoginPage(page);
  expect(issues).toEqual([]);
});

test('refuse un mot de passe incorrect sans quitter la connexion', async ({ page }) => {
  const issues = collectBrowserIssues(page);

  await openLoginPage(page);
  await authenticate(page, 'incorrect');

  await expect(page.getByRole('alert')).toHaveText('Mot de passe incorrect.');
  await expect(page.getByRole('heading', { name: 'Bienvenue' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Les utilisateurs' })).toHaveCount(0);
  expect(issues).toEqual([]);
});

test('connecte l’utilisateur et affiche la liste ainsi que le détail d’un utilisateur', async ({ page }) => {
  const issues = collectBrowserIssues(page);

  await openLoginPage(page);
  await authenticate(page, process.env.APP_PASSWORD || '1234');

  await expect(page.getByRole('heading', { name: 'Les utilisateurs' })).toBeVisible();
  const users = page.getByRole('region', { name: 'Liste des utilisateurs' }).getByRole('link');
  await expect(users.first()).toBeVisible();
  expect(await users.count()).toBeGreaterThan(0);

  await users.first().click();
  await expect(page.getByRole('region', { name: 'Solde de congés payés' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Poser un congé' })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Congés posés/ })).toBeVisible();
  expect(issues).toEqual([]);
});
