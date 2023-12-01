import { Locator, Page } from "@playwright/test";

export class DashboardPage {
  page: Page;
  burgerMenuButton: Locator;
  logoutButton: Locator;
  titleProducts: Locator;
  shoppingCartIcon: Locator;
  addToCartButton: Locator;
  inventoryItemName: Locator;
  inventoryItemsPriceArray: Locator;
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
    this.inventoryItemsPriceArray = page.locator(".inventory_item_price");
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
    const itemsStringArray =
      await this.inventoryItemsPriceArray.allTextContents();
    const ArrayWithoutText = itemsStringArray.map((num) => {
      return num.replace("$", "");
    });
    const NumberArray = ArrayWithoutText.map(Number);
    return NumberArray;
  }

  async sortInventoryItemsPriceArray() {
    const sortedNumberArray = (
      await this.getInventoryItemsPriceArray()
    ).sort((a, b) => b - a);
    return sortedNumberArray;
  }

  async isDashboardPageLoaded() {
    const isLoaded = await this.titleProducts.isVisible();
    return isLoaded;
  }

  async getTitleProductsText() {
    const titleProductsText = await this.titleProducts.textContent();
    return titleProductsText;
  }

  async selectSortingFromDropdownList() {
    await this.sortingDropdownList.selectOption({ value: "hilo" });
  }
}
