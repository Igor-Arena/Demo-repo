import { Locator, Page, expect } from "@playwright/test";

export class DashboardPage {
  page: Page;
  burgerMenuButton: Locator;
  logoutButton: Locator;
  titleProducts: Locator;
  shoppingCartIcon: Locator;
  addToCartButton: Locator;
  inventoryItemName: Locator;
  inventoryItemsPrice: Locator;
  sortingDropdownList: Locator;

  constructor(page) {
    this.page = page;
    this.burgerMenuButton = page.locator(
      "//button[@id='react-burger-menu-btn']"
    );
    this.logoutButton = page.locator("//a[@id='logout_sidebar_link']");
    this.titleProducts = page.locator(".title");
    this.shoppingCartIcon = page.locator(".shopping_cart_link");
    this.addToCartButton = page.locator("#add-to-cart-sauce-labs-backpack");
    this.inventoryItemName = page.locator(".inventory_item_name");
    this.inventoryItemsPrice = page.locator(".inventory_item_price");
    this.sortingDropdownList = page.locator(".product_sort_container");
  }

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

  async getInventoryItemNameText(elementNumber) {
    const inventoryItemName = await this.inventoryItemName
      .nth(elementNumber)
      .textContent();
    return inventoryItemName;
  }

  async getInventoryItemsPriceArray() {
    const itemsStringArray = await this.inventoryItemsPrice.allTextContents();
    const priceStringArray = itemsStringArray.map((num) => {
      return num.replace("$", "");
    });
    const priceNumberArray = priceStringArray.map(Number);
    return priceNumberArray;
  }

  async sortInventoryItemsPriceArray(sortingType: "descending" | "ascending") {
    if (sortingType === "descending") {
      return (await this.getInventoryItemsPriceArray()).sort((a, b) => b - a);
    }
    if (sortingType === "ascending") {
      return (await this.getInventoryItemsPriceArray()).sort((a, b) => a - b);
    }
  }

  async isDashboardPageLoaded() {
    const isLoaded = await this.titleProducts.isVisible();
    return isLoaded;
  }

  async getTitleProductsText() {
    const titleProductsText = await this.titleProducts.textContent();
    return titleProductsText;
  }

  async sortItemsByOption(option) {
    await this.sortingDropdownList.selectOption(option);
  }

  async navigateToSocialNetwork(socialNetworkName) {
    await this.page.locator(`li.social_${socialNetworkName}`).click();
  }
} 
