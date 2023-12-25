import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "../../../pages/realWorldApp/loginPage";
import { HomePage } from "../../../pages/realWorldApp/homePage";
import { PaymentProcessPage } from "../../../pages/realWorldApp/paymentProcessPage";
import { realWorldAppUrl, realWorldAppUser } from "../../../constant";
import { faker } from "@faker-js/faker";

let page: Page;
let loginPage: LoginPage;
let homePage: HomePage;
let paymentProcessPage: PaymentProcessPage;

test.beforeAll(async ({ browser: Browser }) => {
  page = await Browser.newPage();
  loginPage = new LoginPage(page);
  homePage = new HomePage(page);
  paymentProcessPage = new PaymentProcessPage(page);
  await page.goto(realWorldAppUrl);
  await loginPage.login(
    realWorldAppUser.userName,
    realWorldAppUser.userPassword
  );
});

test("Creating new payment", async () => {
  await homePage.clickNewButton();
  const selectContactStep =
    await paymentProcessPage.getSelectContactStepTitleText();
  expect(selectContactStep).toMatch("Select Contact");
  await paymentProcessPage.selectContact(0);
  await paymentProcessPage.fillAmount(faker.string.numeric(1));
  await paymentProcessPage.fillNote(
    faker.string.alpha({ length: { min: 5, max: 15 } })
  );
  await paymentProcessPage.clickPayButton();
  const returnToTransactions =
    await paymentProcessPage.getReturnToTransactionsText();
  expect(returnToTransactions).toMatch("Return To Transactions");
});
