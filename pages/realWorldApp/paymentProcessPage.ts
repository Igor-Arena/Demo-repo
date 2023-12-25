import { Page, Locator } from "@playwright/test";

export class PaymentProcessPage {
  page: Page;
  selectContactStepTitle: Locator;

  constructor(page) {
    this.page = page;
    this.selectContactStepTitle = page.locator(".MuiTypography-root.MuiStepLabel-label.MuiStepLabel-active.MuiTypography-body2.MuiTypography-displayBlock"
    );
  }

  async getSelectContactStepTitleText() {
    const titleText = await this.selectContactStepTitle.textContent()
    return titleText;
  }
}
