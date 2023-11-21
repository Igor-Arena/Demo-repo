import { Locator, Page } from "@playwright/test";

export class CheckoutInformationPage {
  page: Page;
  titleYourInformation: Locator;
  firstNameInput: Locator;
  lastNameInput: Locator;
  postalCodeInput: Locator;
  continueButton: Locator;

  constructor(page) {
    this.page = page;
    this.titleYourInformation = page.locator(
      "//span[@class='title']"
    );
    this.firstNameInput = page.locator("#first-name");
    this.lastNameInput = page.locator("#last-name");
    this.postalCodeInput = page.locator("#postal-code");
    this.continueButton = page.locator("#continue");
  }

  async getTitleYourInformation() {
    const titleYourInformation = await this.titleYourInformation.textContent();
    return titleYourInformation;
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
}
