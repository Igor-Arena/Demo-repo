import { test, expect, Page, Browser } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { LoginPage } from "../../pages/loginPage";
import { DashboardPage } from "../../pages/dashboardPage";
import { ShoppingCart } from "../../pages/shoppingCart";
import { standardUserCredentials } from "../../constant";

let page: Page;
let loginPage: LoginPage;
let dashboardPage: DashboardPage;
let shoppingCart: ShoppingCart;

test.beforeAll(async ({ browser: Browser }) => {
  page = await Browser.newPage();
  loginPage = new LoginPage(page);
  dashboardPage = new DashboardPage(page);
  shoppingCart = new ShoppingCart(page);
  await loginPage.goto();
});

test("BuyingItem E2E test", async () => {
  await loginPage.login(
    standardUserCredentials.userName,
    standardUserCredentials.userPassword
  );
  await dashboardPage.clickAddToCartButton();
  await dashboardPage.clickShoppingCartIcon();
  await shoppingCart.clickCheckoutButton();
  const getTitleYourInformation = shoppingCart.getTitleYourInformation();
  await expect(getTitleYourInformation).toBeTruthy();
  await shoppingCart.fillAllClientInformation(
    faker.person.firstName(),
    faker.person.lastName(),
    faker.string.numeric(5)
  );
  await shoppingCart.clickContinueButton();
  const getTitleOverview = shoppingCart.getTitleOverview();
  await expect(getTitleOverview).toBeTruthy();
  await shoppingCart.clickFinishButton();
  const getTitleComplete = shoppingCart.getTitleComplete();
  await expect(getTitleComplete).toBeTruthy();
  await shoppingCart.clickBackHomeButton();
  const dashboardTitle = dashboardPage.isDashboardPageLoaded();
  await expect(dashboardTitle).toBeTruthy();
});