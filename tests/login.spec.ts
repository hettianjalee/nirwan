import { test, expect } from '@config/page.config';

test.describe('login', () => {

  const validUser = process.env.ADMIN_USERNAME!;
  const validPass = process.env.ADMIN_PASSWORD!;

  // -------------------------
  // AC-1: Successful login
  // -------------------------
  test('[AC-1] should log in with valid credentials and reach dashboard', async ({ loginPage, dashboardPage }) => {
    await loginPage.step_navigate();

    await loginPage.step_login(validUser, validPass);

    await expect(dashboardPage.page).toHaveURL(/dashboard/i);
    await dashboardPage.verify_dashboardLoaded();
  });

  // -------------------------
  // AC-2: Invalid credentials
  // -------------------------
  test('[AC-2] should display error for invalid credentials', async ({ loginPage, page }) => {
    await loginPage.step_navigate();

    await page.getByRole('textbox', { name: 'Username', exact: true }).fill('invaliduser');
    await page.getByRole('textbox', { name: 'Password', exact: true }).fill('invalidpass');

    await page.getByRole('button', { name: 'Login', exact: true }).click();

    await expect(page.getByText(/invalid credentials/i)).toBeVisible();
  });

  // -------------------------
  // AC-3: Empty username
  // -------------------------
  test('[AC-3] should show required error for empty username', async ({ loginPage, page }) => {
    await loginPage.step_navigate();

    await page.getByRole('textbox', { name: 'Password', exact: true }).fill('somepassword');
    await page.getByRole('button', { name: 'Login', exact: true }).click();

    await expect(page.getByText(/username.*required/i)).toBeVisible();
  });

  // -------------------------
  // AC-4: Empty password
  // -------------------------
  test('[AC-4] should show required error for empty password', async ({ loginPage, page }) => {
    await loginPage.step_navigate();

    await page.getByRole('textbox', { name: 'Username', exact: true }).fill('someusername');
    await page.getByRole('button', { name: 'Login', exact: true }).click();

    await expect(page.getByText(/password.*required/i)).toBeVisible();
  });

  // -------------------------
  // AC-5: Both fields empty
  // -------------------------
  test('[AC-5] should show required errors when both fields are empty', async ({ loginPage, page }) => {
    await loginPage.step_navigate();

    await page.getByRole('button', { name: 'Login', exact: true }).click();

    await expect(page.getByText(/username.*required/i)).toBeVisible();
    await expect(page.getByText(/password.*required/i)).toBeVisible();
  });

  // -------------------------
  // AC-6: Valid username + invalid password
  // -------------------------
  test('[AC-6] should reject valid username with invalid password', async ({ loginPage, page }) => {
    await loginPage.step_navigate();

    await page.getByRole('textbox', { name: 'Username', exact: true }).fill(validUser);
    await page.getByRole('textbox', { name: 'Password', exact: true }).fill('WrongPass123');

    await page.getByRole('button', { name: 'Login', exact: true }).click();

    await expect(page.getByText(/invalid credentials/i)).toBeVisible();
  });

  // -------------------------
  // AC-7: Case sensitivity
  // -------------------------
  test('[AC-7] should reject password with incorrect case', async ({ loginPage, page }) => {
    await loginPage.step_navigate();

    await page.getByRole('textbox', { name: 'Username', exact: true }).fill(validUser);
    await page.getByRole('textbox', { name: 'Password', exact: true }).fill(validPass.toLowerCase());

    await page.getByRole('button', { name: 'Login', exact: true }).click();

    await expect(page.getByText(/invalid credentials/i)).toBeVisible();
  });

});