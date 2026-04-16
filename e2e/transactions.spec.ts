import { test, expect } from '@playwright/test';

/**
 * Full CRUD flow for transactions: create -> edit amount -> soft delete ->
 * verify in trash -> restore.
 *
 * Each run creates a real user + real rows in Supabase.
 */
test.describe('transactions', () => {
  test('create, edit, delete, restore', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('lang', 'es'));

    const email = `tx-${Date.now()}-${Math.floor(Math.random() * 1e6)}@example.com`;
    const password = 'testPassword123';

    // Sign up + go to transactions
    await page.goto('/auth/register');
    await page.locator('#register-email').fill(email);
    await page.locator('#register-password').fill(password);
    await page.locator('#register-confirm').fill(password);
    await page.locator('form button[type=submit]').click();
    await page.waitForURL('**/app/dashboard');
    await page.goto('/app/transactions');

    await expect(page.locator('text=No hay transacciones')).toBeVisible();
    await expect(page.locator('[data-testid=tx-row]')).toHaveCount(0);

    // ─── Create ─────────────────────────────────────────────────────────
    await page.locator('[data-testid=new-transaction]').click();

    // Type defaults to "Gasto"; fill amount via InputNumber
    await page.locator('#tx-amount').fill('25.50');

    // Open category dropdown and pick "Alimentación"
    await page.locator('#tx-category').click();
    await page.locator('.p-select-option').filter({ hasText: 'Alimentación' }).first().click();

    // Date defaults to today, description optional, payment method defaults
    await page.locator('[data-testid=save-transaction]').click();

    await expect(page.locator('[data-testid=tx-row]')).toHaveCount(1);
    await expect(page.locator('[data-testid=tx-row]')).toContainText('Alimentación');
    await expect(page.locator('[data-testid=tx-row]')).toContainText('25,50');

    // ─── Edit ───────────────────────────────────────────────────────────
    await page.locator('[data-testid=tx-row] button[aria-label="Editar"]').click();
    await page.locator('#tx-amount').fill('99.99');
    await page.locator('[data-testid=save-transaction]').click();

    await expect(page.locator('[data-testid=tx-row]')).toContainText('99,99');

    // ─── Delete ─────────────────────────────────────────────────────────
    await page.locator('[data-testid=tx-row] button[aria-label="Eliminar"]').click();
    await page.locator('.p-confirmdialog-accept-button').click();

    await expect(page.locator('[data-testid=tx-row]')).toHaveCount(0);

    // ─── Trash + restore ────────────────────────────────────────────────
    await page.locator('label[for="show-deleted"]').click();
    await expect(page.locator('[data-testid=tx-row]')).toHaveCount(1);

    await page.locator('[data-testid=tx-row] button[aria-label="Restaurar"]').click();
    await expect(page.locator('[data-testid=tx-row]')).toHaveCount(0);

    // Toggle back to active view, the restored tx is visible
    await page.locator('label[for="show-deleted"]').click();
    await expect(page.locator('[data-testid=tx-row]')).toHaveCount(1);
  });
});
