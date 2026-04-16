import { test, expect } from '@playwright/test';

/**
 * Verifies that the in-header language switcher updates UI text in real time
 * AND that the choice persists across a reload via `profiles.language` +
 * `localStorage.lang`.
 */
test.describe('language switcher', () => {
  test('change language from user menu and persist after reload', async ({ page }) => {
    // Start in Spanish so the assertion below ("Panel") is deterministic.
    await page.addInitScript(() => localStorage.setItem('lang', 'es'));

    const email = `lang-${Date.now()}-${Math.floor(Math.random() * 1e6)}@example.com`;
    const password = 'testPassword123';

    // Register a fresh user and land on the dashboard
    await page.goto('/auth/register');
    await page.locator('#register-email').fill(email);
    await page.locator('#register-password').fill(password);
    await page.locator('#register-confirm').fill(password);
    await page.locator('form button[type=submit]').click();
    await expect(page).toHaveURL(/\/app\/dashboard$/);

    const sidebar = page.locator('[data-testid=sidebar-desktop]');

    // Spanish initial: sidebar shows "Panel"
    await expect(sidebar).toContainText('Panel');

    // Open user menu and switch to English. Wait for the PATCH to /profiles
    // to complete before reloading so the syncFromProfile() that runs on
    // reload reads the new value (avoids a benign UI race).
    await page.locator('[data-testid=user-menu-trigger]').click();
    const profileUpdate = page.waitForResponse(
      (resp) => resp.url().includes('/rest/v1/profiles') && resp.request().method() === 'PATCH',
    );
    await page.locator('[aria-label="English"] .p-menu-item-link').click();
    await profileUpdate;

    // Sidebar updates without reloading
    await expect(sidebar).toContainText('Dashboard');

    // Reload and verify persistence (localStorage and Supabase profile both set)
    await page.reload();
    await expect(sidebar).toContainText('Dashboard');
  });
});
