// spec: .ordino/stories/dashboard.story.md
import { test, expect } from '@config/page.config';
import { loginExpected as expected } from '@config/page-loader';

test.describe('dashboard', () => {

  const validUser = process.env.ADMIN_USERNAME!;
  const validPass = process.env.ADMIN_PASSWORD!;

  // -------------------------
  // AC-1: Dashboard navigation
  // -------------------------
  test('[AC-1] should navigate to dashboard URL after successful login', async ({ loginPage, dashboardPage, page }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(validUser, validPass);

    await expect(page).toHaveURL(new RegExp(expected.dashboardUrlRegex));
  });

  // -------------------------
  // AC-2: Dashboard loads core UI
  // -------------------------
  test('[AC-2] should load dashboard main components', async ({ loginPage, dashboardPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(validUser, validPass);

    await dashboardPage.verify_dashboardLoaded();

    // Example UI checks (adjust selectors if needed)
    await expect(dashboardPage.page.getByText(/dashboard/i)).toBeVisible();
    await expect(dashboardPage.page.getByRole('navigation')).toBeVisible();
  });

  // -------------------------
  // AC-3: Sidebar navigation works
  // -------------------------
  test('[AC-3] should navigate via sidebar menu items', async ({ loginPage, dashboardPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(validUser, validPass);

    const page = dashboardPage.page;

    await page.getByRole('link', { name: /settings/i }).click();
    await expect(page).toHaveURL(/settings/i);

    await page.goBack();
    await expect(page).toHaveURL(new RegExp(expected.dashboardUrlRegex));
  });

  // -------------------------
  // AC-4: Logout functionality
  // -------------------------
  test('[AC-4] should logout successfully and redirect to login page', async ({ loginPage, dashboardPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(validUser, validPass);

    const page = dashboardPage.page;

    await page.getByRole('button', { name: /logout/i }).click();

    await expect(page).toHaveURL(/login|auth\/login/i);
  });

  // -------------------------
  // AC-5: Session persistence after refresh
  // -------------------------
  test('[AC-5] should persist session after page refresh', async ({ loginPage, dashboardPage, page }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(validUser, validPass);

    await page.reload();

    await expect(page).toHaveURL(new RegExp(expected.dashboardUrlRegex));
    await dashboardPage.verify_dashboardLoaded();
  });

  // -------------------------
  // AC-6: Unauthorized access blocked
  // -------------------------
  test('[AC-6] should redirect unauthorized user to login', async ({ page }) => {
    await page.goto('/dashboard');

    await expect(page).toHaveURL(/login|auth\/login/i);
  });

});