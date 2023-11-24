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
let inventoryItemNameOnShoppingCartPage: string | null;
let inventoryItemNameOnDashboardPage: string | null;

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
    inventoryItemNameOnDashboardPage =
      await dashboardPage.getInventoryItemNameText(0);
    await dashboardPage.clickShoppingCartIcon();
    const titleYourCart = await shoppingCartPage.getTitleYourCartText();
    await expect(titleYourCart).toMatch("Your Cart");
  });
  await test.step("Identifying added item name on 'Your cart page'", async () => {
    inventoryItemNameOnShoppingCartPage =
      await shoppingCartPage.getInventoryItemNameText();
    await expect(inventoryItemNameOnShoppingCartPage).toContain(
      inventoryItemNameOnDashboardPage
    );
    await shoppingCartPage.clickCheckoutButton();
    const titleYourInformation =
      await checkoutInformationPage.getTitleYourInformationText();
    await expect(titleYourInformation).toMatch("Checkout: Your Information");
  });
  await test.step("Filling in client information", async () => {
    await checkoutInformationPage.fillAllClientInformation(
      faker.person.firstName(),
      faker.person.lastName(),
      faker.string.numeric(5)
    );
    await checkoutInformationPage.clickContinueButton();
    const titleOverview = await checkoutOverviewPage.getTitleOverviewText();
    await expect(titleOverview).toMatch("Checkout: Overview");
  });
  await test.step("Identifying that correct item is shown and item is bought", async () => {
    const inventoryItemNameOnOverviewPage =
      await checkoutOverviewPage.getInventoryItemNameText();
    await expect(inventoryItemNameOnOverviewPage).toEqual(
      inventoryItemNameOnShoppingCartPage
    );
    await checkoutOverviewPage.clickFinishButton();
    const titleComplete = await checkoutCompletePage.getTitleCompleteText();
    await expect(titleComplete).toMatch("Checkout: Complete!");
    const completeMessage =
      await checkoutCompletePage.getCompleteMessageText();
    await expect(completeMessage).toMatch("Thank you for your order!");
  });
  await test.step("Navigating back to the dashboard", async () => {
    await checkoutCompletePage.clickBackHomeButton();
    const titleProducts = await dashboardPage.getTitleProductsText();
    await expect(titleProducts).toMatch('Products');
  });
});
