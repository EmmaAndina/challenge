import { Page } from '@playwright/test';
import { loginSelectors } from '../selectors/loginSelectors';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto(process.env.WEB_URL || '');
  }

  async validateLoginPage() {
    await this.page.waitForSelector(loginSelectors.loginTitle);
    await this.page.waitForSelector(loginSelectors.email);
    await this.page.waitForSelector(loginSelectors.password);
  }

  async login(email: string, password: string) {
    await this.page.fill(loginSelectors.email, email);
    await this.page.fill(loginSelectors.password, password);
    await this.page.click(loginSelectors.buttonLogin);
  }
}
