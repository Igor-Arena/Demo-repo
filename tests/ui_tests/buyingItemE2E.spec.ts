import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/loginPage";
import { DashboardPage } from "../../pages/dashboardPage";
import { ShoppingCart } from "../../pages/shoppingCart";
import { user1, clientInformation } from "../../standardUserCredentials";

test("BuyingItem E2E test", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const shoppingCart = new ShoppingCart(page);
  const dashboardTitle = dashboardPage.isDashboardPageLoaded();
  await loginPage.goto();
  await loginPage.login(user1.userName, user1.userPassword);
  await dashboardPage.clickAddToCartButton();
  await dashboardPage.clickShoppingCartIcon();
  await shoppingCart.clickCheckoutButton();
  await expect()
  await shoppingCart.fillAllClientInformation(
    clientInformation.clientFirstName,
    clientInformation.clientLastName,
    clientInformation.clientPostCode
  );
  await shoppingCart.clickContinueButton();
  await shoppingCart.clickFinishButton();
  await shoppingCart.clickBackHomeButton();
  await expect(title).toBeTruthy();
});
