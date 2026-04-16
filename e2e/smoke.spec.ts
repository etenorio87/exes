import { test, expect } from '@playwright/test';

test.describe('app shell', () => {
  test('home page bootstraps without runtime errors', async ({ page }) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', (err) => pageErrors.push(err.message));

    await page.goto('/');
    await expect(page.locator('app-root')).toBeAttached();

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
