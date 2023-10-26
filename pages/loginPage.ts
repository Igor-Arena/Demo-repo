import { type Locator, type Page, expect } from "@playwright/test";
import { baseUiUrl } from "../constant";

export class LoginPage {
  page: Page;
  userNameInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;
  loginErrorText: Locator;

  constructor(page) {
    this.page = page;
    this.userNameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.loginErrorText = page.locator('h3', {
      hasText:
        'Epic sadface: Username and password do not match any user in this service',
    });
  }

  //Actions
  async goto() {
    await this.page.goto(baseUiUrl);
  }

  async fillUserNameInput(userNameValue: string) {
    await this.userNameInput.fill(userNameValue);
  }

  public async fillPasswordInput(userPasswordValue: any) {
    await this.passwordInput.fill(userPasswordValue);
  }

  public async clickLoginButton() {
    await this.loginButton.click();
  }

  async getLoginErrorText () {
    await expect(this.loginErrorText).toBeVisible();
  }

  async logInValidCredentials(
    validUserNameValue: string,
    validUserPasswordValue: any
  ) {
    await this.goto();
    await this.fillUserNameInput(validUserNameValue);
    await this.fillPasswordInput(validUserPasswordValue);
    await this.clickLoginButton();
  }

  //Error messages
}
