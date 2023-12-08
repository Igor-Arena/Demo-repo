import { test, Page } from "@playwright/test";
import { LoginPage } from "../../pages/loginPage";
import { DashboardPage } from "../../pages/dashboardPage";
import { standardUserCredentials } from "../../constant";

let page: Page;
let loginPage: LoginPage;
let dashboardPage: DashboardPage;
const allSocialNetworks = ["twitter", "facebook", "linkedin"];

test.beforeAll(async ({ browser: Browser }) => {
  page = await Browser.newPage();
  loginPage = new LoginPage(page);
  dashboardPage = new DashboardPage(page);
});

for (const socialNetwork of allSocialNetworks) {
  test(`testing with ${socialNetwork}`, async () => {
    await loginPage.goto();
    await loginPage.login(
      standardUserCredentials.userName,
      standardUserCredentials.userPassword
    );
    
    const pagePromise = page.context().waitForEvent("page")
    const socialNetworkURL = await dashboardPage.navigateToSocialNetwork(socialNetwork);
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    await dashboardPage.checkingSocialmediaURLs(socialNetworkURL);  
  });
}
