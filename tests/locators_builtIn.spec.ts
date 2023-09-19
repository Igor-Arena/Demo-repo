//const axios = require('axios');

//const {test, expect} = require('@playwright/test');

import {test, expect} from '@playwright/test';

test ('Built in locators', async ({page}) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    const logo = await page.getByAltText('company-branding');
    await expect(logo).toBeVisible();

    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');

    //await page.getByRole('button', {class: 'oxd-button oxd-button--medium oxd-button--main orangehrm-login-button'}).click();
    await page.locator("//button[normalize-space()='Login']").click();

    const userText: any = await page.locator("//p[@class='oxd-userdropdown-name']").textContent();
    await expect(page.getByText(userText)).toBeVisible();
});