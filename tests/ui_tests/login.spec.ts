import { test, expect, Page } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { LoginPage } from "../../pages/loginPage";
import { DashboardPage } from "../../pages/dashboardPage";
import { standardUserCredentials } from "../../constant";

let page: Page;
let loginPage: LoginPage;
let dashboardPage: DashboardPage;
let randomName: string;
let randomPassword: string;

test.beforeAll(async ({ browser: Browser }) => {
  page = await Browser.newPage();
  loginPage = new LoginPage(page);
  dashboardPage = new DashboardPage(page);
  randomName =  await faker.person.firstName();
  randomPassword = await faker.string.alphanumeric(10);
});

test.beforeEach(async () => {
  await loginPage.goto();
});

test("User can login with valid credentials", async () => {
  await loginPage.fillUserNameInput(standardUserCredentials.userName);
  await loginPage.fillPasswordInput(standardUserCredentials.userPassword);
  await loginPage.clickLoginButton();
  const isDashboardPageLoaded = await dashboardPage.isDashboardPageLoaded();
  await expect(isDashboardPageLoaded).toBeTruthy();
});

test("User can't login with invalid credentials", async () => {
  await loginPage.fillUserNameInput(randomName);
  await loginPage.fillPasswordInput(randomPassword);
  await loginPage.clickLoginButton();
  const errorTextMessage = await loginPage.getLoginErrorText();
  await expect(errorTextMessage).toBe(
    "Epic sadface: Username and password do not match any user in this service"
  );
});