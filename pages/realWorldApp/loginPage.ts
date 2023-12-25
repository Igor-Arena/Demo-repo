import { type Locator, type Page } from "@playwright/test";
import { realWorldAppUrl } from "../../constant";

export class LoginPage {
  page: Page;
  loginName: Locator;
  loginPassword: Locator;
  loginButton: Locator;
  rememberMeCheckbox: Locator;
  constructor(page) {
    this.page = page;
    this.loginName = page.locator("#username");
    this.loginPassword = page.locator("#password");
    this.loginButton = page.locator(".MuiButton-label");
    this.rememberMeCheckbox = page.locator("input[name='remember']");
  }

  async login(userName, userPassword) {
    await this.loginName.fill(userName);
    await this.loginPassword.fill(userPassword);
    await this.rememberMeCheckbox.click();
    await this.loginButton.click();
  }
}
