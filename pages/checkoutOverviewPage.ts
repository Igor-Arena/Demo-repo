import { Locator, Page } from "@playwright/test";

export class CheckoutOverviewPage {
  page: Page;
  finishButton: Locator;
  titleOverview: Locator;
  inventoryItemName: Locator;

  constructor(page) {
    this.page = page;
    this.titleOverview = page.locator("//span[@class='title']");
    this.finishButton = page.locator("#finish");
    this.inventoryItemName = page.locator(".inventory_item_name");
  }

  async getTitleOverviewText() {
    const titleOverview = await this.titleOverview.textContent();
    return titleOverview;
  }

  async getInventoryItemNameText() {
    const inventoryItemName = await this.inventoryItemName.textContent();
    return inventoryItemName;
  }

  async clickFinishButton() {
    await this.finishButton.click();
  }
}
