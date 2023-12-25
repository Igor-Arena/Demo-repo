import { Locator, Page } from "@playwright/test";

export class HomePage {
  page: Page;
  logOutButton: Locator;
  newButton: Locator;

  constructor(page) {
    this.page = page;
    this.logOutButton = page.locator(
      ".MuiButtonBase-root.MuiButton-root.MuiButton-contained.makeStyles-newTransactionButton-13.MuiButton-colorInherit"
    );
    this.newButton = page.locator(
      ".MuiButton-label"
    );
  }

  async clickNewButton() {
    await this.newButton.click();
  }
}
