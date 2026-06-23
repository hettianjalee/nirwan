// AUTO-GENERATED — edit this file directly; use ordino_generate_code create/register_page for structural changes
import { BasePage } from './BasePage';


export class LoginPage extends BasePage {
  readonly path = '/web/index.php/auth/login';

  // ── Locators ──────────────────────────────────────────────────────────
  // locator-helper: role_name
  private usernameInput = this.page.getByRole('textbox', { name: 'Username', exact: true });
  // locator-helper: role_name
  private passwordInput = this.page.getByRole('textbox', { name: 'Password', exact: true });
  // locator-helper: role_name
  private loginButton = this.page.getByRole('button', { name: 'Login', exact: true });

  // ── Steps ──────────────────────────────────────────────────────────────
  /**
   * Navigates to the login page and waits for it to load.
   * @returns this for chaining
   */
  async step_navigate(): Promise<this> {
    await this.page.goto(this.path);
    await this.waitForPageLoad();
    return this;
  }

  /**
   * Fills credentials and submits the login form.
   * @param username - Username (string)
   * @param password - Password (string)
   * @returns this for chaining
   */
  async step_login(username: string, password: string): Promise<this> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForURL("**/dashboard/index", { timeout: 15000 });
    return this;
  }

  // ── Verifies ───────────────────────────────────────────────────────────

}
