import { Locator, Page } from "@playwright/test";

export class ShoppingCartPage {
  page: Page;
  checkOutButton: Locator;
  inventoryItemName: Locator;
  titleYourCart: Locator;

  constructor(page) {
    this.page = page;
    this.checkOutButton = page.locator("#checkout");
    this.inventoryItemName = page.locator(".inventory_item_name");
    this.titleYourCart = page.locator("//span[@class='title']");
  }

  //Actions
  async getTitleYourCart() {
    const titleYourCart = this.titleYourCart.textContent();
    return titleYourCart;
  }

  async getInventoryItemName() {
    const inventoryItemName = await this.inventoryItemName.textContent();
    return inventoryItemName;
  }

  async clickCheckoutButton() {
    await this.checkOutButton.click();
  }
}
