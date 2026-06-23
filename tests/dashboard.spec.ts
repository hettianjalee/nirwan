// spec: .ordino/stories/dashboard.story.md
import { test, expect } from '@config/page.config';
import { loginExpected as expected } from '@config/page-loader';

test.describe('dashboard', () => {

  // scenario: Dashboard Navigation After Login
  test('[AC-1] should navigate to dashboard URL after successful login', async ({ loginPage, dashboardPage, page }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(process.env.ADMIN_USERNAME!, process.env.ADMIN_PASSWORD!);
    await expect(page).toHaveURL(new RegExp(expected.dashboardUrlRegex));
  });

});
