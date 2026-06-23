// AUTO-GENERATED — edit this file directly; use ordino_generate_code create/register_page for structural changes
import { BasePage } from './BasePage';
import { loginExpected as expected } from '@config/page-loader';
import { expect } from '@playwright/test';


export class DashboardPage extends BasePage {
  readonly path = '/web/index.php/dashboard/index';

  // ── Locators ──────────────────────────────────────────────────────────
  // locator-helper: role_name
  private dashboardLink = this.page.getByRole('link', { name: 'Dashboard', exact: true });

  // ── Steps ──────────────────────────────────────────────────────────────


  // ── Verifies ───────────────────────────────────────────────────────────
  /**
   * Verifies the dashboard is loaded after successful login.
   * @returns this for chaining
   */
  async verify_dashboardLoaded(): Promise<this> {
    await this.dashboardLink.waitFor({ state: 'visible' });
    await expect(this.dashboardLink).toBeVisible();
    await expect(this.page).toHaveURL(new RegExp(expected.dashboardUrlRegex.replace(/\//g, '\\/') + '$'));
    return this;
  }
}
