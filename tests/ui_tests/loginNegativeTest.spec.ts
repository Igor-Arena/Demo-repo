import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/loginPage";
import { user2InvalidCreds } from "../../constant";

test("LoginNegativeTest", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.fillUserNameInput(user2InvalidCreds.userName);
  await loginPage.fillPasswordInput(user2InvalidCreds.userPassword);
  await loginPage.clickLoginButton();
  await expect(loginPage.getLoginErrorText()).toBeTruthy();
});
