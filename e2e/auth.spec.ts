import { test, expect } from '@playwright/test';

/**
 * Full happy-path through auth: register a fresh user, sign out, sign in
 * again. Each run creates a real user in the linked Supabase project
 * (acceptable for MVP — periodic cleanup TBD when these accumulate).
 *
 * The test pins the language to Spanish via localStorage so the user-menu
 * label "Cerrar sesión" is deterministic regardless of CI browser locale.
 */
test.describe('auth flow', () => {
  test('register, sign out via user menu, sign in', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('lang', 'es'));

    const email = `e2e-${Date.now()}-${Math.floor(Math.random() * 1e6)}@example.com`;
    const password = 'testPassword123';

    // Going to a protected route as a guest must land on /auth/login.
    await page.goto('/app/dashboard');
    await expect(page).toHaveURL(/\/auth\/login$/);

    // Register
    await page.goto('/auth/register');
    await page.locator('#register-email').fill(email);
    await page.locator('#register-password').fill(password);
    await page.locator('#register-confirm').fill(password);
    await page.locator('form button[type=submit]').click();

    // Email confirmation is disabled, so signup logs the user in immediately.
    await expect(page).toHaveURL(/\/app\/dashboard$/);

    // Sign out via user menu
    await page.locator('[data-testid=user-menu-trigger]').click();
    await page.locator('[aria-label="Cerrar sesión"] .p-menu-item-link').click();
    await expect(page).toHaveURL(/\/auth\/login$/);

    // Sign in again with the same credentials
    await page.locator('#login-email').fill(email);
    await page.locator('#login-password').fill(password);
    await page.locator('form button[type=submit]').click();
    await expect(page).toHaveURL(/\/app\/dashboard$/);
  });
});
