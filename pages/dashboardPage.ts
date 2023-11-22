import { Locator, Page } from "@playwright/test";

export class DashboardPage {
  page: Page;
  burgerMenuButton: Locator;
  logoutButton: Locator;
  titleProducts: Locator;
  shoppingCartIcon: Locator;
  addToCartButton: Locator;
  inventoryItemName: Locator;

  constructor(page) {
    this.page = page;
    this.burgerMenuButton = page.locator(
      "//button[@id='react-burger-menu-btn']"
    );
    this.logoutButton = page.locator("//a[@id='logout_sidebar_link']");
    this.titleProducts = page.locator(".title");
    this.shoppingCartIcon = page.locator(".shopping_cart_link");
    this.addToCartButton = page.locator("#add-to-cart-sauce-labs-backpack");
    this.inventoryItemName = page.locator("a[id='item_4_title_link'] div[class='inventory_item_name ']");
  }

  //Actions
  async clickBurgerMenuButton() {
    await this.burgerMenuButton.click();
  }

  async clickLogoutButton() {
    await this.logoutButton.click();
  }

  async clickAddToCartButton() {
    await this.addToCartButton.click();
  }

  async clickShoppingCartIcon() {
    await this.shoppingCartIcon.click();
  }

  async getInventoryItemNameText() {
    const inventoryItemName = await this.inventoryItemName.textContent();
    return inventoryItemName;
  }

  async isDashboardPageLoaded() {
    const isLoaded = await this.titleProducts.isVisible();
    return isLoaded;
  }

  async getTitleProductsText() {
    const titleProductsText = await this.titleProducts.textContent();
    return titleProductsText;
  }
}