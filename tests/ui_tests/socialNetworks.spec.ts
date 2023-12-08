import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "../../pages/loginPage";
import { DashboardPage } from "../../pages/dashboardPage";
import { standardUserCredentials } from "../../constant";

let page: Page;
let loginPage: LoginPage;
let dashboardPage: DashboardPage;
//let context: BrowserContext;
const allSocialNetworks = ["twitter", "facebook", "linkedin"];

test.beforeAll(async ({ browser: Browser }) => {
  //context = await Browser.newContext();
  page = await Browser.newPage();
  loginPage = new LoginPage(page);
  dashboardPage = new DashboardPage(page);
});

for (const socialNetwork of allSocialNetworks) {
  test(`testing with ${socialNetwork}`, async ({context}) => {
    await loginPage.goto();
    await loginPage.login(
      standardUserCredentials.userName,
      standardUserCredentials.userPassword
    );
    
    const pagePromise = context.waitForEvent("page");
    await dashboardPage.navigateToSocialNetwork(socialNetwork);
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    //expect(page).toHaveURL('https://twitter.com/saucelabs');
  });
}
