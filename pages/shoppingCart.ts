import { Locator, Page } from "@playwright/test";

export class ShoppingCart {
  page: Page;
  checkOutButton: Locator;
  firstNameInput: Locator;
  lastNameInput: Locator;
  postalCodeInput: Locator;
  continueButton: Locator;
  finishButton: Locator;
  backHomeButton: Locator;
  checkoutTitle: Locator;

  constructor(page) {
    this.page = page;
    this.checkOutButton = page.locator("#checkout");
    this.firstNameInput = page.locator("#first-name");
    this.lastNameInput = page.locator("#last-name");
    this.postalCodeInput = page.locator("#postal-code");
    this.continueButton = page.locator("#continue");
    this.finishButton = page.locator("#finish");
    this.backHomeButton = page.locator("#back-to-products");
    this.checkoutTitle = page.locator("//span[@class='title']");
  }

  //Actions
  async clickCheckoutButton() {
    await this.checkOutButton.click();
  }

  async fillFirstNameInput(firstName) {
    await this.firstNameInput.fill(firstName);
  }

  async fillLastNameInput(lastName) {
    await this.lastNameInput.fill(lastName);
  }

  async fillPostalCodeInput(postalCode) {
    await this.postalCodeInput.fill(postalCode);
  }

  async fillAllClientInformation(
    clientFirstNameValue: string,
    clientLastNameValue: string,
    clientPostCodeValue: any
  ) {
    await this.fillFirstNameInput(clientFirstNameValue);
    await this.fillLastNameInput(clientLastNameValue);
    await this.fillPostalCodeInput(clientPostCodeValue);
  }

  async clickContinueButton() {
    await this.continueButton.click();
  }
  async clickFinishButton() {
    await this.finishButton.click();
  }

  async clickBackHomeButton() {
    await this.backHomeButton.click();
  }

  //Assertions
async getCheckoutTitle() {
  const checkoutTitleText = await this.checkoutTitle.textContent();
  return checkoutTitleText;
}
}


