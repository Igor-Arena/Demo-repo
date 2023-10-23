import {Page} from "@playwright/test";

export class LoginPage {
    page: Page;
    constructor (page) {
        this.page = page;
    };

    public async goto() {
      await this.page.goto('https://www.saucedemo.com/');
    };

    //Locators on login page
    userNameTextbox = () => this.page.locator('[data-test="username"]');
    passwordTextbox = () => this.page.locator('[data-test="password"]');
    loginButton = () => this.page.locator('[data-test="login-button"]');

    // Locators on main page
    burgerMenuButton = () => this.page.locator("//button[@id='react-burger-menu-btn']");
    logoutButton = () => this.page.locator("//a[@id='logout_sidebar_link']");
}
