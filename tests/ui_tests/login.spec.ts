import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/loginPage";
import { DashboardPage } from "../../pages/dashboardPage";
import { user1 } from "../../constant";


test("Login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const title = dashboardPage.isPageLoaded();
  await loginPage.goto();
  await loginPage.fillUserNameInput(user1.userName);
  await loginPage.fillPasswordInput(user1.userPassword);
  await loginPage.clickLoginButton();
  await expect(title).toBeTruthy();
})
