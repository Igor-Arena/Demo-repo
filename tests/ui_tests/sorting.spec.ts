import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "../../pages/loginPage";
import { DashboardPage } from "../../pages/dashboardPage";
import { standardUserCredentials } from "../../constant";

let page: Page;
let loginPage: LoginPage;
let dashboardPage: DashboardPage;

test.beforeAll(async ({ browser: Browser }) => {
  page = await Browser.newPage();
  loginPage = new LoginPage(page);
  dashboardPage = new DashboardPage(page);
});

test("User can sort item from high to low price", async () => {
  await test.step("Login", async () => {
    await loginPage.goto();
    await loginPage.login(
      standardUserCredentials.userName,
      standardUserCredentials.userPassword
    );
  });

  await test.step("Select sorting from High to Low price", async () => {
    await dashboardPage.getInventoryItemsPriceArray();
    const expectedPrices = await dashboardPage.sortInventoryItemsPriceArray("descending");
    await dashboardPage.selectSortingFromDropdownList("hilo");
    const actualPrices = await dashboardPage.getInventoryItemsPriceArray();
    expect(expectedPrices).toEqual(actualPrices);
  });
});
