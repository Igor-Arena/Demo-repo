//const {test, expect} = require('@playwright/test');

import {test, expect} from '@playwright/test';

test ('Locators', async ({page})=>{
    await page.goto('https://www.demoblaze.com/index.html')
    
    //click login btn
    await page.click('id=login2')

    // fill in username field - CSS
    await page.type('#loginusername', 'pavanol')
    //await page.locator('#loginusername').click()

    //fill in userpassword field - CSS
    await page.fill('#loginpassword', 'test@123') 

    //click on the Log in btn - XPath
    await page.click("//button[normalize-space()='Log in']")

    //verify logout is present - XPath
    const logoutLink = await page.locator("//a[@id='logout2']")

    await expect(logoutLink).toBeVisible

    await page.close

});