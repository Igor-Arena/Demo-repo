import { Locator, Page } from "@playwright/test";

export class CheckoutCompletePage {
  page: Page;
  titleComplete: Locator;
  backHomeButton: Locator;
  completeMessage: Locator;

  constructor(page) {
    this.page = page;
    this.titleComplete = page.locator("//span[@class='title']");
    this.backHomeButton = page.locator("#back-to-products");
    this.completeMessage = page.locator(
      ".complete-header"
    );
  }

  async getTitleCompleteText() {
    const titleComplete = await this.titleComplete.textContent();
    return titleComplete;
  }

  async getCompleteMessageText() {
    const completeMessage = await this.completeMessage.textContent();
    return completeMessage;
  }

  async clickBackHomeButton() {
    await this.backHomeButton.click();
  }
}
