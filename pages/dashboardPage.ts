import { Locator, Page } from "@playwright/test";

export class DashboardPage {
  page: Page;
  burgerMenuButton: Locator;
  logoutButton: Locator;
  constructor(page) {
    this.page = page;
    this.burgerMenuButton = page.locator("//button[@id='react-burger-menu-btn']");
    this.logoutButton = page.locator("//a[@id='logout_sidebar_link']");
  }

  //Actions
  public async clickBurgerMenuButton() {
    await this.burgerMenuButton.click();
  }

  public async clickLogoutButton() {
    await this.logoutButton.click();
  }
}
