import { test, expect } from '@playwright/test';

test.describe('rasptherm-e2e', () => {
  test.beforeEach(async ({ page }) => await page.goto('/'));

  test('should display temperature', async ({ page }) => {
    await expect(page.getByText(/21.0/)).toBeVisible();
  });

  test('should display humidity', async ({ page }) => {
    await expect(page.getByText(/60.0/)).toBeVisible();
  });
});
