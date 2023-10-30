//const axios = require('axios');

//const {test, expect} = require('@playwright/test');

import { test, expect } from "@playwright/test";

test("Built in locators", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );

  // getByAltText()
  const logo = await page.getByAltText("company-branding");
  await expect(logo).toBeVisible();

  // getByPlaceholder()
  await page.getByPlaceholder("Username").fill("Admin");
  await page.getByPlaceholder("Password").fill("admin123");

  //getByRole()
  //await page.getByRole('button', {type: 'submit'}).click()     not working because of "type" keyword  

  const userText: any = await page
    .locator("//p[@class='oxd-userdropdown-name']")
    .textContent();
  await expect(page.getByText(userText)).toBeVisible();
});
