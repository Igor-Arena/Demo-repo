import { test, expect, Page } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { LoginPage } from "../../pages/loginPage";
import { DashboardPage } from "../../pages/dashboardPage";
import { ShoppingCartPage } from "../../pages/shoppingCartPage";
import { CheckoutCompletePage } from "../../pages/checkoutCompletePage";
import { CheckoutInformationPage } from "../../pages/checkoutInformationPage";
import { CheckoutOverviewPage } from "../../pages/checkoutOverviewPage";
import { standardUserCredentials } from "../../constant";

let page: Page;
let loginPage: LoginPage;
let dashboardPage: DashboardPage;
let shoppingCartPage: ShoppingCartPage;
let checkoutCompletePage: CheckoutCompletePage;
let checkoutInformationPage: CheckoutInformationPage;
let checkoutOverviewPage: CheckoutOverviewPage;
let getInventoryItemNameOnShoppingCartPage: string | null;
let getInventoryItemNameOnDashboardPage: string | null;

test.beforeAll(async ({ browser: Browser }) => {
  page = await Browser.newPage();
  loginPage = new LoginPage(page);
  dashboardPage = new DashboardPage(page);
  shoppingCartPage = new ShoppingCartPage(page);
  checkoutCompletePage = new CheckoutCompletePage(page);
  checkoutInformationPage = new CheckoutInformationPage(page);
  checkoutOverviewPage = new CheckoutOverviewPage(page);
  await loginPage.goto();
});

test("User can buy items", async () => {
  test.step("Login", async () => {
    await loginPage.login(
      standardUserCredentials.userName,
      standardUserCredentials.userPassword
    );
  });
  await test.step("Adding item and navigating to the basket", async () => {
    await dashboardPage.clickAddToCartButton();
    getInventoryItemNameOnDashboardPage =
      await dashboardPage.getInventoryItemNameText();
    await dashboardPage.clickShoppingCartIcon();
    const getTitleYourCart = await shoppingCartPage.getTitleYourCartText();
    await expect(getTitleYourCart).toMatch("Your Cart");
  });
  await test.step("Identifying added item name on 'Your cart page'", async () => {
    getInventoryItemNameOnShoppingCartPage =
      await shoppingCartPage.getInventoryItemNameText();
    await expect(getInventoryItemNameOnShoppingCartPage).toEqual(
      getInventoryItemNameOnDashboardPage
    );
    await shoppingCartPage.clickCheckoutButton();
    const getTitleYourInformation =
      await checkoutInformationPage.getTitleYourInformationText();
    await expect(getTitleYourInformation).toMatch("Checkout: Your Information");
  });
  await test.step("Filling in client information", async () => {
    await checkoutInformationPage.fillAllClientInformation(
      faker.person.firstName(),
      faker.person.lastName(),
      faker.string.numeric(5)
    );
    await checkoutInformationPage.clickContinueButton();
    const getTitleOverview = await checkoutOverviewPage.getTitleOverviewText();
    await expect(getTitleOverview).toMatch("Checkout: Overview");
  });
  await test.step("Identifying that correct item is shown and item is bought", async () => {
    const getInventoryItemNameOnOverviewPage =
      await checkoutOverviewPage.getInventoryItemNameText();
    await expect(getInventoryItemNameOnOverviewPage).toEqual(
      getInventoryItemNameOnShoppingCartPage
    );
    await checkoutOverviewPage.clickFinishButton();
    const getTitleComplete = await checkoutCompletePage.getTitleCompleteText();
    await expect(getTitleComplete).toMatch("Checkout: Complete!");
    const getCompleteMessage =
      await checkoutCompletePage.getCompleteMessageText();
    await expect(getCompleteMessage).toMatch("Thank you for your order!");
  });
  await test.step("Navigating back to the dashboard", async () => {
    await checkoutCompletePage.clickBackHomeButton();
    const getTitleProducts = await dashboardPage.getTitleProductsText();
    await expect(getTitleProducts).toMatch('Products');
  });
});
