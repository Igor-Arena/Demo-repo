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

test("User can by items", async () => {
  test.step("Login", async () => {
    await loginPage.login(
      standardUserCredentials.userName,
      standardUserCredentials.userPassword
    );
  });
  await test.step("Adding item and navigating to the buscket", async () => {
    await dashboardPage.clickAddToCartButton();
    await dashboardPage.clickShoppingCartIcon();
    const getTitleYourCart = await shoppingCartPage.getTitleYourCart();
    await expect(getTitleYourCart).toMatch("Your Cart");
  });
  await test.step("identifying added item name on 'Your cart page'", async () => {
    getInventoryItemNameOnShoppingCartPage =
      await shoppingCartPage.getInventoryItemName();
    expect(getInventoryItemNameOnShoppingCartPage).toBeTruthy();
    await shoppingCartPage.clickCheckoutButton();
    const getTitleYourInformation =
      await checkoutInformationPage.getTitleYourInformation();
    await expect(getTitleYourInformation).toMatch("Checkout: Your Information");
  });
  await test.step("Filling in client information", async () => {
    await checkoutInformationPage.fillAllClientInformation(
      faker.person.firstName(),
      faker.person.lastName(),
      faker.string.numeric(5)
    );
    await checkoutInformationPage.clickContinueButton();
    const getTitleOverview = await checkoutOverviewPage.getTitleOverview();
    await expect(getTitleOverview).toMatch("Checkout: Overview");
  });
  await test.step("Identifying that correct item is shown and item is bought", async () => {
    const getInventoryItemNameOnOverviewPage =
      await checkoutOverviewPage.getInventoryItemName();
    await expect(getInventoryItemNameOnOverviewPage).toEqual(
      getInventoryItemNameOnShoppingCartPage
    );
    await checkoutOverviewPage.clickFinishButton();
    const getTitleComplete = await checkoutCompletePage.getTitleComplete();
    await expect(getTitleComplete).toMatch("Checkout: Complete!");
    const getCompleteMessage = await checkoutCompletePage.getCompleteMessage();
    await expect(getCompleteMessage).toMatch("Thank you for your order!");
  });
  await test.step("Navigating back to the dashboard", async () => {
    await checkoutCompletePage.clickBackHomeButton();
    const dashboardTitle = await dashboardPage.isDashboardPageLoaded();
    await expect(dashboardTitle).toMatch("Products");
  });
});
