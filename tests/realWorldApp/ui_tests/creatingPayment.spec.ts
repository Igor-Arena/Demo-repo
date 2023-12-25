import { test, expect, Page} from "@playwright/test"
import { LoginPage } from "../../../pages/realWorldApp/loginPage";
import { HomePage } from "../../../pages/realWorldApp/homePage";
import { PaymentProcessPage } from "../../../pages/realWorldApp/paymentProcessPage";
import { realWorldAppUrl, realWorldAppUser } from "../../../constant";

let page: Page;
let loginPage: LoginPage;
let homePage: HomePage;
let paymentProcessPage: PaymentProcessPage;

test.beforeAll(async ({browser: Browser}) => {
page = await Browser.newPage();
loginPage = new LoginPage(page);
homePage = new HomePage(page);
paymentProcessPage = new PaymentProcessPage(page);
await page.goto(realWorldAppUrl)
await loginPage.login(realWorldAppUser.userName, realWorldAppUser.userPassword);
})

test("Creating new payment", async () => {
    await homePage.clickNewButton();
    const selectContactStep = await paymentProcessPage.getSelectContactStepTitleText()
    expect(selectContactStep).toMatch("Select Contact");
})