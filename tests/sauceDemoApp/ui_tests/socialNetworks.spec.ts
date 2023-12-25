import { test, Page, expect } from "@playwright/test";
import { LoginPage } from "..//..//..//pages/sauceDemoApp/loginPage";
import { DashboardPage } from "..//..//..//pages/sauceDemoApp/dashboardPage";
import { standardUserCredentials } from "..//..//..//constant";

let page: Page;
let loginPage: LoginPage;
let dashboardPage: DashboardPage;
const allSocialNetworks = [
  {
    name: "twitter",
    link: "https://twitter.com/saucelabs",
  },
  {
    name: "facebook",
    link: "https://www.facebook.com/saucelabs",
  },
  {
    name: "linkedin",
    link: "https://www.linkedin.com/company/sauce-labs/",
  },
];

test.beforeAll(async ({ browser: Browser }) => {
  page = await Browser.newPage();
  loginPage = new LoginPage(page);
  dashboardPage = new DashboardPage(page);
});

for (const socialNetwork of allSocialNetworks) {
  test(`Navigating to social network: ${socialNetwork.name}`, async () => {
    await loginPage.goto();
    await loginPage.login(
      standardUserCredentials.userName,
      standardUserCredentials.userPassword
    );

    const pagePromise = page.context().waitForEvent("page");
    await dashboardPage.navigateToSocialNetwork(
      socialNetwork.name
    );
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL(socialNetwork.link)
  });
}
