import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/loginPage";
import { DashboardPage } from "../../pages/dashboardPage";
import { user1 } from "../../standardUserCredentials";


test("User can login with valid credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const title = dashboardPage.isDashboardPageLoaded();
  await loginPage.goto();
  await loginPage.fillUserNameInput(user1.userName);
  await loginPage.fillPasswordInput(user1.userPassword);
  await loginPage.clickLoginButton();
  await expect(title).toBeTruthy();
});

test("User can't login with invalid credentials", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.fillUserNameInput('TestName');
  await loginPage.fillPasswordInput('TestPassword');
  await loginPage.clickLoginButton();
  const errorTextMessage = await loginPage.getLoginErrorText();
  expect(errorTextMessage).toBe('Epic sadface: Username and password do not match any user in this service');
});

