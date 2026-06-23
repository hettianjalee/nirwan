// spec: .ordino/stories/smoke.story.md
import { test, expect } from '@config/page.config';

// scenario: Happy Path
test('[AC-1] should be reachable at the base URL', async ({ page }) => {
  await page.goto('/');
  await expect(page).not.toHaveURL('about:blank');
});

// scenario: Login Page Accessibility
test('[AC-2] should display login page with all required fields', async ({ page }) => {
  await page.goto('/web/index.php/auth/login');
  await expect(page.getByRole('textbox', { name: 'Username', exact: true })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Password', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Login', exact: true })).toBeVisible();
});
