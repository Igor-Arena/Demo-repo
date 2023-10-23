import {test, expect} from "@playwright/test"
import {LoginPage} from "../pages/loginPageClass";

const user1 = {
    userName: 'standard_user',
    userPassword: 'secret_sauce'
}

test('Login', async ({page}) => {
const executeLoginPageClass = new LoginPage(page);
await executeLoginPageClass.goto();
await executeLoginPageClass.userNameTextbox().fill(user1.userName);
await executeLoginPageClass.passwordTextbox().fill(user1.userPassword);
await executeLoginPageClass.loginButton().click();
await expect(page.getByText('Products')).toBeVisible();
await executeLoginPageClass.burgerMenuButton().click();
await executeLoginPageClass.logoutButton().click();
await expect(page.getByText('Login')).toBeVisible();
});

