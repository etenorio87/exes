import { test, expect } from '@playwright/test';

/**
 * Full CRUD flow for user-owned categories: create -> edit -> delete.
 * Predefined categories must be present (12 of them) and read-only.
 */
test.describe('categories', () => {
  test('create, edit and delete a custom category', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('lang', 'es'));

    const email = `cat-${Date.now()}-${Math.floor(Math.random() * 1e6)}@example.com`;
    const password = 'testPassword123';

    // Sign up + go to categories
    await page.goto('/auth/register');
    await page.locator('#register-email').fill(email);
    await page.locator('#register-password').fill(password);
    await page.locator('#register-confirm').fill(password);
    await page.locator('form button[type=submit]').click();
    await page.waitForURL('**/app/dashboard');
    await page.goto('/app/categories');

    // 12 predefined categories must be visible
    await expect(page.locator('[data-testid=category-row]')).toHaveCount(12);

    // Open create dialog
    await page.locator('[data-testid=new-category]').click();

    const uniqueName = `Test ${Date.now()}`;
    await page.locator('#cat-name').fill(uniqueName);
    // Pick a known color and icon
    await page.locator('[data-color="#3b82f6"]').click();
    await page.locator('[data-icon="pi-briefcase"]').click();
    await page.locator('[data-testid=save-category]').click();

    // Now 13 rows, last one is ours
    await expect(page.locator('[data-testid=category-row]')).toHaveCount(13);
    const newRow = page.locator(`[data-testid=category-row][data-name="${uniqueName}"]`);
    await expect(newRow).toBeVisible();

    // Edit it: rename to <oldName> editado
    await newRow.locator('button[aria-label="Editar"]').click();
    await page.locator('#cat-name').fill(`${uniqueName} editado`);
    await page.locator('[data-testid=save-category]').click();

    const editedRow = page.locator(`[data-testid=category-row][data-name="${uniqueName} editado"]`);
    await expect(editedRow).toBeVisible();

    // Delete it via the confirm dialog
    await editedRow.locator('button[aria-label="Eliminar"]').click();
    await page.locator('.p-confirmdialog-accept-button').click();

    // Back to 12 predefined rows
    await expect(page.locator('[data-testid=category-row]')).toHaveCount(12);
  });
});
