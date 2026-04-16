import { test, expect } from '@playwright/test';

test.describe('app shell', () => {
  test('unauthenticated user is redirected to login', async ({ page }) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', (err) => pageErrors.push(err.message));

    await page.goto('/');

    // Root redirects to /app/home, but the auth guard sends unauthenticated
    // visitors to /auth/login, where the login form should render.
    await expect(page).toHaveURL(/\/auth\/login$/);
    await expect(page.locator('#login-email')).toBeVisible();
    await expect(page.locator('#login-password')).toBeVisible();

    expect(pageErrors, `unhandled page errors: ${pageErrors.join('\n')}`).toEqual([]);
    expect(consoleErrors, `console errors: ${consoleErrors.join('\n')}`).toEqual([]);
  });

  test('translation files are reachable', async ({ request }) => {
    const es = await request.get('/i18n/es.json');
    expect(es.ok()).toBe(true);
    const json = await es.json();
    expect(json.app.title).toBe('EXES');
  });
});
