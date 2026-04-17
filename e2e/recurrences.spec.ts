import { test, expect } from '@playwright/test';

/**
 * Creates a recurring transaction, verifies the virtual occurrence shows
 * with the sync indicator, then deletes only that occurrence via the
 * Google Calendar scope dialog.
 */
test.describe('recurrences', () => {
  test('create recurring, see virtual row, delete single occurrence', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('lang', 'es'));

    const email = `rec-${Date.now()}-${Math.floor(Math.random() * 1e6)}@example.com`;
    const password = 'testPassword123';

    // Sign up
    await page.goto('/auth/register');
    await page.locator('#register-email').fill(email);
    await page.locator('#register-password').fill(password);
    await page.locator('#register-confirm').fill(password);
    await page.locator('form button[type=submit]').click();
    await page.waitForURL('**/app/dashboard');

    // Go to transactions — should be empty
    await page.goto('/app/transactions');
    await expect(page.locator('[data-testid=tx-row]')).toHaveCount(0);

    // Create a recurring monthly expense
    await page.locator('[data-testid=new-transaction]').click();
    await page.locator('#tx-amount').fill('30');
    await page.locator('#tx-category').click();
    await page.locator('.p-select-option').first().click();

    // Enable recurrence
    await page.locator('label[for=tx-recurrent]').click();
    // Frequency defaults to Mensual, end date to +24m — leave defaults

    await page.locator('[data-testid=save-transaction]').click();

    // One virtual occurrence should appear for the current month
    await expect(page.locator('[data-testid=tx-row]')).toHaveCount(1);

    // The virtual row should have the sync icon (🔁 indicator)
    await expect(page.locator('[data-testid=tx-row] .pi-sync')).toBeVisible();

    // Delete only this occurrence via scope dialog
    await page.locator('[data-testid=tx-row] button[aria-label="Eliminar"]').click();

    // Scope dialog should appear with radio options
    await expect(page.locator('#scope-one')).toBeVisible();
    // "Solo esta" is selected by default — click Continuar
    await page.locator('button').filter({ hasText: 'Continuar' }).click();

    // The current month occurrence is gone
    await expect(page.locator('[data-testid=tx-row]')).toHaveCount(0);
  });
});
