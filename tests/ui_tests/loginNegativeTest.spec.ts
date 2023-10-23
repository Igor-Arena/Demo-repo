import {test, expect} from "@playwright/test"
import {LoginPage} from "../pages/loginPageClass";

const user2InvalidCreds = {
    userName: 'standard_user_invalid',
    userPassword: 'secret_sauce_invalid'
}

test('LoginNegativeTest', async ({page}) => {
const executeLoginPageClass = new LoginPage(page);
await executeLoginPageClass.goto();
await executeLoginPageClass.userNameTextbox().fill(user2InvalidCreds.userName);
await executeLoginPageClass.passwordTextbox().fill(user2InvalidCreds.userPassword);
await executeLoginPageClass.loginButton().click();
await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
});