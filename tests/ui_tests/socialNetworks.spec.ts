import { test, expect, Page, Browser } from "@playwright/test";
import { LoginPage } from "../../pages/loginPage";
import { DashboardPage } from "../../pages/dashboardPage";
import { standardUserCredentials } from "../../constant";

let page: Page;
let loginPage: LoginPage;
let dashboardPage: DashboardPage;
//let context

test.beforeAll(async ({ browser: Browser}) => {
  //context = await Browser.newContext();
  page = await Browser.newPage();
  loginPage = new LoginPage(page);
  dashboardPage = new DashboardPage(page);

});

test("User can navigate to social networks", async ({context}) => {
  await test.step("Login", async () => {
    await loginPage.goto();
    await loginPage.login(
      standardUserCredentials.userName,
      standardUserCredentials.userPassword
    );
  });

  const allSocialNetworks = ["twitter", "facebook", "linkedin"];
  for (const socialNetwork of allSocialNetworks) {
  await test.step (`testing with ${socialNetwork}`, async () => {
    const pagePromise = context.waitForEvent('page')
   await dashboardPage.navigateToSocialNetwork(socialNetwork)
   const newPage = await pagePromise;
   await newPage.waitForLoadState();
   //expect(page).toHaveURL('https://twitter.com/saucelabs');
   //expect(page).toHaveURL('https://www.facebook.com/saucelabs');
   //expect(page).toHaveURL('https://www.linkedin.com/company/sauce-labs/');
  })
}
});
