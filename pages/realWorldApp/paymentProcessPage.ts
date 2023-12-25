import { Page, Locator } from "@playwright/test";

export class PaymentProcessPage {
  page: Page;
  selectContactStepTitle: Locator;
  usersList: Locator;
  amountInputField: Locator;
  addNoteInputField: Locator;
  payButton: Locator;
  returnToTransactionsButton: Locator;

  constructor(page) {
    this.page = page;
    this.selectContactStepTitle = page.locator(
      ".MuiTypography-root.MuiStepLabel-label.MuiStepLabel-active.MuiTypography-body2.MuiTypography-displayBlock"
    );
    this.usersList = page.locator("ul[data-test='users-list']");
    this.amountInputField = page.locator("#amount");
    this.addNoteInputField = page.locator(
      "#transaction-create-description-input"
    );
    this.payButton = page.locator(
      "div[class='MuiContainer-root MuiContainer-maxWidthXs'] div:nth-child(2) button:nth-child(1)"
    );
    this.returnToTransactionsButton = page.locator(
      "a[class='MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedSizeSmall MuiButton-sizeSmall']"
    );
  }

  async getSelectContactStepTitleText() {
    const titleText = await this.selectContactStepTitle.textContent();
    return titleText;
  }

  async selectContact(user) {
    await this.usersList.nth(user).click();
  }

  async fillAmount(amount) {
    await this.amountInputField.fill(amount);
  }

  async fillNote(note) {
    await this.addNoteInputField.fill(note);
  }

  async clickPayButton() {
    await this.payButton.click();
  }

  async getReturnToTransactionsText() {
   const returnToTransactions = await this.returnToTransactionsButton.textContent();
   return returnToTransactions;
  }
}
