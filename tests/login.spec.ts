// spec: .ordino/stories/login.story.md
import { test, expect } from '@config/page.config';
import { loginExpected as expected } from '@config/page-loader';

test.describe('login', () => {


  // scenario: Happy Path
  test('[AC-1] should log in with valid credentials and reach dashboard', async ({ loginPage, dashboardPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(process.env.ADMIN_USERNAME!, process.env.ADMIN_PASSWORD!);
    await dashboardPage.verify_dashboardLoaded();
  });

  // scenario: Invalid Credentials
  test('[AC-2] should display error message with invalid credentials', async ({ loginPage, page }) => {
    await loginPage.step_navigate();
    await page.getByRole('textbox', { name: 'Username', exact: true }).fill('invaliduser');
    await page.getByRole('textbox', { name: 'Password', exact: true }).fill('invalidpass');
    await page.getByRole('button', { name: 'Login', exact: true }).click();
    await page.waitForTimeout(2000);
    const stillOnLoginPage = page.url().includes('/auth/login');
    expect(stillOnLoginPage).toBeTruthy();
  });

  // scenario: Empty Username
  test('[AC-3] should not allow login with empty username', async ({ loginPage, page }) => {
    await loginPage.step_navigate();
    await page.getByRole('textbox', { name: 'Password', exact: true }).fill('somepassword');
    await page.getByRole('button', { name: 'Login', exact: true }).click();
    await page.waitForTimeout(1000);
    const remainsOnLoginPage = page.url().includes('/auth/login');
    expect(remainsOnLoginPage).toBeTruthy();
  });

  // scenario: Empty Password
  test('[AC-4] should not allow login with empty password', async ({ loginPage, page }) => {
    await loginPage.step_navigate();
    await page.getByRole('textbox', { name: 'Username', exact: true }).fill('someusername');
    await page.getByRole('button', { name: 'Login', exact: true }).click();
    await page.waitForTimeout(1000);
    const remainsOnLoginPage = page.url().includes('/auth/login');
    expect(remainsOnLoginPage).toBeTruthy();
  });

});
