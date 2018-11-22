const { setWorldConstructor } = require("cucumber");
const puppeteer = require("puppeteer");
const expect = require('expect-puppeteer');
const assert = require('assert');

const LOGIN_PAGE = "https://dataset.doozer.it/login/login?referer=https%3A%2F%2Fdataset.doozer.it%2Fapp%2Fdashboard";

class LoginWorld {
    async openLoginPage() {
        this.browser = await puppeteer.launch();
        this.page = await this.browser.newPage();
        await this.page.goto(LOGIN_PAGE);
        await this.page.setViewport({ width: 1200, height: 800 });
    }

    async isLoggedIn() {

    }

    async logout() {

    }

    // TODO this is a general operation, but it should be moved to a page object.
    async performLogin() {
        await this.page.focus('#username');
        await this.page.waitFor(10);
        await this.page.keyboard.type('tobias-timpe@doozer.de');
        await this.page.waitFor(10);
        await this.page.screenshot({ path: 'reports/screenshots/doozer_login_username.png' });

        await this.page.focus('#password');
        await this.page.waitFor(10);
        await this.page.keyboard.type('correct-battery-horse-staple');
        await this.page.waitFor(10);
        await this.page.screenshot({ path: 'reports/screenshots/doozer_login_password.png' });

        await this.page.click('button');
        await this.page.waitForNavigation();

        await expect(this.page).toMatch('dashboard');
        await this.page.screenshot({ path: 'reports/screenshots/doozer_login_logged_in.png' });
    }

    // TODO this is a very general operation. this world file should be the correct place for it.
    async clickButton(target) {
        await this.page.click(target);
        await this.page.waitForNavigation();
        await this.page.waitFor(1000);
        await this.page.screenshot({ path: 'reports/screenshots/doozer_create_order_' + target + '.png' });
    }

    // TODO this is very specific operation. it should be in a page object.
    async enterRooms(rooms) {
        await this.page.focus('input');
        await this.page.waitFor(10);
        await this.page.keyboard.press('Tab');
        await this.page.waitFor(10);
        await this.page.keyboard.type(rooms.toString());
        await this.page.waitFor(10);
        await this.page.keyboard.press('Tab');
        await this.page.waitFor(10);
        await this.page.screenshot({ path: 'reports/screenshots/doozer_rooms.png' });
    }

    // TODO this is very specific operation. it should be in a page object.
    async enterBathroom(bathroom) {
        await this.page.focus('input');
        await this.page.waitFor(10);
        await this.page.keyboard.press('Tab');
        await this.page.waitFor(10);
        await this.page.keyboard.press('Tab');
        await this.page.waitFor(10);
        await this.page.keyboard.press('Tab');
        await this.page.waitFor(10);
        await this.page.keyboard.type(bathroom.toString());
        await this.page.waitFor(10);
        await this.page.keyboard.press('Tab');
        await this.page.waitFor(10);
        await this.page.screenshot({ path: 'reports/screenshots/doozer_bathroom.png' });
    }

    // TODO this is very specific operation. it should be in a page object.
    async enterKitchen(kitchen) {
        await this.page.focus('input');
        await this.page.waitFor(10);
        await this.page.keyboard.press('Tab');
        await this.page.waitFor(10);
        await this.page.keyboard.press('Tab');
        await this.page.waitFor(10);
        await this.page.keyboard.press('Tab');
        await this.page.waitFor(10);
        await this.page.keyboard.press('Tab');
        await this.page.waitFor(10);
        await this.page.keyboard.type(kitchen.toString());
        await this.page.waitFor(10);
        await this.page.keyboard.press('Tab');
        await this.page.waitFor(10);
        await this.page.screenshot({ path: 'reports/screenshots/doozer_kitchen.png' });
    }

    async closeLoginPage() {
        await this.browser.close();
    }
}

setWorldConstructor(LoginWorld);
