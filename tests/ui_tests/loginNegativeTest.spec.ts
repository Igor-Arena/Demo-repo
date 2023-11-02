import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/loginPage";
import { user2InvalidCreds } from "../../constant";

test("LoginNegativeTest", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.fillUserNameInput(user2InvalidCreds.userName);
  await loginPage.fillPasswordInput(user2InvalidCreds.userPassword);
  await loginPage.clickLoginButton();
  const errorTextMessage = await loginPage.getLoginErrorText();
  expect(errorTextMessage).toBe('Epic sadface: Username and password do not match any user in this service');
});
