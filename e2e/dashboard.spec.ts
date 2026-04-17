import { test, expect } from '@playwright/test';

/**
 * Creates a transaction and verifies the dashboard cards show correct totals
 * and the chart + recent list are populated.
 */
test.describe('dashboard', () => {
  test('shows totals and chart after creating a transaction', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('lang', 'es'));

    const email = `dash-${Date.now()}-${Math.floor(Math.random() * 1e6)}@example.com`;
    const password = 'testPassword123';

    // Sign up
    await page.goto('/auth/register');
    await page.locator('#register-email').fill(email);
    await page.locator('#register-password').fill(password);
    await page.locator('#register-confirm').fill(password);
    await page.locator('form button[type=submit]').click();
    await page.waitForURL('**/app/dashboard');

    // Dashboard should be empty initially
    await expect(page.locator('[data-testid=dashboard-income]')).toContainText('0');
    await expect(page.locator('[data-testid=dashboard-expenses]')).toContainText('0');

    // Create an expense (75.50) from the transactions page
    await page.goto('/app/transactions');
    await page.locator('[data-testid=new-transaction]').click();
    await page.locator('#tx-amount').fill('75.50');
    await page.locator('#tx-category').click();
    await page.locator('.p-select-option').first().click();
    await page.locator('[data-testid=save-transaction]').click();
    await expect(page.locator('[data-testid=tx-row]')).toHaveCount(1);

    // Go to dashboard and verify totals
    await page.goto('/app/dashboard');
    await expect(page.locator('[data-testid=dashboard-expenses]')).toContainText('75');
    // Chart should be visible (doughnut renders a <canvas>)
    await expect(page.locator('canvas')).toBeVisible();
    // Recent list should show 1 transaction
    await expect(page.locator('ul li')).toHaveCount(1);
  });
});
