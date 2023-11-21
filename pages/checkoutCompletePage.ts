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
      "//h2[normalize-space()='Thank you for your order!']"
    );
  }

  async getTitleComplete() {
    const titleComplete = await this.titleComplete.textContent();
    return titleComplete;
  }

  async getCompleteMessage() {
    const completeMessage = await this.completeMessage.textContent();
    return completeMessage;
  }

  async clickBackHomeButton() {
    await this.backHomeButton.click();
  }
}
