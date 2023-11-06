import { type Locator, type Page } from "@playwright/test";
import { baseUiUrl } from "../standardUserCredentials";

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
    this.loginErrorText = page.locator('[data-test="error"]');
  }

  //Actions
  async goto() {
    await this.page.goto(baseUiUrl);
  }

  async fillUserNameInput(userNameValue: string) {
    await this.userNameInput.fill(userNameValue);
  }

  async fillPasswordInput(userPasswordValue: any) {
    await this.passwordInput.fill(userPasswordValue);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async getLoginErrorText () {
    const errorText = await this.loginErrorText.textContent();
    return errorText;
  }

  async login(
    userNameValue: string,
    userPasswordValue: any
  ) {
    await this.fillUserNameInput(userNameValue);
    await this.fillPasswordInput(userPasswordValue);
    await this.clickLoginButton();
  }
}
