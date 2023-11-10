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
  titleYourInformation: Locator;
  titleOverview: Locator;
  titleComplete: Locator;

  constructor(page) {
    this.page = page;
    this.checkOutButton = page.locator("#checkout");
    this.firstNameInput = page.locator("#first-name");
    this.lastNameInput = page.locator("#last-name");
    this.postalCodeInput = page.locator("#postal-code");
    this.continueButton = page.locator("#continue");
    this.finishButton = page.locator("#finish");
    this.backHomeButton = page.locator("#back-to-products");
    this.titleYourInformation = page.locator('title', {name: 'Checkout: Your Information'});
    this.titleOverview = page.locator('title', {name: 'Checkout: Overview'});
    this.titleComplete = page.locator('title', {name: 'Checkout: Complete!'});
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

  async getTitleYourInformation() {
    const titleYourInformation = await this.titleYourInformation.textContent();
    return titleYourInformation;
  }

  async getTitleOverview() {
    const titleOverview = await this.titleOverview.textContent();
    return titleOverview;
  }

  async getTitleComplete () {
    const titleComplete = await this.titleComplete.textContent();
    return titleComplete;
  }
}