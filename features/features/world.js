const {setWorldConstructor} = require("cucumber");
const puppeteer = require("puppeteer");
const expect = require('expect-puppeteer');
const assert = require('assert');

const doozerCredentials = require("../../scripts/doozer_credentials.json");

const BASE_URL = "https://dataset.doozer.it";
const DASHBOARD_PAGE = "https://dataset.doozer.it/app/dashboard";
const LOGIN_PAGE = "https://dataset.doozer.it/login/login?referer=https%3A%2F%2Fdataset.doozer.it%2Fapp%2Fdashboard";

class LoginWorld {
    async openBrowser() {
        this.browser = await puppeteer.launch();
        this.page = await this.browser.newPage();
        await this.page.setViewport({width: 1200, height: 800});
    }

    async isLoggedIn() {
        await this.page.goto(DASHBOARD_PAGE);

        return await this.page.title() === 'DOOZER - DPX';
    }

    async logout() {

    }

    async performLogin() {
        await this.page.goto(LOGIN_PAGE);

        await this.page.focus('#username');
        await this.page.keyboard.type(doozerCredentials.username);
        await this.page.screenshot({path: 'reports/screenshots/doozer_login_username.png'});

        await this.page.focus('#password');
        await this.page.keyboard.type(doozerCredentials.password);
        await this.page.screenshot({path: 'reports/screenshots/doozer_login_password.png'});

        await this.page.click('button');
        await this.page.waitForNavigation();

        await expect(this.page).toMatch('What do you want to do next?');
        await assert.notEqual(this.page.title(), 'DOOZER - DPX');
        await this.page.screenshot({path: 'reports/screenshots/doozer_login_logged_in.png'});
    }

    async clickButton(target) {
        await this.page.click(target);
        await this.page.waitForNavigation();
        await this.page.screenshot({path: 'reports/screenshots/doozer_button_' + target + '.png'});
    }

    async enterRooms(rooms) {
        await this.page.focus('input');
        await this.page.keyboard.press('Tab');
        await this.page.keyboard.type(rooms.toString());
        await this.page.keyboard.press('Tab');
        await this.page.screenshot({path: 'reports/screenshots/doozer_rooms.png'});
    }

    async enterBathroom(bathroom) {
        await this.page.focus('input');
        await this.page.keyboard.press('Tab');
        await this.page.keyboard.press('Tab');
        await this.page.keyboard.press('Tab');
        await this.page.keyboard.type(bathroom.toString());
        await this.page.keyboard.press('Tab');
        await this.page.screenshot({path: 'reports/screenshots/doozer_bathroom.png'});
    }

    async enterKitchen(kitchen) {
        await this.page.focus('input');
        await this.page.keyboard.press('Tab');
        await this.page.keyboard.press('Tab');
        await this.page.keyboard.press('Tab');
        await this.page.keyboard.press('Tab');
        await this.page.keyboard.type(kitchen.toString());
        await this.page.keyboard.press('Tab');
        await this.page.screenshot({path: 'reports/screenshots/doozer_kitchen.png'});
    }

    async closeBrowser() {
        await this.browser.close();
    }
}

setWorldConstructor(LoginWorld);
